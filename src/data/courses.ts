export type Level = "Beginner" | "Intermediate" | "Advanced" | "Certificate";

export interface Course {
  slug: string;
  title: string;
  tagline: string; // small accent eyebrow, e.g. "The tool most firms already have"
  summary: string;
  level: Level;
  priceCents: number; // 0 = free
  durationLabel: string; // "1h 20m" or "5-course path"
  lessonsLabel: string; // "6 lessons"
  color: string; // one pure brand colour for the course (thumbnail + accent)
  outcomes: string[];
  lessons: { title: string; durationLabel: string }[];
}

// Prices are in Australian dollars (whole dollars), formatted "A$1,990".
export const money = (cents: number) =>
  cents === 0 ? "Free" : `A$${(cents / 100).toLocaleString("en-AU")}`;

// Launch bundle: the 4 paid courses + assessment + certificate, sold as one
// premium program. Anchored to the ~A$2,400 Australian market rate for a
// 4-part AI-in-finance program, with a bundle saving.
export const BUNDLE = {
  title: "Certified AI-in-Finance Practitioner",
  blurb:
    "All four paid courses, the practitioner assessment and your certificate, as one complete program.",
  priceCents: 199000,
  color: "#6366F1",
  includes: [
    "Microsoft 365 Copilot for Finance",
    "Prompting for Reliable, Auditable Answers",
    "Automating Finance Workflows with AI Agents",
    "AI Governance, Risk & Compliance for Firms",
    "Practitioner assessment + certificate",
  ],
};

// Team pricing: volume discount when a firm enrols several people at once.
// Percentages are easy to change here. `discount: null` = custom / let's talk.
export const TEAM_TIERS: { size: string; discount: number | null }[] = [
  { size: "3 to 9 people", discount: 15 },
  { size: "10 to 24 people", discount: 25 },
  { size: "25 or more", discount: null },
];

// Launch catalog, oriented to the tools Australian firms actually use:
// Microsoft 365 Copilot first, with OpenAI / ChatGPT Enterprise coverage.
// Placeholder lesson detail; real content will be produced via the playbook
// and managed from the admin.
export const COURSES: Course[] = [
  {
    slug: "ai-foundations-for-finance",
    title: "AI Foundations for Finance",
    tagline: "Start here, no experience needed",
    summary:
      "What AI can and can't do in finance, plus the Copilot, ChatGPT and OpenAI Enterprise landscape for Australian firms. Used responsibly.",
    level: "Beginner",
    priceCents: 0,
    durationLabel: "1h 20m",
    lessonsLabel: "6 lessons",
    color: "#3B82F6",
    outcomes: [
      "Understand where AI genuinely helps in finance work, and where it doesn't",
      "Know the difference between Copilot, ChatGPT and OpenAI Enterprise, and which fits your firm",
      "Use AI responsibly within professional and regulatory obligations",
    ],
    lessons: [
      { title: "Why AI matters for finance professionals", durationLabel: "10m" },
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
      "Use Microsoft 365 Copilot across Excel, Outlook, Word, Teams and PowerPoint for everyday finance and accounting work.",
    level: "Beginner",
    priceCents: 59000,
    durationLabel: "2h 40m",
    lessonsLabel: "11 lessons",
    color: "#8B5CF6",
    outcomes: [
      "Draft, summarise and analyse faster in the Microsoft 365 apps you already use",
      "Build reliable Copilot habits for real finance and accounting tasks",
      "Avoid the common Copilot mistakes that lead to wrong answers",
    ],
    lessons: [
      { title: "Copilot in Excel for finance", durationLabel: "16m" },
      { title: "Copilot in Outlook & Teams", durationLabel: "15m" },
      { title: "Copilot in Word & PowerPoint", durationLabel: "14m" },
      { title: "Getting reliable results every time", durationLabel: "15m" },
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
    durationLabel: "2h 20m",
    lessonsLabel: "10 lessons",
    color: "#EC4899",
    outcomes: [
      "Write prompts that produce consistent, defensible answers",
      "Build source-traceability into every output",
      "Reuse a prompt library for common finance and tax tasks",
    ],
    lessons: [
      { title: "The anatomy of a reliable prompt", durationLabel: "14m" },
      { title: "Giving the model the right context", durationLabel: "15m" },
      { title: "Source-traceability techniques", durationLabel: "16m" },
    ],
  },
  {
    slug: "automating-finance-workflows",
    title: "Automating Finance Workflows with AI Agents",
    tagline: "Copilot Studio & OpenAI",
    summary:
      "Design agent workflows in Copilot Studio and OpenAI that handle real firm tasks end to end, with a human in the loop.",
    level: "Intermediate",
    priceCents: 59000,
    durationLabel: "4h 10m",
    lessonsLabel: "18 lessons",
    color: "#14B8A6",
    outcomes: [
      "Map a firm task into an automatable agent workflow",
      "Build a working agent in Copilot Studio",
      "Keep a human in the loop for accuracy and accountability",
    ],
    lessons: [
      { title: "What an AI agent really is", durationLabel: "13m" },
      { title: "Building your first agent in Copilot Studio", durationLabel: "20m" },
      { title: "Designing a safe, reviewable workflow", durationLabel: "18m" },
    ],
  },
  {
    slug: "ai-governance-risk-compliance",
    title: "AI Governance, Risk & Compliance for Firms",
    tagline: "Deploy AI safely in regulated work",
    summary:
      "Roll out Copilot and OpenAI Enterprise without breaching duty of care: data security, review controls, audit trails and a firm AI policy.",
    level: "Advanced",
    priceCents: 69000,
    durationLabel: "3h 30m",
    lessonsLabel: "14 lessons",
    color: "#F59E0B",
    outcomes: [
      "Handle client data securely across Copilot and OpenAI Enterprise",
      "Put the right review controls and audit trails in place",
      "Write a practical AI policy for your firm",
    ],
    lessons: [
      { title: "Duty of care in an AI world", durationLabel: "15m" },
      { title: "Data security in Copilot & OpenAI Enterprise", durationLabel: "16m" },
      { title: "Building your firm's AI policy", durationLabel: "15m" },
    ],
  },
];

export const getCourse = (slug: string) =>
  COURSES.find((c) => c.slug === slug);
