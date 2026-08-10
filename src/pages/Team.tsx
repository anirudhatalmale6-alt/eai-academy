import { useState } from "react";
import { PartnerBadge } from "../components/PartnerBadge";
import { TeamPricing } from "../components/TeamPricing";
import { InquiryModal } from "../components/InquiryModal";
import { TEAM_TIERS } from "../data/courses";

const WHY = [
  {
    title: "One standard across the firm",
    body: "Everyone learns the same practical approach, so AI use across your team is consistent rather than ad hoc.",
  },
  {
    title: "Governance built in",
    body: "Your people learn what they can and cannot put into a model, and how to keep work reviewable and defensible.",
  },
  {
    title: "Central billing",
    body: "Pay for all seats in one transaction, or ask to be invoiced. One receipt, one record for your learning budget.",
  },
  {
    title: "Learning hours that count",
    body: "Every course and workshop carries a learning hours figure your team can record for their professional development.",
  },
];

export function Team() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="bg-panel border border-line rounded-[26px] p-8 sm:p-12 mt-1">
        <div className="max-w-[720px]">
          <PartnerBadge />
          <div className="text-accent-ink text-[12px] font-bold uppercase tracking-[1.5px] mt-5">
            For teams and firms
          </div>
          <h1 className="text-[34px] sm:text-[46px] font-bold tracking-[-1.4px] leading-[1.05] mt-2 text-ink">
            Train your whole team, for less.
          </h1>
          <p className="text-[16.5px] sm:text-[18px] leading-relaxed mt-4 text-ink2 max-w-[580px]">
            Enrol several people at once and the discount applies automatically
            at checkout, across any course, the full program or a live workshop.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            {TEAM_TIERS.map((t) => (
              <span
                key={t.size}
                className="rounded-full bg-[#EEF2FF] text-[#4338CA] px-4 py-2 text-[14px] font-semibold"
              >
                {t.size}: {t.discount === null ? "custom quote" : `${t.discount}% off`}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* The calculator + tiers */}
      <TeamPricing />

      {/* Why firms do it this way */}
      <section className="bg-panel border border-line rounded-[22px] p-6 sm:p-9 mt-6">
        <h2 className="text-[24px] font-bold tracking-[-0.5px]">
          What your firm gets out of it
        </h2>
        <div className="grid sm:grid-cols-2 gap-x-9 gap-y-7 mt-7">
          {WHY.map((w) => (
            <div key={w.title}>
              <h3 className="text-[17px] font-semibold tracking-[-0.2px]">
                {w.title}
              </h3>
              <p className="text-ink2 text-[15px] mt-1.5 leading-relaxed">
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Invoicing / large teams */}
      <section className="bg-plum text-white rounded-[22px] p-8 sm:p-10 mt-6 flex flex-wrap justify-between items-center gap-7">
        <div className="max-w-[600px]">
          <h3 className="text-[24px] font-bold tracking-[-0.4px]">
            25 or more seats, or prefer an invoice?
          </h3>
          <p className="text-white/70 mt-2.5 text-[15px] leading-relaxed">
            For larger firms we tailor the pricing and can invoice you directly
            rather than taking card payment. Tell us roughly how many people and
            what you'd like them to learn.
          </p>
        </div>
        <button onClick={() => setOpen(true)} className="btn btn-accent">
          Request team pricing →
        </button>
      </section>

      <InquiryModal
        open={open}
        onClose={() => setOpen(false)}
        title="Team pricing"
        source="team-pricing"
        intro="Tell us roughly how many people you'd like to enrol and which courses or workshops, and we'll send you team pricing."
      />
    </>
  );
}
