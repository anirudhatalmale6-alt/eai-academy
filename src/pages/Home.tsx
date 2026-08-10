import { useState } from "react";
import { Link } from "react-router-dom";
import { COURSES } from "../data/courses";
import { EnrollModal } from "../components/EnrollModal";
import { InquiryModal } from "../components/InquiryModal";
import { PartnerBadge } from "../components/PartnerBadge";

// The Home page is the general introduction to the Academy only. Course
// detail, pricing and workshop dates live on their own pages, so nothing is
// duplicated here: these cards point at them instead.
const WAYS: {
  to: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  color: string;
}[] = [
  {
    to: "/courses",
    eyebrow: "Learn at your own pace",
    title: "Courses",
    body: "Self-paced online courses that take you from your first prompt to running governed AI across a firm. Start with the free one.",
    cta: "Browse courses",
    color: "#3B82F6",
  },
  {
    to: "/workshops",
    eyebrow: "Live and hands-on",
    title: "Live Workshops",
    body: "Short live sessions where we work through real finance and business tasks together, with time for your own questions.",
    cta: "See upcoming dates",
    color: "#7C5CFF",
  },
  {
    to: "/team",
    eyebrow: "For firms",
    title: "Team",
    body: "Bring your whole team up to the same standard, with volume pricing and central billing for the firm.",
    cta: "See team pricing",
    color: "#E24BE0",
  },
  {
    to: "/ai-advisory",
    eyebrow: "For leadership",
    title: "AI Advisory",
    body: "A senior engagement for organisations ready to set their AI direction and put the governance in place to move with confidence.",
    cta: "Explore advisory",
    color: "#14B8A6",
  },
];

const PROOF = [
  {
    title: "Built by practitioners",
    body: "We are an OpenAI Select Partner. The people teaching are the people building AI in production, not career trainers.",
  },
  {
    title: "Finance-grade by default",
    body: "Data sensitivity, review and audit trails are part of every lesson, not an afterthought bolted on at the end.",
  },
  {
    title: "Practical, not theoretical",
    body: "Every session ends with something you can use in your own work the same week. Templates included.",
  },
];

export function Home() {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const freeCourse = COURSES.find((c) => c.priceCents === 0)!;

  return (
    <>
      {/* Hero — light, bright, clean (no gradients) */}
      <section className="relative overflow-hidden rounded-[26px] bg-panel border border-line p-8 sm:p-14">
        <div className="relative z-10 max-w-[660px]">
          <PartnerBadge />
          <h1 className="text-[40px] sm:text-[58px] font-bold tracking-[-2px] leading-[1.0] mt-5 text-ink">
            Master <span className="text-accent">AI for finance</span>, from the
            people trusted to build it.
          </h1>
          <p className="text-[17px] sm:text-[18.5px] leading-relaxed mt-5 text-ink2 max-w-[540px]">
            Practical, credible training for finance, accounting and business
            professionals, from an OpenAI Select Partner. Start free, then go as
            deep as you like.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <button
              onClick={() => setEnrollOpen(true)}
              className="btn btn-accent"
            >
              Start the free course →
            </button>
            <Link to="/courses" className="btn btn-white">
              Browse courses
            </Link>
          </div>
        </div>
      </section>

      {/* Ways to learn with us — general signposts, no course detail */}
      <section className="mt-6">
        <div className="flex items-center gap-3">
          <h2 className="text-[15px] font-bold uppercase tracking-[1.5px] text-ink2">
            Ways to learn with us
          </h2>
          <div className="h-px flex-1 bg-line" />
        </div>
        <div className="grid sm:grid-cols-2 gap-5 mt-5">
          {WAYS.map((w) => (
            <Link
              key={w.to}
              to={w.to}
              className="group block bg-panel border border-line rounded-[20px] p-7 transition hover:shadow-[0_14px_30px_rgba(24,26,31,0.09)] hover:-translate-y-[3px]"
            >
              <div
                className="text-[12px] font-bold uppercase tracking-[1.4px]"
                style={{ color: w.color }}
              >
                {w.eyebrow}
              </div>
              <h3 className="text-[23px] font-bold tracking-[-0.5px] mt-1.5">
                {w.title}
              </h3>
              <p className="text-ink2 text-[15px] mt-2.5 leading-relaxed">
                {w.body}
              </p>
              <span className="inline-block mt-4 text-[14.5px] font-semibold text-accent-ink">
                {w.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why the Academy */}
      <section className="bg-panel border border-line rounded-[22px] p-6 sm:p-9 mt-6">
        <div className="max-w-[680px]">
          <h2 className="text-[26px] sm:text-[30px] font-bold tracking-[-0.6px]">
            Why Empathetic AI Academy
          </h2>
          <p className="text-ink2 mt-2.5 text-[15.5px] leading-relaxed">
            Most AI training is either too generic to be useful or too technical
            to apply. We teach the way finance and business people actually
            work, with the judgement and the guardrails included.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-x-8 gap-y-7 mt-8">
          {PROOF.map((p) => (
            <div key={p.title}>
              <h3 className="text-[17px] font-semibold tracking-[-0.2px]">
                {p.title}
              </h3>
              <p className="text-ink2 text-[15px] mt-1.5 leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Free course CTA */}
      <section className="bg-panel border border-line rounded-[22px] p-8 sm:p-10 mt-6 flex flex-wrap justify-between items-center gap-7">
        <div className="max-w-[560px]">
          <div className="text-accent-ink text-[12px] font-bold uppercase tracking-[1.5px]">
            Start here, free
          </div>
          <h3 className="text-[24px] font-bold tracking-[-0.4px] mt-2">
            Not sure where to begin?
          </h3>
          <p className="text-ink2 mt-2.5 text-[15px] leading-relaxed">
            Our introductory course is free and takes about two hours. It is the
            fastest way to see whether this is the right fit for you or your
            team, at no cost.
          </p>
        </div>
        <button onClick={() => setEnrollOpen(true)} className="btn btn-accent">
          Start the free course →
        </button>
      </section>

      {/* We build AI products (funnel) — solid deep-plum */}
      <section className="bg-plum text-white rounded-[22px] p-8 sm:p-10 mt-6 flex flex-wrap justify-between items-center gap-7">
        <div className="max-w-[560px]">
          <h3 className="text-[24px] font-bold tracking-[-0.4px]">
            Taught by a company that ships AI in production.
          </h3>
          <p className="text-white/70 mt-2.5 text-[15px] leading-relaxed">
            Empathetic AI isn't a training brand that dabbles in AI. We build the
            agents finance and business teams use every day, and the Academy is
            the front door to what we build.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <a href="https://www.empathetic-ai.com" className="btn btn-accent">
            Explore our AI products →
          </a>
          <button
            onClick={() => setDemoOpen(true)}
            className="btn bg-white/10 border border-white/25 text-white"
          >
            Request a demo
          </button>
        </div>
      </section>

      <EnrollModal
        open={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        courseTitle={freeCourse.title}
        courseSlug={freeCourse.slug}
      />
      <InquiryModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Empathetic AI"
        source="ai-product"
        intro="Tell us about your firm and what you'd like to see, and we'll set up a demo of our AI products."
      />
    </>
  );
}
