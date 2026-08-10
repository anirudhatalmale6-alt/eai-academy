// Live workshops: one 1.5 hour online session run on three dates.
// Price is A$249 + GST per seat; GST is added at checkout, so the card charge
// is A$273.90. KEEP IN SYNC with api/_lib/catalog.js (ids, price, dates).

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
  durationLabel: "1.5 hours",
  priceExGstCents: 24900,
  blurb:
    "A practical, hands-on session on using today's AI tools in real finance and business work. Bring your own tasks and leave with workflows you can use the same week.",
  agenda: [
    "Microsoft Copilot, Claude, OpenAI Enterprise and Google Gemini",
    "Choosing the right AI tool for different tasks",
    "Research, analysis and decision support",
    "Automating routine finance and business workflows",
    "Working with documents, spreadsheets and data",
    "Building effective human-AI workflows",
  ],
  platform: "Microsoft Teams",
  includes: [
    "Live 1.5 hour session on Microsoft Teams, with Q&A",
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
