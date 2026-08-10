// Server-authoritative catalogue and pricing. Never trust prices from the
// browser. KEEP IN SYNC with src/data/courses.ts (slugs, prices, team tiers,
// bundle price). A drift test lives in api/_lib/catalog.test.mjs.

const COURSES = {
  "ai-foundations-for-finance": { title: "AI Foundations for Finance", cents: 0 },
  "microsoft-365-copilot-for-finance": { title: "Microsoft 365 Copilot for Finance", cents: 59000 },
  "prompting-for-auditable-answers": { title: "Prompting for Reliable, Auditable Answers", cents: 59000 },
  "automating-finance-workflows": { title: "Automating Finance Workflows with AI Agents", cents: 59000 },
  "ai-governance-risk-compliance": { title: "AI Governance, Risk & Compliance for Firms", cents: 59000 },
};

// Live workshops: one 1.5 hour online session, same program, three dates.
// Priced EX GST (A$249 + GST); Australian GST is added at checkout.
// KEEP IN SYNC with src/data/workshops.ts.
const GST_RATE = 0.1;
const WORKSHOP_TITLE = "Using AI in Finance and Business Workflows";
const WORKSHOP_EX_GST = 24900;
const WORKSHOPS = {
  "workshop-aug-2026": { title: WORKSHOP_TITLE, dateLabel: "28 August 2026", centsExGst: WORKSHOP_EX_GST },
  "workshop-sep-2026": { title: WORKSHOP_TITLE, dateLabel: "24 September 2026", centsExGst: WORKSHOP_EX_GST },
  "workshop-oct-2026": { title: WORKSHOP_TITLE, dateLabel: "23 October 2026", centsExGst: WORKSHOP_EX_GST },
};
// Amount actually charged per seat: price + GST.
const incGst = (centsExGst) => Math.round(centsExGst * (1 + GST_RATE));

// Bundle = all paid courses + certificate, at a fixed price.
const PAID_SLUGS = Object.keys(COURSES).filter((s) => COURSES[s].cents > 0);
const BUNDLE = {
  id: "bundle",
  title: "Certified AI-in-Finance Practitioner",
  cents: 199000,
  includes: PAID_SLUGS,
};

// Team pricing tiers (percent off per seat). null = custom (not sold online).
const TEAM_TIERS = [
  { min: 25, pct: null },
  { min: 10, pct: 25 },
  { min: 3, pct: 15 },
  { min: 1, pct: 0 },
];

const CURRENCY = "aud";
const COMMISSION_RATE = 0.15; // referral commission on the sale total

function teamDiscountPct(qty) {
  const q = Math.max(1, Math.floor(qty || 1));
  for (const t of TEAM_TIERS) if (q >= t.min) return t.pct;
  return 0;
}

// Resolve a requested item to its authoritative title + unit price (cents).
// item = { type: "course" | "bundle", slug? }
function resolveItem(item) {
  if (!item || typeof item !== "object") return null;
  if (item.type === "bundle") {
    return { kind: "bundle", title: BUNDLE.title, cents: BUNDLE.cents, slugs: BUNDLE.includes };
  }
  if (item.type === "course") {
    const c = COURSES[item.slug];
    if (!c || c.cents <= 0) return null; // unknown or free course (free != checkout)
    return { kind: "course", title: c.title, cents: c.cents, slugs: [item.slug] };
  }
  if (item.type === "workshop") {
    const w = WORKSHOPS[item.slug];
    if (!w) return null;
    // Charged GST inclusive, so the Stripe total matches "A$249 + GST".
    return {
      kind: "workshop",
      title: `${w.title} — live workshop, ${w.dateLabel}`,
      cents: incGst(w.centsExGst),
      slugs: [item.slug],
    };
  }
  return null;
}

export {
  COURSES,
  BUNDLE,
  PAID_SLUGS,
  TEAM_TIERS,
  CURRENCY,
  COMMISSION_RATE,
  GST_RATE,
  WORKSHOPS,
  incGst,
  teamDiscountPct,
  resolveItem,
};
