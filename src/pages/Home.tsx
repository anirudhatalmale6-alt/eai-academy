import { useState } from "react";
import { Link } from "react-router-dom";
import { COURSES } from "../data/courses";
import { CourseCard } from "../components/CourseCard";
import { BundleCard } from "../components/BundleCard";
import { EnrollModal } from "../components/EnrollModal";
import { InquiryModal } from "../components/InquiryModal";
import { PartnerBadge } from "../components/PartnerBadge";

// Premium, memorable topic tags — soft pastels, on-brand toward lavender/blue/pink.
const TOPICS: { label: string; cls: string }[] = [
  { label: "AI Foundations", cls: "bg-[#EEEBFB] text-[#5b46c9]" },
  { label: "Prompting", cls: "bg-[#E7F0FE] text-[#2563EB]" },
  { label: "Tax Automation", cls: "bg-[#FCEAF6] text-[#c02b8a]" },
  { label: "Governance & Risk", cls: "bg-[#EAF5F0] text-[#0f8a5f]" },
  { label: "Compliance", cls: "bg-[#F4F0E4] text-[#9a7b1f]" },
  { label: "Agents & Workflows", cls: "bg-[#ECEBFC] text-[#6d4bd8]" },
  { label: "Firm Rollout", cls: "bg-[#E9F1FF] text-[#3157d6]" },
  { label: "Certification", cls: "bg-[#FBEAF3] text-[#b02f78]" },
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
            Practical, credible training for tax, accounting and finance
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

      {/* Popular topics — premium pastel tags */}
      <section className="mt-6">
        <div className="flex items-center gap-3">
          <h2 className="text-[15px] font-bold uppercase tracking-[1.5px] text-ink2">
            Explore topics
          </h2>
          <div className="h-px flex-1 bg-line" />
        </div>
        <div className="flex flex-wrap gap-2.5 mt-4">
          {TOPICS.map((t) => (
            <Link
              key={t.label}
              to="/courses"
              className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-transform hover:-translate-y-0.5 ${t.cls}`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="bg-panel border border-line rounded-[22px] p-6 sm:p-9 mt-6">
        <h2 className="text-[26px] sm:text-[30px] font-bold tracking-[-0.6px] text-center">
          Courses
        </h2>
        <p className="text-center text-ink2 mt-2 text-[15.5px]">
          A path from your first prompt to deploying governed AI across your firm.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {COURSES.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      {/* Complete-program bundle */}
      <BundleCard />

      {/* We build AI products (funnel) — solid deep-plum */}
      <section className="bg-plum text-white rounded-[22px] p-8 sm:p-10 mt-6 flex flex-wrap justify-between items-center gap-7">
        <div className="max-w-[560px]">
          <h3 className="text-[24px] font-bold tracking-[-0.4px]">
            Taught by a company that ships AI in production.
          </h3>
          <p className="text-white/70 mt-2.5 text-[15px] leading-relaxed">
            Empathetic AI isn't a training brand that dabbles in AI. We build the
            agents finance teams use every day, and the Academy is the front door
            to what we build.
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
