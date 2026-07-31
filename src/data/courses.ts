export type Level = "Beginner" | "Intermediate" | "Advanced" | "Certificate";

export interface Course {
  slug: string;
  title: string;
  tagline: string; // small accent eyebrow, e.g. "Great for people new to AI"
  summary: string;
  level: Level;
  priceCents: number; // 0 = free
  durationLabel: string; // "1h 20m" or "5-course path"
  lessonsLabel: string; // "6 lessons"
  color: string; // one pure brand colour for the course (thumbnail + accent)
  outcomes: string[];
  lessons: { title: string; durationLabel: string }[];
}

export const money = (cents: number) =>
  cents === 0 ? "Free" : `$${(cents / 100).toFixed(cents % 100 ? 2 : 0)}`;

// Seed catalog. Placeholder content; real courses will live in Supabase and
// be editable from the admin. Titles/prices are tunable to the real offering.
export const COURSES: Course[] = [
  {
    slug: "ai-foundations-for-finance",
    title: "AI Foundations for Finance",
    tagline: "Great for people new to AI",
    summary:
      "What AI can and can't do in tax & accounting, and how to use it responsibly. Your starting point.",
    level: "Beginner",
    priceCents: 0,
    durationLabel: "1h 20m",
    lessonsLabel: "6 lessons",
    color: "#3B82F6",
    outcomes: [
      "Understand where AI genuinely helps in finance work, and where it doesn't",
      "Use AI responsibly within professional and regulatory obligations",
      "Build a simple, safe day-to-day workflow you can start using immediately",
    ],
    lessons: [
      { title: "Why AI matters for finance professionals", durationLabel: "10m" },
      { title: "How large language models actually work", durationLabel: "14m" },
      { title: "What AI is good at (and what to avoid)", durationLabel: "12m" },
      { title: "Responsible use & professional judgement", durationLabel: "15m" },
      { title: "Your first practical workflow", durationLabel: "16m" },
      { title: "Where to go next", durationLabel: "13m" },
    ],
  },
  {
    slug: "prompting-for-auditable-answers",
    title: "Prompting for Auditable Answers",
    tagline: "Get reliable, auditable outputs",
    summary:
      "Get reliable, source-traceable outputs you can defend in regulated work. Templates included.",
    level: "Beginner",
    priceCents: 7900,
    durationLabel: "2h 40m",
    lessonsLabel: "11 lessons",
    color: "#8B5CF6",
    outcomes: [
      "Write prompts that produce consistent, defensible answers",
      "Build source-traceability into every output",
      "Reuse a library of prompt templates for common finance tasks",
    ],
    lessons: [
      { title: "The anatomy of a reliable prompt", durationLabel: "14m" },
      { title: "Giving the model the right context", durationLabel: "15m" },
      { title: "Source-traceability techniques", durationLabel: "16m" },
    ],
  },
  {
    slug: "automating-tax-workflows-with-agents",
    title: "Automating Tax Workflows with Agents",
    tagline: "For people ready to automate",
    summary:
      "Design agent workflows that handle real firm tasks end to end, with a human in the loop.",
    level: "Intermediate",
    priceCents: 14900,
    durationLabel: "4h 10m",
    lessonsLabel: "18 lessons",
    color: "#EC4899",
    outcomes: [
      "Map a firm task into an automatable agent workflow",
      "Keep a human in the loop for accuracy and accountability",
      "Measure time saved and quality maintained",
    ],
    lessons: [
      { title: "What an AI agent is", durationLabel: "13m" },
      { title: "Designing a safe workflow", durationLabel: "18m" },
    ],
  },
  {
    slug: "ai-governance-risk-compliance",
    title: "AI Governance, Risk & Compliance",
    tagline: "Stay compliant & safe",
    summary:
      "Deploy AI without breaching duty of care: data security, review controls and audit trails.",
    level: "Intermediate",
    priceCents: 14900,
    durationLabel: "3h 30m",
    lessonsLabel: "14 lessons",
    color: "#14B8A6",
    outcomes: [
      "Put the right review controls and audit trails in place",
      "Handle client data securely and compliantly",
      "Build an AI governance policy for your firm",
    ],
    lessons: [
      { title: "Duty of care in an AI world", durationLabel: "15m" },
      { title: "Data security essentials", durationLabel: "16m" },
    ],
  },
  {
    slug: "your-firms-private-ai-assistant",
    title: "Your Firm's Private AI Assistant",
    tagline: "Build for your firm",
    summary:
      "Stand up a secure, firm-specific assistant on your own data. From pilot to rollout.",
    level: "Advanced",
    priceCents: 19900,
    durationLabel: "5h 00m",
    lessonsLabel: "22 lessons",
    color: "#F59E0B",
    outcomes: [
      "Plan a private assistant tailored to your firm",
      "Connect it safely to your own documents and data",
      "Run a pilot and roll it out to the team",
    ],
    lessons: [
      { title: "Architecture of a private assistant", durationLabel: "18m" },
      { title: "Grounding it in your data", durationLabel: "20m" },
    ],
  },
  {
    slug: "certified-ai-in-finance-practitioner",
    title: "Certified AI-in-Finance Practitioner",
    tagline: "The capstone credential",
    summary:
      "The capstone path. Complete the courses, pass the assessment, and earn the credential.",
    level: "Certificate",
    priceCents: 39900,
    durationLabel: "5-course path",
    lessonsLabel: "Assessment included",
    color: "#6366F1",
    outcomes: [
      "Complete the full learning path end to end",
      "Pass the practitioner assessment",
      "Earn a shareable certificate backed by an OpenAI Select Partner",
    ],
    lessons: [
      { title: "The five courses in the path", durationLabel: "" },
      { title: "Final assessment", durationLabel: "" },
    ],
  },
];

export const getCourse = (slug: string) =>
  COURSES.find((c) => c.slug === slug);
