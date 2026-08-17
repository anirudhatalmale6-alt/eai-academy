import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCourse } from "../data/courses";
import { COURSE_CONTENT } from "../data/course-content.generated";
import type { Lesson, SectionKind } from "../data/content-types";
import { certificateRule, FINAL_QUIZZES, hasFinalQuiz } from "../data/final-quizzes";
import { FinalQuiz, KnowledgeCheck } from "../components/Quiz";
import {
  completeLesson,
  loadBestAttempt,
  loadProgress,
  recordQuizAttempt,
} from "../lib/progress";
import { FREE_PREVIEW_MODULES, useAccess } from "../lib/entitlement";
import { money } from "../data/courses";

// How each section of a lesson is introduced. The drafts use these headings,
// so a learner sees the same shape Angela reviewed.
const SECTION_LABEL: Partial<Record<SectionKind, string>> = {
  outcome: "What you will be able to do",
  idea: "The idea",
  do: "Do this",
  check: "Check this",
  watch: "Watch out",
  takeaway: "Takeaway",
};

function Section({
  kind,
  body,
  label,
}: {
  kind: SectionKind;
  body: string;
  label?: string;
}) {
  if (kind === "prompt") {
    return (
      <div className="my-4">
        {label && (
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink2 mb-1.5">
            {label}
          </p>
        )}
        <pre className="bg-ink text-[#e2e8f0] rounded-xl p-4 text-[13.5px] leading-[1.55] whitespace-pre-wrap font-mono overflow-x-auto">
          {body}
        </pre>
      </div>
    );
  }
  if (kind === "redline") {
    return (
      <div className="border border-red-200 bg-red-50 border-l-4 border-l-red-600 rounded-xl px-4 py-3 my-4 text-[14.5px] text-red-900 leading-relaxed">
        {body}
      </div>
    );
  }
  if (kind === "australia") {
    return (
      <div className="border border-blue-200 bg-blue-50 border-l-4 border-l-accent rounded-xl px-4 py-3 my-4 text-[14.5px] text-blue-900 leading-relaxed">
        {body}
      </div>
    );
  }

  const heading = label ?? SECTION_LABEL[kind];
  return (
    <div className="my-4">
      {heading && (
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink2 mb-1.5">
          {heading}
        </p>
      )}
      {body.split("\n\n").map((para, i) => (
        <p key={i} className="text-[15.5px] leading-[1.7] mb-2.5">
          {para}
        </p>
      ))}
    </div>
  );
}

