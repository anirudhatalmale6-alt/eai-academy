// Difficulty only. "Certificate" is deliberately NOT a level: in Australia,
// Certificate I to IV are protected AQF qualification titles, so a course
// labelled "Level: Certificate" would read as a claim to AQF status we do not
// have. Every course issues a certificate of completion regardless of level.
export type Level = "Beginner" | "Intermediate" | "Advanced";

// The five situations where finance work should not be handed to AI. These are
// Empathetic AI's own position, set by Angela, and they are taught in every
// course rather than tacked on at the end. Wording is hers.
export const RED_LINES: { short: string; full: string }[] = [
  {
    short: "Final decisions that need professional judgement",
    full: "Final decisions that require professional judgement, accountability or sign-off, especially where the consequences are material.",
  },
  {
    short: "Acting on output without checking the source",
    full: "Making decisions purely based on AI output without checking the underlying data, assumptions, calculations and sources.",
  },
  {
    short: "Sensitive data in public AI tools",
    full: "Handling highly sensitive or confidential financial information in public AI tools without appropriate data controls.",
  },
  {
    short: "No audit trail, no explanation",
    full: "Situations where there is no clear audit trail or where you cannot explain how the conclusion was reached.",
  },
  {
    short: "Automating high-risk decisions end to end",
    full: "Fully automating high-risk decisions involving compliance, tax, audit, credit, investment or regulatory obligations without appropriate human oversight.",
  },
];

export interface Course {
  slug: string;
  title: string;
  tagline: string; // small accent eyebrow, e.g. "The tool most firms already have"
  summary: string;
  level: Level;
  priceCents: number; // 0 = free
  compareAtCents?: number; // optional "regular" price shown struck through for a launch offer
  learningHours: number; // total learning hours (shown as "N Learning Hours")
  lessonsLabel: string; // "6 lessons"
  color: string; // one pure brand colour for the course (thumbnail + accent)
  outcomes: string[];
  lessons: { title: string; durationLabel: string }[];
}

// Prices are in Australian dollars (whole dollars), formatted "A$1,990".
export const money = (cents: number) => {
  if (cents === 0) return "Free";
  const dollars = cents / 100;
  // Whole dollars stay clean (A$590); fractional shows cents (A$442.50).
  const opts = Number.isInteger(dollars)
    ? {}
    : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  return `A$${dollars.toLocaleString("en-AU", opts)}`;
};

// EVERY price in the catalog is stored EXCLUDING GST and advertised as
// "A$590 + GST". Australian GST is added at checkout, so the card is charged
// the GST-inclusive amount. This mirrors api/_lib/catalog.js exactly (same
// rounding), so what the page shows is what Stripe charges.
export const GST_RATE = 0.1;
export const incGst = (exGstCents: number) =>
  Math.round(exGstCents * (1 + GST_RATE));
// Charge per seat after any team discount. Must match the server:
// round(incGst(base) * (1 - pct/100)).
export const seatChargeCents = (exGstCents: number, pct: number) =>
  Math.round(incGst(exGstCents) * (1 - pct / 100));
// "A$590 + GST" (or "Free")
export const priceLabel = (exGstCents: number) =>
  exGstCents === 0 ? "Free" : `${money(exGstCents)} + GST`;
// "A$649 incl. GST"
export const incGstLabel = (exGstCents: number) =>
  `${money(incGst(exGstCents))} incl. GST`;

// Duration is expressed in "Learning Hours" (professionals track learning hours).
export const hoursLabel = (n: number) =>
  `${n} Learning Hour${n === 1 ? "" : "s"}`;

// Launch bundle: the 4 paid courses + assessment + certificate, sold as one
// premium program. Anchored to the ~A$2,400 Australian market rate for a
// 4-part AI-in-finance program, with a bundle saving.
// The bundle PRICE is a fixed business decision you set here. Everything else
// (which courses are included, the individual total, the saving, the learning
// hours) is derived from the paid courses below, so adding or removing a course
// keeps the bundle in sync automatically. `extras` are non-course inclusions.
// The bundle is deliberately NOT named after a single credential. Each course
// carries its own certificate in that subject's name, so adding a course later
// does not force a rename or a new qualification.
export const BUNDLE = {
  title: "The Complete AI for Finance Program",
  blurb:
    "Every paid course in one place, with a certificate in each subject as you complete it.",
  priceCents: 199000,
  color: "#6366F1",
  extras: ["A certificate for every course you complete"],
};

