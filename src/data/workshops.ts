// Live workshops: one half-day (3 hour) online session run on three dates.
// Price is A$549 + GST per seat; GST is added at checkout, so the card charge
// is A$603.90. KEEP IN SYNC with api/_lib/catalog.js (ids, price, dates).
//
// On the length: A$549 sits in the AU half-day masterclass bracket (Team 400
// charge $799 + GST for a half day, PM-Partners from $795 + GST for a full
// day), whereas 1.5 hour CPD webinars sell for $198 to $250. So the price and
// the duration were moved together.

export const GST_RATE = 0.1;

export interface Workshop {
  id: string;
  dateISO: string; // for sorting and the calendar link
  dateLabel: string; // "Friday 28 August 2026"
  shortDate: string; // "28 Aug"
  timeLabel: string;
}

// The program is the same each time, so it lives once here.
export const WORKSHOP_PROGRAM = {
  title: "Using AI in Finance and Business Workflows",
  eyebrow: "Live online workshop",
  durationLabel: "3 hours",
  priceExGstCents: 54900,
  blurb:
    "A practical, hands-on half day on using today's AI tools in real finance and business work. Bring your own tasks and leave with workflows you can use the same week.",
  agenda: [
    "Microsoft Copilot, Claude, OpenAI Enterprise and Google Gemini",
    "Choosing the right AI tool for different tasks",
    "Research, analysis and decision support",
    "Automating routine finance and business workflows",
    "Working with documents, spreadsheets and data",
    "Building effective human-AI workflows",
    "Hands-on block: build one workflow on your own task, with help on the call",
    "Where AI should not be used, and what to check before you rely on it",
  ],
  platform: "Microsoft Teams",
  includes: [
    "Live 3 hour session on Microsoft Teams, with a hands-on block and Q&A",
    "Recording afterwards if you cannot attend live",
    "Prompt and workflow templates to take away",
    "Attendance record for your learning hours",
  ],
  audience: [
    "Finance and accounting teams",
    "Business owners and managers",
    "CFOs and finance directors",
    "Anyone doing knowledge work with documents and data",
  ],
};

// Who delivers the live workshops. Angela runs the self-paced courses; the
// live sessions are delivered by Tristan. The bio is Angela's own wording,
// used verbatim. Her three bullets are written as learner outcomes rather than
// as credentials, so they render under "What you will take away", not as
// claims about him. `photo` stays null until she sends one, and the card falls
// back to initials so it looks finished either way.
export const PRESENTER = {
  name: "Tristan Tan",
  title: "Live workshop facilitator, Empathetic AI",
  linkedIn: "https://www.linkedin.com/in/tristantanaus",
  photo: null as string | null,
  bio: "Tristan is part of the Empathetic AI team and has educated over a thousand professionals on how to scale AI individually and across the enterprise. As a domain expert in finance, law and tax, Tristan is an AI builder that has used AI to develop and deploy finance related applications and built scalable enterprise workflows.",
  takeawaysHeading: "What you will take away",
  takeaways: [
    "Create AI driven workflows that have been tested, verified and scaled through hands on experience.",
    "Learn to leverage AI directly into your enterprise applications to accelerate workflows and improve efficiency.",
    "Create your own AI embedded systems for finance directly within the Microsoft environment, leveraging the full suite of Copilot tools and Powerapps.",
  ],
};

export const WORKSHOPS: Workshop[] = [
  {
    id: "workshop-aug-2026",
    dateISO: "2026-08-28",
    dateLabel: "Friday 28 August 2026",
    shortDate: "28 Aug",
    timeLabel: "9:30am to 12:30pm AEST",
  },
  {
    id: "workshop-sep-2026",
    dateISO: "2026-09-24",
    dateLabel: "Thursday 24 September 2026",
    shortDate: "24 Sep",
    timeLabel: "9:30am to 12:30pm AEST",
  },
  {
    id: "workshop-oct-2026",
    dateISO: "2026-10-23",
    dateLabel: "Friday 23 October 2026",
    shortDate: "23 Oct",
    timeLabel: "9:30am to 12:30pm AEDT",
  },
];

export const getWorkshop = (id: string) => WORKSHOPS.find((w) => w.id === id);

// A$549.00 style label from cents.
const aud = (cents: number) => {
  const dollars = cents / 100;
  const opts = Number.isInteger(dollars)
    ? {}
    : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  return `A$${dollars.toLocaleString("en-AU", opts)}`;
};

export const workshopIncGstCents = (exGstCents = WORKSHOP_PROGRAM.priceExGstCents) =>
  Math.round(exGstCents * (1 + GST_RATE));

// "A$549 + GST" — what we advertise.
export const workshopPriceLabel = () => `${aud(WORKSHOP_PROGRAM.priceExGstCents)} + GST`;
// "A$603.90 incl. GST" — what is actually charged.
export const workshopIncGstLabel = () => `${aud(workshopIncGstCents())} incl. GST`;
export const audLabel = aud;