export function Learn() {
  const { slug = "", lessonId } = useParams();
  const navigate = useNavigate();
  const course = getCourse(slug);
  const content = COURSE_CONTENT.find((c) => c.slug === slug);

  const access = useAccess(slug, course?.priceCents ?? 0);
  const [done, setDone] = useState<string[]>([]);
  const [best, setBest] = useState<{ score: number; total: number; passed: boolean } | null>(
    null,
  );

  // Flatten once so next/previous and the counter do not have to walk modules.
  const flat = useMemo(() => {
    const out: { lesson: Lesson; moduleIndex: number; isLastOfModule: boolean }[] = [];
    content?.modules.forEach((m, mi) =>
      m.lessons.forEach((l, li) =>
        out.push({ lesson: l, moduleIndex: mi, isLastOfModule: li === m.lessons.length - 1 }),
      ),
    );
    return out;
  }, [content]);

  useEffect(() => {
    if (!slug) return;
    loadProgress(slug).then(setDone);
    loadBestAttempt(slug).then(setBest);
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [lessonId]);

  if (!course || !content) {
    return (
      <div className="bg-panel border border-line rounded-[20px] p-10 mt-1">
        <h1 className="text-[26px] font-bold">Course not found</h1>
        <Link to="/courses" className="btn btn-accent mt-5">
          Browse courses →
        </Link>
      </div>
    );
  }

  const isQuiz = lessonId === "final";
  const index = flat.findIndex((f) => f.lesson.id === lessonId);
  const current = index >= 0 ? flat[index] : flat[0];
  const total = flat.length;
  // Count only lessons that still exist. Stored progress can outlive the
  // content when a draft is re-imported and lessons are renumbered, and a
  // stale id must not inflate the count or unlock the assessment early.
  const liveIds = useMemo(() => new Set(flat.map((f) => f.lesson.id)), [flat]);
  const completedCount = done.filter((id) => liveIds.has(id)).length;
  const allLessonsDone = total > 0 && completedCount >= total;

  async function markDoneAndAdvance() {
    await completeLesson(slug, current.lesson.id);
    setDone((d) => (d.includes(current.lesson.id) ? d : [...d, current.lesson.id]));
    const next = flat[index >= 0 ? index + 1 : 1];
    navigate(next ? `/course/${slug}/learn/${next.lesson.id}` : `/course/${slug}/learn/final`);
  }

  const quizQuestions = FINAL_QUIZZES[slug] ?? [];

  // In preview, only the first module is readable. Everything else, including
  // the assessment, needs the course to have been bought.
  const locked = (moduleIndex: number) =>
    access === "preview" && moduleIndex >= FREE_PREVIEW_MODULES;
  const currentLocked = locked(current.moduleIndex);

  return (
    <div className="mt-1 grid lg:grid-cols-[290px_1fr] gap-6">
      {/* Contents */}
      <aside className="bg-panel border border-line rounded-[20px] p-5 h-fit lg:sticky lg:top-4">
        <Link to={`/course/${slug}`} className="text-[13.5px] text-ink2 hover:text-ink">
          ← {course.title}
        </Link>
        <div className="mt-4">
          <div className="h-[6px] bg-line rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${total ? (completedCount / total) * 100 : 0}%`,
                backgroundColor: course.color,
              }}
            />
          </div>
          <p className="text-[13px] text-ink2 mt-2">
            {completedCount} of {total} lessons
          </p>
        </div>

        <nav className="mt-5 grid gap-4">
          {content.modules.map((m, mi) => (
            <div key={m.id}>
              <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink2">
                {m.number}. {m.title}
                {locked(mi) && <span className="ml-1.5 opacity-60">🔒</span>}
              </p>
              <div className="grid gap-0.5 mt-1.5">
                {m.lessons.map((l) => {
                  const active = l.id === current?.lesson.id && !isQuiz;
                  const finished = done.includes(l.id);
                  return (
                    <Link
                      key={l.id}
                      to={`/course/${slug}/learn/${l.id}`}
                      className={`text-[13.5px] rounded-lg px-2.5 py-1.5 leading-snug ${
                        active ? "bg-ink text-white" : "hover:bg-bg text-ink2"
                      }`}
                    >
                      <span className="opacity-60 mr-1.5">{finished ? "✓" : "○"}</span>
                      {l.number} {l.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {hasFinalQuiz(slug) && (
            <Link
              to={`/course/${slug}/learn/final`}
              className={`text-[13.5px] rounded-lg px-2.5 py-2 font-semibold ${
                isQuiz ? "bg-ink text-white" : "hover:bg-bg"
              }`}
            >
              {best?.passed ? "✓ " : "◇ "}Final assessment
            </Link>
          )}
        </nav>
      </aside>

      {/* Lesson or quiz */}
      <main>
        {isQuiz ? (
          access === "preview" ? (
            // The assessment is what issues the certificate, so it is never
            // available on a preview.
            <div className="bg-panel border border-line rounded-[20px] p-9">
              <h1 className="text-[26px] font-bold">Part of the course</h1>
              <p className="text-ink2 mt-2 max-w-[540px] leading-relaxed">
                The final assessment and the certificate come with the course.
                Module 1 is open to read first.
              </p>
              <Link to={`/course/${slug}`} className="btn btn-accent mt-5">
                Enrol for {money(course.priceCents)} + GST →
              </Link>
            </div>
          ) : certificateRule(course.priceCents) === "completion" ? (
            // The free course is not examined. Finishing it is the bar, and the
            // certificate says "Foundation course" rather than claiming an
            // assessment that never happened.
            <div className="bg-panel border border-line rounded-[20px] p-9">
              <h1 className="text-[26px] font-bold">
                {allLessonsDone ? "Course complete" : "Keep going"}
              </h1>
              <p className="text-ink2 mt-2 max-w-[540px] leading-relaxed">
                {allLessonsDone
                  ? "This course is not assessed by examination, so finishing the lessons is the bar. Your certificate is in My Courses."
                  : `You have finished ${completedCount} of ${total} lessons. This course is not examined, so completing them is all that is needed.`}
              </p>
              <Link to="/my-courses" className="btn btn-accent mt-5">
                {allLessonsDone ? "Get your certificate →" : "See your progress →"}
              </Link>
            </div>
          ) : !hasFinalQuiz(slug) ? (
            <div className="bg-panel border border-line rounded-[20px] p-9">
              <h1 className="text-[26px] font-bold">Assessment in preparation</h1>
              <p className="text-ink2 mt-2 max-w-[540px] leading-relaxed">
                The lessons for this course are complete. Its final assessment is
                still being written, and we would rather tell you that than hand
                out a certificate for a three question test.
              </p>
            </div>
          ) : !allLessonsDone ? (
            <div className="bg-panel border border-line rounded-[20px] p-9">
              <h1 className="text-[26px] font-bold">Finish the lessons first</h1>
              <p className="text-ink2 mt-2 max-w-[540px] leading-relaxed">
                You have completed {completedCount} of {total}. The assessment
                covers the whole course, so it opens once you have worked
                through it.
              </p>
              <Link
                to={`/course/${slug}/learn/${flat.find((f) => !done.includes(f.lesson.id))?.lesson.id ?? flat[0].lesson.id}`}
                className="btn btn-accent mt-5"
              >
                Continue where you left off →
              </Link>
            </div>
          ) : (
            <FinalQuiz
              questions={quizQuestions}
              courseTitle={course.title}
              bestScore={best?.score ?? null}
              onFinish={async (score, tot) => {
                const r = await recordQuizAttempt(slug, score, tot);
                setBest(r);
              }}
            />
          )
        ) : (
          <>
            {currentLocked ? (
              <div className="bg-panel border border-line rounded-[20px] p-6 sm:p-9">
                <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-ink2">
                  Module {content.modules[current.moduleIndex].number} ·{" "}
                  {content.modules[current.moduleIndex].title}
                </p>
                <h1 className="text-[26px] sm:text-[31px] font-bold tracking-[-0.7px] mt-2 leading-[1.2]">
                  {current.lesson.number} {current.lesson.title}
                </h1>
                <p className="text-ink2 mt-5 max-w-[540px] leading-relaxed">
                  Module 1 is open so you can see how the course is written and
                  judge whether it is for you. The remaining{" "}
                  {content.modules.length - FREE_PREVIEW_MODULES} modules are
                  part of the course.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <Link to={`/course/${slug}`} className="btn btn-accent">
                    Enrol for {money(course.priceCents)} + GST →
                  </Link>
                  <Link
                    to={`/course/${slug}/learn/${flat[0].lesson.id}`}
                    className="btn btn-white"
                  >
                    Back to module 1
                  </Link>
                </div>
                <p className="text-ink2 text-[13px] mt-5">
                  Already bought it? Sign in and it will unlock.
                </p>
              </div>
            ) : (
            <article className="bg-white border border-line rounded-[20px] p-6 sm:p-9">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-ink2">
                Module {content.modules[current.moduleIndex].number} ·{" "}
                {content.modules[current.moduleIndex].title}
              </p>
              <h1 className="text-[26px] sm:text-[31px] font-bold tracking-[-0.7px] mt-2 leading-[1.2]">
                {current.lesson.number} {current.lesson.title}
              </h1>

              {/* Module-level material, shown once on the module's first
                  lesson. Lesson 1.1 of Course 1 refers to this panel directly,
                  so it has to appear before the lesson body, not after. */}
              {current.lesson.id.endsWith("-l1") &&
                content.modules[current.moduleIndex].intro.map((body, i) => (
                  <div
                    key={i}
                    className="border border-line bg-panel border-l-4 rounded-xl px-5 py-4 mt-5 text-[14.5px] leading-relaxed whitespace-pre-line"
                    style={{ borderLeftColor: course.color }}
                  >
                    {body}
                  </div>
                ))}

              <div className="mt-5">
                {current.lesson.sections.map((s, i) => (
                  <Section key={i} kind={s.kind} body={s.body} label={s.label} />
                ))}
              </div>
            </article>

            )}

            {!currentLocked &&
              current.isLastOfModule &&
              content.modules[current.moduleIndex].check && (
                <KnowledgeCheck
                  question={content.modules[current.moduleIndex].check!}
                />
              )}

            {!currentLocked && (
            <div className="flex flex-wrap items-center gap-3 mt-6">
              {index > 0 && (
                <Link
                  to={`/course/${slug}/learn/${flat[index - 1].lesson.id}`}
                  className="btn btn-white"
                >
                  ← Previous
                </Link>
              )}
              <button onClick={markDoneAndAdvance} className="btn btn-accent">
                {done.includes(current.lesson.id)
                  ? index === total - 1
                    ? "Finish course →"
                    : "Next lesson →"
                  : index === total - 1
                    ? "Mark complete and finish →"
                    : "Mark complete and continue →"}
              </button>
            </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
