import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getCourse,
  money,
  hoursLabel,
  priceLabel,
  incGstLabel,
} from "../data/courses";
import { EnrollModal } from "../components/EnrollModal";
import { startCheckout } from "../lib/checkout";

export function CourseDetail() {
  const { slug = "" } = useParams();
  const course = getCourse(slug);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [buying, setBuying] = useState(false);
  const [buyMsg, setBuyMsg] = useState<string | null>(null);

  async function buy(courseSlug: string) {
    setBuyMsg(null);
    setBuying(true);
    const err = await startCheckout({ type: "course", slug: courseSlug });
    if (err) setBuyMsg(err);
    setBuying(false);
  }

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
  const onOffer =
    !free &&
    !!course.compareAtCents &&
    course.compareAtCents > course.priceCents;

  return (
    <div className="mt-1">
      {/* Hero */}
      <section
        className="rounded-[20px] p-8 sm:p-11 text-white"
        style={{ backgroundColor: course.color }}
      >
        <Link to="/courses" className="text-white/85 text-sm hover:text-white">
          ← All courses
        </Link>
        <div className="text-white/85 text-[12px] font-bold uppercase tracking-wide mt-5">
          {course.level} · {hoursLabel(course.learningHours)}
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
                  <span className="font-bold" style={{ color: course.color }}>
                    ✓
                  </span>
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
            <div className="flex items-baseline gap-2.5">
              <span className="text-[30px] font-bold">
                {priceLabel(course.priceCents)}
              </span>
              {onOffer ? (
                <span className="text-ink2 text-[16px] line-through">
                  {money(course.compareAtCents!)}
                </span>
              ) : (
                !free && <span className="text-ink2 text-sm">one-time</span>
              )}
            </div>
            {!free && (
              <div className="text-ink2 text-[13px] mt-1">
                {incGstLabel(course.priceCents)}
              </div>
            )}
            {onOffer && (
              <div
                className="inline-block mt-2 text-[12px] font-bold rounded-full px-2.5 py-1 text-white"
                style={{ backgroundColor: course.color }}
              >
                Launch price · save {money(course.compareAtCents! - course.priceCents)}
              </div>
            )}
            <button
              onClick={() => (free ? setEnrollOpen(true) : buy(course.slug))}
              disabled={buying}
              className={`btn w-full justify-center mt-4 disabled:opacity-60 ${
                free ? "btn-accent" : "btn-dark"
              }`}
            >
              {free
                ? "Get free access →"
                : buying
                  ? "Starting checkout…"
                  : "Enrol now →"}
            </button>
            <Link
              to={`/course/${course.slug}/learn`}
              className="btn btn-white w-full justify-center mt-2"
            >
              Preview the lessons →
            </Link>
            {!free && !buyMsg && (
              <p className="text-ink2 text-[12.5px] mt-3 text-center">
                Secure checkout via Stripe. Lifetime access.
              </p>
            )}
            {buyMsg && (
              <p className="text-ink2 text-[12.5px] mt-3 text-center">{buyMsg}</p>
            )}
            <ul className="mt-5 space-y-2 text-[13.5px] text-ink2">
              <li>◷ {hoursLabel(course.learningHours)}</li>
              <li>▤ {course.lessonsLabel}</li>
              <li>✦ Certificate in this subject, shareable on LinkedIn</li>
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
