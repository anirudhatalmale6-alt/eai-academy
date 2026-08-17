// Server-authoritative catalogue and pricing. Never trust prices from the
// browser. KEEP IN SYNC with src/data/courses.ts (slugs, prices, team tiers,
// bundle price) and src/data/workshops.ts.
//
// EVERY `cents` figure below EXCLUDES GST. Prices are advertised as
// "A$590 + GST" and Australian GST is added at checkout by resolveItem(), so
// the card is charged the GST-inclusive amount.

const COURSES = {
  "ai-foundations-for-finance": { title: "AI Foundations for Finance", cents: 0 },
  "microsoft-365-copilot-for-finance": { title: "Microsoft 365 Copilot for Finance", cents: 59000 },
  "prompting-for-auditable-answers": { title: "Prompting for Reliable, Auditable Answers", cents: 59000 },
  "automating-finance-workflows": { title: "Automating Business & Finance Workflows with AI Agents", cents: 59000 },
  "ai-governance-risk-compliance": { title: "AI Governance, Risk & Compliance for Firms", cents: 59000 },
};

// Live workshops: one 90 minute online session, same program, three dates.
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

// Bundle = all paid courses, at a fixed price. Each course still carries its
// own certificate in that subject's name (no single combined credential).
const PAID_SLUGS = Object.keys(COURSES).filter((s) => COURSES[s].cents > 0);
const BUNDLE = {
  id: "bundle",
  title: "The Complete AI for Finance Program",
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

// Resolve a requested item to its authoritative title + unit price.
// `cents` on the returned object is GST INCLUSIVE: it is what we charge.
// `centsExGst` is kept for the receipt so the GST line can be shown.
// item = { type: "course" | "bundle" | "workshop", slug? }
function resolveItem(item) {
  if (!item || typeof item !== "object") return null;
  const priced = (kind, title, exGst, slugs) => ({
    kind,
    title,
    centsExGst: exGst,
    cents: incGst(exGst),
    slugs,
  });
  if (item.type === "bundle") {
    return priced("bundle", BUNDLE.title, BUNDLE.cents, BUNDLE.includes);
  }
  if (item.type === "course") {
    const c = COURSES[item.slug];
    if (!c || c.cents <= 0) return null; // unknown or free course (free != checkout)
    return priced("course", c.title, c.cents, [item.slug]);
  }
  if (item.type === "workshop") {
    const w = WORKSHOPS[item.slug];
    if (!w) return null;
    return priced(
      "workshop",
      `${w.title} — live workshop, ${w.dateLabel}`,
      w.centsExGst,
      [item.slug],
    );
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
