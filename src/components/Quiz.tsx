import { useState } from "react";
import type { QuizQuestion } from "../data/content-types";
import { PASS_MARK } from "../lib/progress";

// Options are shown in the order they were written. They are NOT shuffled:
// several questions are built so the tempting wrong answer sits next to the
// right one, and the explanations refer to "the third option". Shuffling would
// silently break that.

export function KnowledgeCheck({ question }: { question: QuizQuestion }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const right = picked === question.correctIndex;

  return (
    <div className="border border-line rounded-2xl p-5 sm:p-6 bg-panel mt-6">
      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink2">
        Knowledge check
      </p>
      <p className="mt-2 font-medium text-[15.5px]">{question.prompt}</p>

      <div className="mt-4 grid gap-2">
        {question.options.map((opt, i) => {
          const isAnswer = i === question.correctIndex;
          const chosen = picked === i;
          let cls = "border-line bg-white hover:border-ink2";
          if (answered && isAnswer) cls = "border-green-600 bg-green-50";
          else if (answered && chosen) cls = "border-red-500 bg-red-50";
          else if (answered) cls = "border-line bg-white opacity-70";
          return (
            <button
              key={i}
              onClick={() => !answered && setPicked(i)}
              disabled={answered}
              className={`text-left border rounded-xl px-4 py-3 text-[14.5px] transition-colors ${cls}`}
            >
              <span className="font-semibold mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-4 text-[14.5px]">
          <p className={right ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
            {right ? "Correct." : "Not quite."}
          </p>
          <p className="text-ink2 mt-1 leading-relaxed">{question.explanation}</p>
          <button
            onClick={() => setPicked(null)}
            className="btn btn-white mt-3 text-[13.5px]"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

export function FinalQuiz({
  questions,
  courseTitle,
  onFinish,
  bestScore,
}: {
  questions: QuizQuestion[];
  courseTitle: string;
  onFinish: (score: number, total: number) => void;
  bestScore: number | null;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = questions.length;
  const needed = Math.ceil(total * PASS_MARK);
  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce(
    (n, q, i) => n + (answers[i] === q.correctIndex ? 1 : 0),
    0,
  );
  const passed = score >= needed;

  function submit() {
    setSubmitted(true);
    onFinish(score, total);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <div className="bg-panel border border-line rounded-[20px] p-6 sm:p-9">
        <h1 className="text-[26px] sm:text-[30px] font-bold tracking-[-0.6px]">
          Final assessment
        </h1>
        <p className="text-ink2 mt-1.5 text-[15px]">
          {courseTitle} · {total} questions · {needed} correct to pass ·
          unlimited attempts
        </p>
        {bestScore !== null && !submitted && (
          <p className="text-[14px] mt-3 text-ink2">
            Your best so far: {bestScore} out of {total}.
          </p>
        )}

        {submitted && (
          <div
            className={`mt-5 rounded-xl border p-5 ${
              passed ? "border-green-600 bg-green-50" : "border-amber-500 bg-amber-50"
            }`}
          >
            <p className="text-[19px] font-bold">
              {score} out of {total}
              {passed ? " — passed" : " — not yet"}
            </p>
            <p className="text-[14.5px] mt-1.5 leading-relaxed">
              {passed
                ? "Your certificate for this subject is now unlocked. You will find it under My Courses."
                : `You need ${needed} to pass. Every question below shows the right answer and why, so read back through and take it again. There is no limit on attempts.`}
            </p>
            {!passed && (
              <button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn btn-dark mt-4 text-[14px]"
              >
                Take it again
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-4 mt-5">
        {questions.map((q, qi) => {
          const chosen = answers[qi];
          return (
            <div
              key={qi}
              className="bg-white border border-line rounded-2xl p-5 sm:p-6"
            >
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink2">
                Question {qi + 1} of {total}
              </p>
              <p className="mt-2 font-medium text-[15.5px]">{q.prompt}</p>
              <div className="mt-4 grid gap-2">
                {q.options.map((opt, oi) => {
                  const isAnswer = oi === q.correctIndex;
                  const picked = chosen === oi;
                  let cls = picked
                    ? "border-accent bg-accent/5"
                    : "border-line bg-white hover:border-ink2";
                  if (submitted && isAnswer) cls = "border-green-600 bg-green-50";
                  else if (submitted && picked) cls = "border-red-500 bg-red-50";
                  else if (submitted) cls = "border-line bg-white opacity-70";
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() =>
                        setAnswers((a) => ({ ...a, [qi]: oi }))
                      }
                      className={`text-left border rounded-xl px-4 py-3 text-[14.5px] transition-colors ${cls}`}
                    >
                      <span className="font-semibold mr-2">
                        {String.fromCharCode(65 + oi)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className="text-ink2 text-[14px] mt-3 leading-relaxed">
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={submit}
            disabled={answeredCount < total}
            className="btn btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit answers
          </button>
          <span className="text-ink2 text-[14px]">
            {answeredCount} of {total} answered
          </span>
        </div>
      )}
    </div>
  );
}
