// Shape of the lesson content the player renders. The data itself is generated
// from the course drafts by scripts/import-drafts.py.

// Each kind gets its own treatment in the player. They come from the headings
// the drafts already use, so the structure of a lesson on screen matches the
// structure Angela reviewed on the page.
export type SectionKind =
  | "outcome" // what you will be able to do
  | "idea" // the explanation
  | "do" // the exercise
  | "check" // how to verify the result
  | "watch" // the trap
  | "takeaway" // the one line to remember
  | "prompt" // a prompt to copy
  | "redline" // one of the five limits
  | "australia" // Australian-specific framing
  | "note";

export interface LessonSection {
  kind: SectionKind;
  body: string;
  // Set when a prompt directly follows its heading in the draft, so the
  // heading renders above the prompt rather than drifting to the next block.
  label?: string;
}

export interface Lesson {
  id: string;
  number: string; // "2.1" as written in the draft
  title: string;
  sections: LessonSection[];
}

export interface QuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  blurb: string;
  // Content that belongs to the module rather than a lesson, shown once at the
  // top of the module's first lesson. Course 1's licence check lives here.
  intro: string[];
  lessons: Lesson[];
  // Not every module carries a knowledge check in the drafts yet.
  check: QuizQuestion | null;
}

export interface CourseContent {
  slug: string;
  modules: CourseModule[];
}
