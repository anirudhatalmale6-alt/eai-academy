// POST /api/checkout
// Body: { item: {type:"course"|"bundle", slug?}, quantity, referralCode?, email? }
// Creates a Stripe Checkout Session (AUD) and returns { url }.
// Prices come from the server catalogue only; the browser cannot set them.
import Stripe from "stripe";
import { resolveItem, teamDiscountPct, CURRENCY } from "./_lib/catalog.js";

function siteOrigin(req) {
  return (
    process.env.SITE_URL ||
    (req.headers.origin && String(req.headers.origin)) ||
    "https://academy.empathetic-ai.com"
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { item, quantity, referralCode, email, registrationId, name, company } = body;

    const resolved = resolveItem(item);
    if (!resolved) return res.status(400).json({ error: "Unknown item" });

    const qty = Math.max(1, Math.floor(Number(quantity) || 1));
    const pct = teamDiscountPct(qty);
    // 25+ seats is custom pricing, not sold online.
    if (pct === null) {
      return res.status(200).json({ contactRequired: true });
    }
    const unit = Math.round(resolved.cents * (1 - pct / 100));

    const origin = siteOrigin(req);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: qty,
          price_data: {
            currency: CURRENCY,
            unit_amount: unit,
            product_data: {
              // Prices are advertised ex GST; be explicit that the amount
              // charged here includes it.
              name:
                resolved.title +
                (qty > 1 ? ` (${qty} seats)` : "") +
                " (incl. GST)",
            },
          },
        },
      ],
      customer_email: email && String(email).includes("@") ? String(email) : undefined,
      allow_promotion_codes: false,
      metadata: {
        kind: resolved.kind,
        slugs: resolved.slugs.join(","),
        seats: String(qty),
        unit_original: String(resolved.cents),
        unit_charged: String(unit),
        unit_ex_gst: String(resolved.centsExGst),
        discount_pct: String(pct),
        referral_code: referralCode ? String(referralCode).trim().slice(0, 64) : "",
        registration_id: registrationId ? String(registrationId).slice(0, 64) : "",
        buyer_name: name ? String(name).slice(0, 120) : "",
        buyer_company: company ? String(company).slice(0, 120) : "",
      },
      success_url: `${origin}/#/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:
        resolved.kind === "workshop"
          ? `${origin}/#/workshops`
          : `${origin}/#/courses`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("checkout error", err && err.message);
    return res.status(500).json({ error: "Could not start checkout" });
  }
};
