import { useState } from "react";
import { Link } from "react-router-dom";
import { COURSES } from "../data/courses";
import { CourseCard } from "../components/CourseCard";
import { EnrollModal } from "../components/EnrollModal";
import { PartnerBadge } from "../components/PartnerBadge";

export function Home() {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const freeCourse = COURSES.find((c) => c.priceCents === 0)!;

  return (
    <>
      {/* Hero */}
      <section className="rounded-[22px] overflow-hidden relative min-h-[390px] flex items-center p-8 sm:p-14 text-white bg-gradient-to-br from-[#0aa4d8] via-[#22bde6] to-[#e05bd6]">
        <div className="absolute inset-0 bg-[radial-gradient(700px_300px_at_80%_120%,rgba(255,255,255,0.25),transparent)]" />
        <div className="relative z-10 max-w-[640px]">
          <PartnerBadge variant="glass" />
          <h1 className="text-[38px] sm:text-[52px] font-bold tracking-[-1.5px] leading-[1.02] mt-4">
            Empathetic AI Academy
          </h1>
          <p className="text-[17px] sm:text-[18px] leading-relaxed mt-4 text-white/90 max-w-[520px]">
            Master AI for tax, accounting and finance. Practical, credible
            training from an OpenAI Select Partner. Start free, then go as deep
            as you like.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setEnrollOpen(true)}
              className="btn bg-white text-ink font-bold border-none"
            >
              Start the free course →
            </button>
            <Link
              to="/courses"
              className="btn bg-white/15 border border-white/45 text-white"
            >
              Browse courses
            </Link>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="bg-panel border border-line rounded-[20px] p-6 sm:p-9 mt-6">
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

      {/* We build AI products (funnel) */}
      <section className="bg-ink text-white rounded-[20px] p-8 sm:p-9 mt-6 flex flex-wrap justify-between items-center gap-7">
        <div className="max-w-[540px]">
          <h3 className="text-[23px] font-bold tracking-[-0.4px]">
            Taught by a company that ships AI in production.
          </h3>
          <p className="text-white/70 mt-2 text-[15px] leading-relaxed">
            Empathetic AI isn't a training brand that dabbles in AI. We build
            the agents finance teams use every day, and the Academy is the front
            door to what we build.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="https://www.empathetic-ai.com"
            className="btn btn-cyan"
          >
            Explore our AI products →
          </a>
          <a
            href="https://www.empathetic-ai.com"
            className="btn bg-transparent border border-white/25 text-white"
          >
            Request a demo
          </a>
        </div>
      </section>

      <EnrollModal
        open={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        courseTitle={freeCourse.title}
        courseSlug={freeCourse.slug}
      />
    </>
  );
}
