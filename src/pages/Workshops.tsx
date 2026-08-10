import { useState } from "react";
import { Link } from "react-router-dom";
import { PartnerBadge } from "../components/PartnerBadge";
import { InquiryModal } from "../components/InquiryModal";
import { WorkshopRegisterModal } from "../components/WorkshopRegisterModal";
import {
  WORKSHOPS,
  WORKSHOP_PROGRAM,
  workshopPriceLabel,
  workshopIncGstLabel,
  type Workshop,
} from "../data/workshops";

export function Workshops() {
  const [selected, setSelected] = useState<Workshop | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="bg-panel border border-line rounded-[26px] p-8 sm:p-12 mt-1">
        <div className="max-w-[720px]">
          <PartnerBadge />
          <div className="text-accent-ink text-[12px] font-bold uppercase tracking-[1.5px] mt-5">
            {WORKSHOP_PROGRAM.eyebrow}
          </div>
          <h1 className="text-[34px] sm:text-[46px] font-bold tracking-[-1.4px] leading-[1.05] mt-2 text-ink">
            {WORKSHOP_PROGRAM.title}
          </h1>
          <p className="text-[16.5px] sm:text-[18px] leading-relaxed mt-4 text-ink2 max-w-[600px]">
            {WORKSHOP_PROGRAM.blurb}
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-2 mt-6 text-[14.5px] text-ink2">
            <span>◷ {WORKSHOP_PROGRAM.durationLabel} live online</span>
            <span>
              ◎ {workshopPriceLabel()} per seat ({workshopIncGstLabel()})
            </span>
            <span>◈ Recording included</span>
          </div>
        </div>
      </section>

      {/* Upcoming dates */}
      <section className="mt-6">
        <div className="flex items-center gap-3">
          <h2 className="text-[15px] font-bold uppercase tracking-[1.5px] text-ink2">
            Upcoming dates
          </h2>
          <div className="h-px flex-1 bg-line" />
        </div>
        <div className="grid sm:grid-cols-3 gap-5 mt-5">
          {WORKSHOPS.map((w) => (
            <div
              key={w.id}
              className="bg-panel border border-line rounded-[20px] p-6 flex flex-col"
            >
              <div className="text-[13px] font-bold uppercase tracking-[1.2px] text-accent-ink">
                {w.shortDate}
              </div>
              <div className="text-[20px] font-bold tracking-[-0.4px] mt-1.5 leading-snug">
                {w.dateLabel}
              </div>
              <div className="text-ink2 text-[14px] mt-1.5">{w.timeLabel}</div>
              <div className="text-ink2 text-[14px]">
                {WORKSHOP_PROGRAM.durationLabel}, online
              </div>
              <div className="mt-auto pt-5">
                <div className="border-t border-line pt-4">
                  <div className="text-[22px] font-bold tracking-[-0.5px]">
                    {workshopPriceLabel()}
                  </div>
                  <div className="text-ink2 text-[12.5px] mt-0.5">
                    {workshopIncGstLabel()} per seat
                  </div>
                </div>
                <button
                  onClick={() => setSelected(w)}
                  className="btn btn-accent w-full justify-center mt-5"
                >
                  Register →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What we cover */}
      <section className="grid lg:grid-cols-[1.2fr_1fr] gap-5 mt-6">
        <div className="bg-panel border border-line rounded-[22px] p-6 sm:p-9">
          <h2 className="text-[24px] font-bold tracking-[-0.5px]">
            What we cover
          </h2>
          <p className="text-ink2 mt-2 text-[15px]">
            Ninety minutes, no theory for its own sake. Every section is
            something you can apply to your own work straight after.
          </p>
          <ol className="mt-6 space-y-3.5">
            {WORKSHOP_PROGRAM.agenda.map((a, i) => (
              <li key={a} className="flex gap-3.5 items-start">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#EEF2FF] text-[#4338CA] text-[13px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-[15.5px] leading-relaxed pt-0.5">{a}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-panel border border-line rounded-[22px] p-6 sm:p-8">
            <h3 className="text-[19px] font-bold tracking-[-0.3px]">
              What's included
            </h3>
            <ul className="mt-4 space-y-2.5">
              {WORKSHOP_PROGRAM.includes.map((i) => (
                <li key={i} className="flex gap-3 text-[15px] items-start">
                  <span className="text-accent font-bold">✓</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-panel border border-line rounded-[22px] p-6 sm:p-8">
            <h3 className="text-[19px] font-bold tracking-[-0.3px]">
              Who it's for
            </h3>
            <div className="flex flex-wrap gap-2.5 mt-4">
              {WORKSHOP_PROGRAM.audience.map((a) => (
                <span
                  key={a}
                  className="rounded-full px-3.5 py-2 text-[13.5px] font-semibold bg-[#EEF2FF] text-[#4338CA]"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team / private workshops */}
      <section className="bg-plum text-white rounded-[22px] p-8 sm:p-10 mt-6 flex flex-wrap justify-between items-center gap-7">
        <div className="max-w-[600px]">
          <h3 className="text-[24px] font-bold tracking-[-0.4px]">
            Bringing your team?
          </h3>
          <p className="text-white/70 mt-2.5 text-[15px] leading-relaxed">
            Book several seats and the team discount applies automatically at
            checkout: 15% off from 3 seats, 25% off from 10. For a private
            session run just for your firm, on your own workflows, get in touch.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/team" className="btn btn-accent">
            See team pricing →
          </Link>
          <button
            onClick={() => setInviteOpen(true)}
            className="btn bg-white/10 border border-white/25 text-white"
          >
            Request a private workshop
          </button>
        </div>
      </section>

      <WorkshopRegisterModal
        open={!!selected}
        onClose={() => setSelected(null)}
        workshop={selected}
      />
      <InquiryModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Private workshop"
        source="workshop-private"
        intro="Tell us about your team and what you'd like covered, and we'll come back with dates and pricing for a private session."
      />
    </>
  );
}
