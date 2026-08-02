import { COURSES } from "../data/courses";
import { CourseCard } from "../components/CourseCard";
import { BundleCard } from "../components/BundleCard";
import { TeamPricing } from "../components/TeamPricing";

export function Courses() {
  return (
    <>
      <section className="bg-panel border border-line rounded-[20px] p-6 sm:p-9 mt-1">
        <div className="max-w-[720px]">
          <h1 className="text-[30px] sm:text-[36px] font-bold tracking-[-0.8px]">
            Courses
          </h1>
          <p className="text-ink2 mt-2 text-[16px]">
            Practical, credible AI training for tax, accounting and finance
            professionals. Start free, then go as deep as you like.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {COURSES.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      <BundleCard />
      <TeamPricing />
    </>
  );
}
