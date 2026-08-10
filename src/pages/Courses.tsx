import { Link } from "react-router-dom";
import { COURSES, TEAM_TIERS } from "../data/courses";
import { CourseCard } from "../components/CourseCard";
import { BundleCard } from "../components/BundleCard";

export function Courses() {
  const topTier = TEAM_TIERS.find((t) => t.discount !== null)?.discount ?? 15;
  const bestTier = [...TEAM_TIERS]
    .filter((t) => t.discount !== null)
    .sort((a, b) => (b.discount as number) - (a.discount as number))[0];

  return (
    <>
      <section className="bg-panel border border-line rounded-[20px] p-6 sm:p-9 mt-1">
        <div className="max-w-[720px]">
          <h1 className="text-[30px] sm:text-[36px] font-bold tracking-[-0.8px]">
            Courses
          </h1>
          <p className="text-ink2 mt-2 text-[16px]">
            Practical, credible AI training for finance, accounting and business
            professionals. Start free, then go as deep as you like.
          </p>
        </div>

        {/* Team discount is prominent here rather than buried at the bottom. */}
        <Link
          to="/team"
          className="flex flex-wrap items-center justify-between gap-4 mt-6 border border-line rounded-2xl bg-bg px-5 py-4 transition hover:border-ink"
        >
          <div>
            <div className="text-[15px] font-semibold">
              Enrolling more than one person?
            </div>
            <div className="text-ink2 text-[14px] mt-0.5">
              {topTier}% off from 3 seats, {bestTier?.discount}% off from 10,
              applied automatically at checkout.
            </div>
          </div>
          <span className="text-[14.5px] font-semibold text-accent-ink">
            See team pricing →
          </span>
        </Link>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {COURSES.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      <BundleCard />

      {/* Live workshops live on their own page; this just points there. */}
      <section className="bg-panel border border-line rounded-[22px] p-6 sm:p-8 mt-6 flex flex-wrap items-center justify-between gap-5">
        <div className="max-w-[600px]">
          <div className="text-accent-ink text-[12px] font-bold uppercase tracking-[1.5px]">
            Prefer live
          </div>
          <h3 className="text-[21px] font-bold tracking-[-0.4px] mt-1.5">
            We also run live online workshops
          </h3>
          <p className="text-ink2 mt-1.5 text-[15px] leading-relaxed">
            Short, hands-on sessions with time for your own questions. Three
            dates are open now.
          </p>
        </div>
        <Link to="/workshops" className="btn btn-white">
          See workshop dates →
        </Link>
      </section>
    </>
  );
}
