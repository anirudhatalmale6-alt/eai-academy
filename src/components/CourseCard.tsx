import { Link } from "react-router-dom";
import { type Course, money, hoursLabel, priceLabel } from "../data/courses";

export function CourseCard({ course }: { course: Course }) {
  const free = course.priceCents === 0;
  const onOffer =
    !free &&
    !!course.compareAtCents &&
    course.compareAtCents > course.priceCents;
  return (
    <Link
      to={`/course/${course.slug}`}
      className="block border border-line rounded-2xl overflow-hidden bg-white transition hover:shadow-[0_14px_30px_rgba(24,26,31,0.09)] hover:-translate-y-[3px]"
    >
      <div
        className="h-[120px] relative"
        style={{ backgroundColor: course.color }}
      >
        <span
          className="absolute top-3 left-3 rounded-md text-[11px] font-bold px-2.5 py-1 bg-white/95"
          style={{ color: course.color }}
        >
          {free ? "FREE" : course.level.toUpperCase()}
        </span>
        {onOffer && (
          <span
            className="absolute top-3 right-3 rounded-md text-[10px] font-bold px-2 py-1 bg-white/95 tracking-wide"
            style={{ color: course.color }}
          >
            LAUNCH OFFER
          </span>
        )}
      </div>
      <div className="px-[18px] pt-4 pb-[18px]">
        <div
          className="text-[12px] font-bold uppercase tracking-wide"
          style={{ color: course.color }}
        >
          {course.tagline}
        </div>
        <h3 className="text-[17px] font-semibold mt-1.5 tracking-[-0.2px]">
          {course.title}
        </h3>
        <p className="text-ink2 text-[13.5px] mt-1.5 leading-relaxed line-clamp-2">
          {course.summary}
        </p>
        <div className="mt-3.5 pt-3 border-t border-line text-[13px] text-ink2">
          <div>
            ◷ {hoursLabel(course.learningHours)} · {course.lessonsLabel}
          </div>
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="font-bold text-ink text-[15px] whitespace-nowrap">
              {priceLabel(course.priceCents)}
            </span>
            {onOffer && (
              <span className="text-ink2 text-[12.5px] line-through">
                {money(course.compareAtCents!)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
