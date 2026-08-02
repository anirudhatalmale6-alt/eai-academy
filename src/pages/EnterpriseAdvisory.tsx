import { useState } from "react";
import { PartnerBadge } from "../components/PartnerBadge";
import { InquiryModal } from "../components/InquiryModal";

// Presented as a premium executive PROGRAM (client's scope), not a service list.
// No price shown. CTA collects the enquiry into Supabase (inquiries table).
const INCLUDED = [
  "Executive AI Strategy",
  "AI Governance Framework",
  "Microsoft Copilot Adoption Roadmap",
  "Finance AI Operating Model",
  "AI Policy & Risk Review",
  "Executive Workshops",
  "Monthly Advisory Sessions",
  "Direct access to Angela",
];

const DELIVERABLES = [
  "AI Strategy",
  "AI Roadmap",
  "Governance Framework",
  "Executive Briefings",
  "Board Presentation",
  "Implementation Plan",
];

const AUDIENCE = ["CFO", "CEO", "Finance Director", "Board", "Accounting Firms"];

export function EnterpriseAdvisory() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="bg-panel border border-line rounded-[26px] p-8 sm:p-12 mt-1">
        <div className="max-w-[720px]">
          <PartnerBadge />
          <div className="text-accent-ink text-[12px] font-bold uppercase tracking-[1.5px] mt-5">
            Enterprise AI Advisory
          </div>
          <h1 className="text-[34px] sm:text-[46px] font-bold tracking-[-1.4px] leading-[1.03] mt-2 text-ink">
            AI Transformation Advisory
          </h1>
          <p className="text-[16.5px] sm:text-[18px] leading-relaxed mt-4 text-ink2 max-w-[560px]">
            Designed for organisations ready to operationalise AI across
            Finance. A senior, hands-on program that sets your firm's AI
            direction and puts the governance in place to move with confidence.
          </p>
        </div>
      </section>

      {/* Program card */}
      <section className="bg-plum text-white rounded-[22px] p-8 sm:p-11 mt-6">
        <div className="grid lg:grid-cols-[1fr_320px] gap-9 items-start">
          <div>
            <div
              className="text-[12px] font-bold uppercase tracking-[1.5px]"
              style={{ color: "#a5b4fc" }}
            >
              Executive Advisory Program
            </div>
            <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.7px] mt-2">
              A tailored executive engagement
            </h2>
            <p className="text-white/70 mt-3 text-[15px] max-w-[560px] leading-relaxed">
              Partner directly with Empathetic AI, an OpenAI Select Partner, to
              take your firm from intent to a governed, working AI operating
              model across Finance.
            </p>

            <div className="text-[12px] font-bold uppercase tracking-[1.5px] mt-8 text-white/80">
              What's included
            </div>
            <ul className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {INCLUDED.map((i) => (
                <li key={i} className="flex gap-2.5 text-[14.5px] text-white/90">
                  <span style={{ color: "#a5b4fc" }} className="font-bold">
                    ✓
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/[0.06] border border-white/15 rounded-2xl p-7">
            <div className="text-white/60 text-[13px] font-semibold uppercase tracking-[1px]">
              Engagement
            </div>
            <div className="text-[26px] font-bold tracking-[-0.6px] mt-1.5 leading-tight">
              Flexible term
            </div>
            <p className="text-white/60 text-[13.5px] mt-2 leading-relaxed">
              Typically 3 to 6 months, scoped to your firm. Get in touch and we'll
              shape it around what you need.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="btn btn-accent w-full justify-center mt-6"
            >
              Contact us →
            </button>
            <p className="text-white/50 text-[12px] mt-3 text-center">
              We'll respond personally.
            </p>
          </div>
        </div>
      </section>

      {/* Deliverables + Who it's for */}
      <section className="grid lg:grid-cols-2 gap-5 mt-6">
        <div className="bg-panel border border-line rounded-[22px] p-6 sm:p-8">
          <h3 className="text-[20px] font-bold tracking-[-0.4px]">Deliverables</h3>
          <ul className="mt-5 space-y-2.5">
            {DELIVERABLES.map((d) => (
              <li key={d} className="flex gap-3 items-center text-[15px]">
                <span className="text-accent font-bold">✓</span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-panel border border-line rounded-[22px] p-6 sm:p-8">
          <h3 className="text-[20px] font-bold tracking-[-0.4px]">Who it's for</h3>
          <div className="flex flex-wrap gap-2.5 mt-5">
            {AUDIENCE.map((a) => (
              <span
                key={a}
                className="rounded-full px-4 py-2 text-[14px] font-semibold bg-[#EEF2FF] text-[#4338CA]"
              >
                {a}
              </span>
            ))}
          </div>
          <p className="text-ink2 mt-6 text-[14.5px] leading-relaxed">
            For leadership teams accountable for how their firm adopts AI:
            setting the strategy, owning the risk, and making it real across
            Finance.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-panel border border-line rounded-[22px] p-8 sm:p-10 mt-6 flex flex-wrap justify-between items-center gap-6">
        <div className="max-w-[560px]">
          <h3 className="text-[24px] font-bold tracking-[-0.4px]">
            Ready to operationalise AI across your firm?
          </h3>
          <p className="text-ink2 mt-2.5 text-[15px] leading-relaxed">
            Tell us where your firm is heading and we'll come back to you to
            scope the program.
          </p>
        </div>
        <button onClick={() => setOpen(true)} className="btn btn-accent">
          Contact us →
        </button>
      </section>

      <InquiryModal
        open={open}
        onClose={() => setOpen(false)}
        title="Enterprise Advisory Program"
        source="advisory"
        intro="Tell us about your firm and what you're looking to achieve, and we'll be in touch to scope the program."
      />
    </>
  );
}