// Paid courses in the bundle (derived, always in sync with the catalog).
export const bundleCourses = () => COURSES.filter((c) => c.priceCents > 0);
export const bundleIncludes = () => [
  ...bundleCourses().map((c) => c.title),
  ...BUNDLE.extras,
];
export const bundleIndividualCents = () =>
  bundleCourses().reduce((sum, c) => sum + c.priceCents, 0);
export const bundleLearningHours = () =>
  bundleCourses().reduce((sum, c) => sum + c.learningHours, 0);

// Team pricing: volume discount when a firm enrols several people at once.
// Percentages are easy to change here. `discount: null` = custom / let's talk.
export const TEAM_TIERS: { size: string; discount: number | null }[] = [
  { size: "3 to 9 people", discount: 15 },
  { size: "10 to 24 people", discount: 25 },
  { size: "25 or more", discount: null },
];

// Discount percent for a given number of seats. Mirrors the server catalogue
// (api/_lib/catalog.js). null = custom pricing (25+), not sold online.
// Used to show the live team price before checkout; the server is still the
// source of truth for what is actually charged.
export const teamTierPct = (seats: number): number | null => {
  const n = Math.max(1, Math.floor(seats || 1));
  if (n >= 25) return null;
  if (n >= 10) return 25;
  if (n >= 3) return 15;
  return 0;
};

