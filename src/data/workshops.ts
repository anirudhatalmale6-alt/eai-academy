// Live workshops: one 90 minute online session run on three dates.
// Price is A$249 + GST per seat; GST is added at checkout, so the card charge
// is A$273.90. KEEP IN SYNC with api/_lib/catalog.js (ids, price, dates).
//
// On the length: this was a 3 hour half day at A$549 + GST, which sat in the AU
// half-day masterclass bracket (Team 400 charge $799 + GST for a half day,
// PM-Partners from $795 + GST for a full day). The session is now 90 minutes,
// so it sits in the CPD webinar bracket instead, where comparable sessions sell
// for $198 to $250. A$249 is the top of that bracket, which the hands-on block,
// the templates and the recording justify; holding A$549 for half the time
// would not have been defensible. The agenda was cut to match, not relabelled.

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
  durationLabel: "90 minutes",
  priceExGstCents: 24900,
  blurb:
    "A practical 90 minutes on using today's AI tools in real finance and business work. Bring a task you actually do and leave with a workflow you can use the same week.",
  // Eight items was a 3 hour agenda. At 90 minutes the session covers less, so
  // the list says less rather than promising the same ground at speed.
  agenda: [
    "Choosing the right tool for the task: Microsoft Copilot, Claude, OpenAI Enterprise and Google Gemini",
    "Working with documents, spreadsheets and data",
    "Automating one routine finance or business workflow end to end",
    "Where AI should not be used, and what to check before you rely on it",
    "Bring your own task: short hands-on block and Q&A",
  ],
  platform: "Microsoft Teams",
  includes: [
    "Live 90 minute session on Microsoft Teams, with a short hands-on block and Q&A",
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
// claims about him. The photo is Angela's supplied stage shot, cropped square
// to 448px for the 112px card. The initials fallback is kept for the case where
// `photo` is ever set back to null.
export const PRESENTER = {
  name: "Tristan Tan",
  title: "Live workshop facilitator, Empathetic AI",
  linkedIn: "https://www.linkedin.com/in/tristantanaus",
  photo: "/tristan.jpg" as string | null,
  bio: "Tristan is part of the Empathetic AI team and has educated over a thousand professionals on how to scale AI individually and across the enterprise. As a domain expert in finance, law and tax, Tristan is an AI builder that has used AI to develop and deploy finance related applications and built scalable enterprise workflows.",
  takeawaysHeading: "What you will take away",
  takeaways: [
    "Create AI driven workflows that have been tested, verified and scaled through hands on experience.",
    "Learn to leverage AI directly into your enterprise applications to accelerate workflows and improve efficiency.",
    "Create your own AI embedded systems for finance directly within the Microsoft environment, leveraging the full suite of Copilot tools and Powerapps.",
  ],
};

// Times moved from 9:30am-12:30pm to a 12:00-1:30pm lunchtime slot: the
// presenter works full time, so a weekday morning no longer works, and
// lunchtime is the slot AU CPD webinars use because attendees can join without
// booking leave. Awaiting the client's confirmation of the slot.
export const WORKSHOPS: Workshop[] = [
  {
    id: "workshop-aug-2026",
    dateISO: "2026-08-28",
    dateLabel: "Friday 28 August 2026",
    shortDate: "28 Aug",
    timeLabel: "12:00pm to 1:30pm AEST",
  },
  {
    id: "workshop-sep-2026",
    dateISO: "2026-09-24",
    dateLabel: "Thursday 24 September 2026",
    shortDate: "24 Sep",
    timeLabel: "12:00pm to 1:30pm AEST",
  },
  {
    id: "workshop-oct-2026",
    dateISO: "2026-10-23",
    dateLabel: "Friday 23 October 2026",
    shortDate: "23 Oct",
    timeLabel: "12:00pm to 1:30pm AEDT",
  },
];

export const getWorkshop = (id: string) => WORKSHOPS.find((w) => w.id === id);

// A$249.00 style label from cents.
const aud = (cents: number) => {
  const dollars = cents / 100;
  const opts = Number.isInteger(dollars)
    ? {}
    : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  return `A$${dollars.toLocaleString("en-AU", opts)}`;
};

export const workshopIncGstCents = (exGstCents = WORKSHOP_PROGRAM.priceExGstCents) =>
  Math.round(exGstCents * (1 + GST_RATE));

// "A$249 + GST" — what we advertise.
export const workshopPriceLabel = () => `${aud(WORKSHOP_PROGRAM.priceExGstCents)} + GST`;
// "A$273.90 incl. GST" — what is actually charged.
export const workshopIncGstLabel = () => `${aud(workshopIncGstCents())} incl. GST`;
export const audLabel = aud;
