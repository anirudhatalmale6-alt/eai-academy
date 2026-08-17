// Lesson progress and quiz results.
//
// Everything is written to Supabase when a learner is signed in, because a
// certificate has to be backed by a record that survives a new laptop. It also
// mirrors to localStorage so the player still works while signed out and so
// the UI can render instantly without waiting on a round trip.

import { supabase, isSupabaseConfigured } from "./supabase";

const LESSON_KEY = "eai_progress_v1";
const QUIZ_KEY = "eai_quiz_v1";

type LessonMap = Record<string, string[]>; // courseSlug -> lessonIds
type QuizMap = Record<string, { score: number; total: number; passed: boolean; at: string }>;

// A final quiz has to be answered at this level to unlock the certificate.
// Angela's decision, and it is quoted to learners, so it lives in one place.
export const PASS_MARK = 0.8;

function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private browsing or a full quota. Losing the local mirror is survivable;
    // Supabase still has the record for anyone signed in.
  }
}

export function localCompleted(slug: string): string[] {
  return readLocal<LessonMap>(LESSON_KEY, {})[slug] ?? [];
}

export function localQuiz(slug: string) {
  return readLocal<QuizMap>(QUIZ_KEY, {})[slug] ?? null;
}

/** Mark a lesson done. Safe to call repeatedly. */
export async function completeLesson(slug: string, lessonId: string) {
  const all = readLocal<LessonMap>(LESSON_KEY, {});
  const list = new Set(all[slug] ?? []);
  list.add(lessonId);
  all[slug] = [...list];
  writeLocal(LESSON_KEY, all);

  if (!isSupabaseConfigured || !supabase) return;
  const { data } = await supabase.auth.getUser();
  const userId = data?.user?.id;
  if (!userId) return;

  // onConflict so a second visit to a finished lesson does not error or move
  // the original completion date.
  await supabase
    .from("lesson_progress")
    .upsert(
      { user_id: userId, course_slug: slug, lesson_id: lessonId },
      { onConflict: "user_id,course_slug,lesson_id", ignoreDuplicates: true },
    );
}

/** Everything this learner has finished in a course, server first. */
export async function loadProgress(slug: string): Promise<string[]> {
  const local = localCompleted(slug);
  if (!isSupabaseConfigured || !supabase) return local;

  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) return local;

  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("course_slug", slug);
  if (error || !data) return local;

  // Union rather than replace: a learner may have worked through a lesson
  // before signing in, and losing that on login reads as the site forgetting.
  const merged = [...new Set([...local, ...data.map((r) => r.lesson_id as string)])];
  const all = readLocal<LessonMap>(LESSON_KEY, {});
  all[slug] = merged;
  writeLocal(LESSON_KEY, all);
  return merged;
}

export interface QuizResult {
  score: number;
  total: number;
  passed: boolean;
  at: string;
}

/** Record a final quiz attempt. Every attempt is kept, not just the best. */
export async function recordQuizAttempt(
  slug: string,
  score: number,
  total: number,
): Promise<QuizResult> {
  const passed = total > 0 && score / total >= PASS_MARK;
  const result: QuizResult = { score, total, passed, at: new Date().toISOString() };

  const all = readLocal<QuizMap>(QUIZ_KEY, {});
  const prev = all[slug];
  // Keep the best attempt locally: unlimited attempts are allowed, so a later
  // worse run must not take a certificate back off someone.
  if (!prev || score > prev.score) all[slug] = result;
  writeLocal(QUIZ_KEY, all);

  if (isSupabaseConfigured && supabase) {
    const { data: auth } = await supabase.auth.getUser();
    if (auth?.user) {
      await supabase.from("quiz_attempts").insert({
        user_id: auth.user.id,
        course_slug: slug,
        score,
        total,
        passed,
      });
    }
  }
  return result;
}

/** Has this learner passed the final quiz for a course? */
export async function loadBestAttempt(slug: string): Promise<QuizResult | null> {
  const local = localQuiz(slug);
  if (!isSupabaseConfigured || !supabase) return local;

  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) return local;

  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("score, total, passed, created_at")
    .eq("course_slug", slug)
    .order("score", { ascending: false })
    .limit(1);
  if (error || !data?.length) return local;

  const row = data[0];
  const server: QuizResult = {
    score: row.score,
    total: row.total,
    passed: row.passed,
    at: row.created_at,
  };
  return !local || server.score >= local.score ? server : local;
}