// Launch catalog, oriented to the tools Australian firms actually use:
// Microsoft 365 Copilot first, with OpenAI / ChatGPT Enterprise coverage.
// Placeholder lesson detail; real content will be produced via the playbook
// and managed from the admin.
export const COURSES: Course[] = [
  {
    // Slug deliberately unchanged: entitlements and existing URLs depend on it.
    // The display title dropped "for Finance" because this is the widest point
    // of the funnel and the qualifier turned away the business half of the
    // audience. Every finance example inside the course is unchanged.
    slug: "ai-foundations-for-finance",
    title: "AI Foundations",
    tagline: "Start here, no experience needed",
    summary:
      "What AI can and can't do in professional work, plus the Copilot, ChatGPT and OpenAI Enterprise landscape for Australian firms. Used responsibly.",
    level: "Beginner",
    priceCents: 0,
    learningHours: 2,
    lessonsLabel: "6 lessons",
    color: "#3B82F6",
    outcomes: [
      "Understand where AI genuinely helps in your work, and where it doesn't",
      "Know the difference between Copilot, ChatGPT and OpenAI Enterprise, and which fits your firm",
      "Use AI responsibly within professional and regulatory obligations",
    ],
    lessons: [
      { title: "Why AI matters for your work", durationLabel: "10m" },
      { title: "Copilot vs ChatGPT vs OpenAI Enterprise", durationLabel: "14m" },
      { title: "What AI is good at (and what to avoid)", durationLabel: "12m" },
      { title: "Responsible use & professional judgement", durationLabel: "15m" },
      { title: "Your first practical workflow", durationLabel: "16m" },
      { title: "Where to go next", durationLabel: "13m" },
    ],
  },
  {
    slug: "microsoft-365-copilot-for-finance",
    title: "Microsoft 365 Copilot for Finance",
    tagline: "The tool most firms already have",
    summary:
      "Five real finance jobs done with Microsoft 365 Copilot: bank reconciliation, month-end close, FP&A, the board pack and a live dashboard.",
    level: "Beginner",
    priceCents: 59000,
    compareAtCents: 69000,
    learningHours: 4,
    lessonsLabel: "18 lessons",
    color: "#8B5CF6",
    outcomes: [
      "Run a bank reconciliation and a month-end close with Copilot, and know exactly what to check",
      "Build budgets, forecasts and variance commentary you can defend to a CFO",
      "Produce a board pack and a live dashboard from your own data, in a fraction of the time",
      "Recognise the five situations where finance work should never be handed to AI",
    ],
    lessons: [
      // Module 1 · Getting started in a finance team
      { title: "What Copilot is, and where it lives in Microsoft 365", durationLabel: "11m" },
      { title: "The data boundary: what Copilot can and cannot see", durationLabel: "13m" },
      { title: "The five red lines: where AI does not belong in finance", durationLabel: "14m" },
      // Module 2 · Bank reconciliation
      { title: "Preparing a bank statement and ledger Copilot can read", durationLabel: "12m" },
      { title: "Matching transactions and surfacing the exceptions", durationLabel: "16m" },
      { title: "Explaining and clearing the unmatched items", durationLabel: "14m" },
      // Module 3 · Month-end close
      { title: "Building a close checklist Copilot can drive", durationLabel: "13m" },
      { title: "Accruals, prepayments and the supporting workings", durationLabel: "16m" },
      { title: "Flux analysis: explaining every movement worth explaining", durationLabel: "15m" },
      // Module 4 · FP&A
      { title: "Turning last year's actuals into a first-cut budget", durationLabel: "15m" },
      { title: "Scenarios and sensitivities without breaking the model", durationLabel: "16m" },
      { title: "Variance commentary in your CFO's voice", durationLabel: "14m" },
      // Module 5 · Board and management packs
      { title: "From numbers to a narrative the board will read", durationLabel: "15m" },
      { title: "Building the pack in Word and PowerPoint", durationLabel: "14m" },
      { title: "Anticipating the questions the board will ask", durationLabel: "12m" },
      // Module 6 · Real-time dashboard
      { title: "Designing a dashboard around the decisions it serves", durationLabel: "13m" },
      { title: "Building it, and keeping it refreshing on its own", durationLabel: "16m" },
      // Module 7 · Getting it right every time
      { title: "Verification, source trails and the pre-send checklist", durationLabel: "15m" },
    ],
  },
  {
    slug: "prompting-for-auditable-answers",
    title: "Prompting for Reliable, Auditable Answers",
    tagline: "Copilot & ChatGPT skills",
    summary:
      "Get source-traceable, defensible outputs from Copilot and ChatGPT that stand up in regulated work. Prompt templates included.",
    level: "Beginner",
    priceCents: 59000,
    compareAtCents: 69000,
    learningHours: 4,
    lessonsLabel: "17 lessons",
    color: "#EC4899",
    outcomes: [
      "Write prompts that give you the same reliable answer every time",
      "Interrogate a long document and get answers you can trace to the source",
      "Turn messy documents into structured data with the errors made visible",
      "Build a prompt library your whole team reuses",
    ],
    lessons: [
      // Module 1 · What makes an answer reliable
      { title: "Why two people get different answers from the same tool", durationLabel: "12m" },
      { title: "The five parts of a reliable prompt", durationLabel: "15m" },
      { title: "Telling it what you do not want", durationLabel: "13m" },
      // Module 2 · Working with long documents
      { title: "Questioning a long document instead of summarising it", durationLabel: "16m" },
      { title: "Making it quote the source, not paraphrase it", durationLabel: "14m" },
      { title: "Comparing two versions of the same document", durationLabel: "13m" },
      // Module 3 · Structured data you can trust
      { title: "From documents to a clean, checkable table", durationLabel: "16m" },
      { title: "Designing the output so errors are visible", durationLabel: "15m" },
      { title: "Spot-checking a batch without checking all of it", durationLabel: "14m" },
      // Module 4 · Writing that goes out under your name
      { title: "Drafting so the reviewer edits rather than rewrites", durationLabel: "15m" },
      { title: "Matching your voice, not the model's", durationLabel: "13m" },
      { title: "The hedging problem, and how to remove it", durationLabel: "12m" },
      // Module 5 · Research and citation
      { title: "Making the model show its sources", durationLabel: "15m" },
      { title: "Recognising a confident answer built on nothing", durationLabel: "14m" },
      // Module 6 · Reviewing, not just producing
      { title: "Using AI to review a spreadsheet, a deck or a draft", durationLabel: "15m" },
      { title: "The adversarial prompt: asking it to argue against you", durationLabel: "13m" },
      // Module 7 · Your prompt library
      { title: "Building and sharing a prompt library that gets used", durationLabel: "14m" },
    ],
  },
  {
    slug: "automating-finance-workflows",
    title: "Automating Business & Finance Workflows with AI Agents",
    tagline: "Copilot Studio & OpenAI",
    summary:
      "Design agent workflows in Copilot Studio and OpenAI that handle real business and finance tasks end to end, with a human in the loop.",
    level: "Intermediate",
    priceCents: 59000,
    compareAtCents: 69000,
    learningHours: 5,
    lessonsLabel: "18 lessons",
    color: "#14B8A6",
    outcomes: [
      "Tell the difference between a task worth automating and one that should stay manual",
      "Build a working agent in Copilot Studio that handles document intake end to end",
      "Design the human sign-off so accountability never becomes ambiguous",
      "Run an agent in production: logging, failure, and handing it over",
    ],
    lessons: [
      // Module 1 · What an agent is, and when it beats a prompt
      { title: "Prompt, automation or agent: telling them apart", durationLabel: "14m" },
      { title: "What agents are genuinely good at, and what they are not", durationLabel: "13m" },
      { title: "The processes you should refuse to automate", durationLabel: "15m" },
      // Module 2 · Choosing the right process
      { title: "Scoring a candidate process: volume, rules, risk", durationLabel: "15m" },
      { title: "Mapping the process as it actually runs today", durationLabel: "16m" },
      { title: "Deciding where the human sign-off sits", durationLabel: "15m" },
      // Module 3 · Your first agent
      { title: "Copilot Studio: the parts you actually need", durationLabel: "16m" },
      { title: "Building a working agent from your process map", durationLabel: "20m" },
      { title: "Testing it against the messy cases first", durationLabel: "16m" },
      // Module 4 · Document intake
      { title: "From email attachment to a processed record", durationLabel: "18m" },
      { title: "Handling the documents that do not fit the pattern", durationLabel: "16m" },
      { title: "The approval step, and what it must show", durationLabel: "14m" },
      // Module 5 · Exception monitoring
      { title: "Watching for the things people forget to check", durationLabel: "15m" },
      { title: "Alerts that get acted on rather than muted", durationLabel: "13m" },
      // Module 6 · Human in the loop
      { title: "Designing a sign-off that is real, not a rubber stamp", durationLabel: "16m" },
      { title: "What the agent must record about every decision", durationLabel: "15m" },
      // Module 7 · Running it in production
      { title: "When it breaks: failure modes and safe stopping", durationLabel: "16m" },
      { title: "Handover: making it survive you leaving", durationLabel: "13m" },
    ],
  },
  {
    slug: "ai-governance-risk-compliance",
    title: "AI Governance, Risk & Compliance for Firms",
    tagline: "Deploy AI safely in regulated work",
    summary:
      "Roll out Copilot and OpenAI Enterprise without breaching duty of care: data security, review controls, audit trails and a firm AI policy.",
    level: "Intermediate",
    priceCents: 59000,
    compareAtCents: 69000,
    learningHours: 4,
    lessonsLabel: "16 lessons",
    color: "#F59E0B",
    outcomes: [
      "Answer the five questions your board will ask about AI, with evidence",
      "Decide which tools are approved, for which data, and say why",
      "Assess a proposed use case before it starts, not after it goes wrong",
      "Leave with a one-page AI policy and an evidence trail that stands up",
    ],
    lessons: [
      // Module 1 · What your obligations already say
      { title: "You are already regulated: what applies without new AI law", durationLabel: "15m" },
      { title: "Australia's National AI Plan, and what it means for you", durationLabel: "16m" },
      { title: "Where the duty of care actually bites", durationLabel: "14m" },
      // Module 2 · The board conversation
      { title: "The five questions a board will ask about AI", durationLabel: "16m" },
      { title: "Answering them with evidence rather than reassurance", durationLabel: "15m" },
      { title: "What to put in the board paper, and what to leave out", durationLabel: "13m" },
      // Module 3 · Tools and data
      { title: "Classifying your data before you approve any tool", durationLabel: "15m" },
      { title: "Approving tools: the questions to ask a vendor", durationLabel: "16m" },
      { title: "The approved-use matrix your team can actually follow", durationLabel: "14m" },
      // Module 4 · Assessing a use case
      { title: "A one-page risk assessment that takes 20 minutes", durationLabel: "15m" },
      { title: "Deciding to proceed, proceed with controls, or decline", durationLabel: "14m" },
      // Module 5 · The policy
      { title: "The one-page AI policy every firm needs", durationLabel: "16m" },
      { title: "Making the policy something people follow", durationLabel: "13m" },
      // Module 6 · When it goes wrong
      { title: "Incident response: the first hour", durationLabel: "15m" },
      { title: "Telling a client or your board something went wrong", durationLabel: "14m" },
      // Module 7 · Evidence
      { title: "Showing an auditor or regulator how you decided", durationLabel: "15m" },
    ],
  },
];

export const getCourse = (slug: string) =>
  COURSES.find((c) => c.slug === slug);
