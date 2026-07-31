import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourse, money } from "../data/courses";
import { EnrollModal } from "../components/EnrollModal";

export function CourseDetail() {
  const { slug = "" } = useParams();
  const course = getCourse(slug);
  const [enrollOpen, setEnrollOpen] = useState(false);

  if (!course) {
    return (
      <div className="bg-panel border border-line rounded-[20px] p-10 text-center mt-1">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link to="/courses" className="btn btn-dark mt-6">
          Back to courses
        </Link>
      </div>
    );
  }

  const free = course.priceCents === 0;

  return (
    <div className="mt-1">
      {/* Hero */}
      <section
        className={`rounded-[20px] p-8 sm:p-11 text-white bg-gradient-to-br ${course.gradient}`}
      >
        <Link to="/courses" className="text-white/85 text-sm hover:text-white">
          ← All courses
        </Link>
        <div className="text-white/85 text-[12px] font-bold uppercase tracking-wide mt-5">
          {course.level} · {course.durationLabel}
        </div>
        <h1 className="text-[34px] sm:text-[44px] font-bold tracking-[-1px] leading-[1.05] mt-2 max-w-[760px]">
          {course.title}
        </h1>
        <p className="text-white/90 mt-4 text-[17px] max-w-[620px]">
          {course.summary}
        </p>
      </section>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-6">
        {/* Main */}
        <div className="space-y-6">
          <section className="bg-panel border border-line rounded-[20px] p-6 sm:p-8">
            <h2 className="text-[22px] font-bold">What you'll learn</h2>
            <ul className="mt-4 space-y-3">
              {course.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-[15px]">
                  <span className="text-accent-ink font-bold">✓</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-panel border border-line rounded-[20px] p-6 sm:p-8">
            <h2 className="text-[22px] font-bold">Course content</h2>
            <p className="text-ink2 text-sm mt-1">{course.lessonsLabel}</p>
            <ol className="mt-4 divide-y divide-line">
              {course.lessons.map((l, i) => (
                <li
                  key={l.title}
                  className="flex items-center justify-between py-3.5"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="text-ink2 text-sm w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px]">{l.title}</span>
                  </span>
                  <span className="text-ink2 text-[13px]">
                    {l.durationLabel}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Sticky enroll card */}
        <aside className="lg:sticky lg:top-4 h-fit">
          <div className="bg-panel border border-line rounded-[20px] p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-[30px] font-bold">
                {money(course.priceCents)}
              </span>
              {!free && (
                <span className="text-ink2 text-sm">one-time</span>
              )}
            </div>
            <button
              onClick={() => free && setEnrollOpen(true)}
              className={`btn w-full justify-center mt-4 ${
                free ? "btn-gradient" : "btn-dark"
              }`}
            >
              {free ? "Get free access →" : "Enrol (coming soon)"}
            </button>
            {!free && (
              <p className="text-ink2 text-[12.5px] mt-3 text-center">
                Secure checkout via Stripe. Lifetime access.
              </p>
            )}
            <ul className="mt-5 space-y-2 text-[13.5px] text-ink2">
              <li>◷ {course.durationLabel}</li>
              <li>▤ {course.lessonsLabel}</li>
              <li>✦ Certificate of completion</li>
              <li>◎ Backed by an OpenAI Select Partner</li>
            </ul>
          </div>
        </aside>
      </div>

      <EnrollModal
        open={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        courseTitle={course.title}
        courseSlug={course.slug}
      />
    </div>
  );
}
