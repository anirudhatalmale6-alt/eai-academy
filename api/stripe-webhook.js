// POST /api/stripe-webhook
// Verifies the Stripe signature, then on checkout.session.completed records the
// order, grants course entitlements, and records any referral commission.
// All writes use the Supabase service role (bypasses RLS). Idempotent on the
// Stripe session id.
import Stripe from "stripe";
import { supabaseAdmin } from "./_lib/supabaseAdmin.js";
import { COMMISSION_RATE, COURSES, BUNDLE } from "./_lib/catalog.js";
import { sendReceiptEmail, audLabel } from "./_lib/email.js";

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(Buffer.from(c)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function handleCompletedSession(session) {
  const db = supabaseAdmin();
  const md = session.metadata || {};
  const email =
    session.customer_email ||
    (session.customer_details && session.customer_details.email) ||
    null;
  const slugs = (md.slugs || "").split(",").map((s) => s.trim()).filter(Boolean);
  const seats = Math.max(1, parseInt(md.seats || "1", 10));
  const kind = md.kind || "course";

  // 1) Record the order (idempotent on stripe_session_id).
  const { data: orderRows, error: orderErr } = await db
    .from("orders")
    .upsert(
      {
        email,
        course_slug: kind === "bundle" ? "bundle" : slugs[0] || null,
        kind,
        seats,
        amount_cents: session.amount_total,
        currency: session.currency,
        stripe_session_id: session.id,
        status: "paid",
      },
      { onConflict: "stripe_session_id", ignoreDuplicates: true }
    )
    .select("id");

  if (orderErr) throw orderErr;
  // Already processed (duplicate webhook) -> nothing more to do.
  if (!orderRows || orderRows.length === 0) return;
  const orderId = orderRows[0].id;

  // 2) Grant entitlements to the buyer for each course slug.
  if (email && slugs.length) {
    const rows = slugs.map((slug) => ({
      email,
      course_slug: slug,
      order_id: orderId,
      source: kind === "bundle" ? "bundle" : "purchase",
    }));
    const { error: entErr } = await db
      .from("entitlements")
      .upsert(rows, { onConflict: "email,course_slug", ignoreDuplicates: true });
    if (entErr) throw entErr;
  }

  // 3) Record referral commission if a valid, active code was used.
  const code = (md.referral_code || "").trim();
  if (code) {
    const { data: ref } = await db
      .from("referrers")
      .select("id, commission_rate, active")
      .eq("code", code)
      .maybeSingle();
    if (ref && ref.active) {
      const rate = Number(ref.commission_rate ?? COMMISSION_RATE);
      const commission = Math.round((session.amount_total || 0) * rate);
      await db.from("referrals").insert({
        referrer_id: ref.id,
        code,
        order_id: orderId,
        buyer_email: email,
        course_slug: kind === "bundle" ? "bundle" : slugs[0] || null,
        sale_cents: session.amount_total,
        commission_cents: commission,
        status: "pending",
      });
    }
  }

  // 4) Send the receipt / welcome email. Best-effort: a failure here must never
  // break the webhook (which would make Stripe retry a completed order).
  if (email) {
    try {
      const title =
        kind === "bundle"
          ? BUNDLE.title
          : (COURSES[slugs[0]] && COURSES[slugs[0]].title) || "your course";
      const fullName =
        (session.customer_details && session.customer_details.name) || "";
      const firstName = fullName.trim().split(/\s+/)[0] || "";
      await sendReceiptEmail({
        to: email,
        firstName,
        courseTitle: title,
        amountLabel: audLabel(session.amount_total, session.currency),
        orderRef: String(orderId).slice(0, 8).toUpperCase(),
      });
    } catch (e) {
      console.error("receipt email error", e && e.message);
    }
  }
}

async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method not allowed");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    const raw = await readRawBody(req);
    event = stripe.webhooks.constructEvent(raw, sig, whsec);
  } catch (err) {
    console.error("webhook signature error", err && err.message);
    return res.status(400).send(`Webhook Error: ${err && err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      await handleCompletedSession(event.data.object);
    }
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("webhook handler error", err && err.message);
    // 500 tells Stripe to retry later.
    return res.status(500).json({ error: "handler failed" });
  }
}

export default handler;
// Vercel: do not pre-parse the body so we can verify the raw signature.
export const config = { api: { bodyParser: false } };
// Exported for local testing.
export { handleCompletedSession };
