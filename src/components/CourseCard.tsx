import { Link } from "react-router-dom";
import { type Course, money } from "../data/courses";

export function CourseCard({ course }: { course: Course }) {
  const free = course.priceCents === 0;
  return (
    <Link
      to={`/course/${course.slug}`}
      className="block border border-line rounded-2xl overflow-hidden bg-white transition hover:shadow-[0_14px_30px_rgba(24,26,31,0.09)] hover:-translate-y-[3px]"
    >
      <div
        className={`h-[120px] relative bg-gradient-to-br ${course.gradient}`}
      >
        <span
          className={`absolute top-3 left-3 rounded-md text-[11px] font-bold px-2.5 py-1 bg-white/90 ${
            free ? "text-[#0a8f57]" : "text-ink"
          }`}
        >
          {free ? "FREE" : course.level.toUpperCase()}
        </span>
      </div>
      <div className="px-[18px] pt-4 pb-[18px]">
        <div className="text-cyan-ink text-[12px] font-bold uppercase tracking-wide">
          {course.tagline}
        </div>
        <h3 className="text-[17px] font-semibold mt-1.5 tracking-[-0.2px]">
          {course.title}
        </h3>
        <p className="text-ink2 text-[13.5px] mt-1.5 leading-relaxed line-clamp-2">
          {course.summary}
        </p>
        <div className="flex justify-between items-center mt-3.5 pt-3 border-t border-line text-[13px] text-ink2">
          <span>
            ◷ {course.durationLabel} · {course.lessonsLabel}
          </span>
          <span className="font-bold text-ink text-[15px]">
            {money(course.priceCents)}
          </span>
        </div>
      </div>
    </Link>
  );
}
