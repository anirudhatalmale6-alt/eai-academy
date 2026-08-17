import type { QuizQuestion } from "./content-types";

// Final assessments. Ten questions, 80 per cent to pass, unlimited attempts,
// and passing is what unlocks the certificate in that subject.
//
// These are hand-written rather than generated. The module knowledge checks are
// imported from the drafts, but reusing them here would test recall of a
// question the learner has already seen and answered, which is not an
// assessment. Every question below is answerable only from the course.
//
// Questions marked "reviewed" came from the draft Angela signed off. The rest
// follow the same pattern: the wrong answers are the mistakes a competent
// person actually makes, not obvious filler, and the explanation says why the
// tempting wrong answer is wrong rather than only naming the right one.

export const FINAL_QUIZZES: Record<string, QuizQuestion[]> = {
  "microsoft-365-copilot-for-finance": [
    {
      // reviewed
      prompt:
        "You ask Copilot to accrue for services received but not invoiced. It returns a total with no working. What is the correct next step?",
      options: [
        "Post it, the total is what matters",
        "Ask it to show the calculation per supplier, then recalculate two rows yourself",
        "Post it and note in the file that Copilot prepared it",
      ],
      correctIndex: 1,
      explanation:
        "The third option is worse than the first, because it records reliance without establishing that the reliance was reasonable.",
    },
    {
      // reviewed
      prompt:
        "A client emails a spreadsheet containing individuals' salary details and asks for a summary. Your firm has Microsoft 365 Copilot. What is defensible?",
      options: [
        "Paste it into a free public chatbot, it is faster",
        "Work on it in the firm's own Microsoft 365 environment, where the file already sits under existing permissions",
        "Refuse, salary data can never be processed with AI",
      ],
      correctIndex: 1,
      explanation:
        "Refusing sounds cautious but is wrong, and a rule that strict just drives people to the first option quietly.",
    },
    {
      // reviewed
      prompt:
        "Your dashboard refreshes automatically. Which of these should NOT be automated end to end?",
      options: [
        "Recalculating debtor days each morning",
        "Releasing supplier payments when the cash measure passes a threshold",
        "Emailing the operations manager when stock cover falls below two weeks",
      ],
      correctIndex: 1,
      explanation:
        "The first and third inform a person. The second replaces one, and it is a payment.",
    },
    {
      prompt:
        "You ask Copilot to reconcile a bank export against the ledger. It returns a tidy reconciliation that balances. What do you check first?",
      options: [
        "Whether the closing balance agrees to the statement",
        "Whether matched plus unmatched equals the row count on each side",
        "Whether the formatting is consistent with your house style",
      ],
      correctIndex: 1,
      explanation:
        "A reconciliation that balances because rows were quietly dropped is worse than one that does not balance, because it looks finished. Count the rows before you read the answer.",
    },
    {
      prompt:
        "A bank export from a client uses United States date conventions. Your reconciliation still balances. What has probably happened?",
      options: [
        "Nothing, if it balances the dates were read correctly",
        "The 3rd of April has been read as the 4th of March, and totals are unaffected by that error",
        "Copilot will have flagged the mismatch automatically",
      ],
      correctIndex: 1,
      explanation:
        "Date order does not change an amount, so the totals still tie while individual transactions sit in the wrong period. Always spot check one date you recognise.",
    },
    {
      prompt:
        "You are matching transactions with a three day tolerance. Copilot matches two payments of exactly $4,400 to the same supplier. What is the right treatment?",
      options: [
        "Accept it, the amount and supplier both agree",
        "Treat it as an exception until you can explain which payment is which",
        "Widen the tolerance so the second one matches too",
      ],
      correctIndex: 1,
      explanation:
        "Regular supplier payments of identical amounts are exactly where a tolerance produces confident nonsense. Any match you cannot explain is an exception, not a match.",
    },
    {
      prompt:
        "Your firm has Microsoft 365 but nobody holds a paid Copilot seat. What can you still do?",
      options: [
        "Nothing, the course requires a paid licence",
        "Everything, by opening the file and supplying the content to the Copilot chat yourself",
        "Use a personal ChatGPT account instead, since the firm has not paid for anything",
      ],
      correctIndex: 1,
      explanation:
        "The difference between the tiers is whether you hand it the document or it is already there. The third option moves client material outside the firm, which is the one thing that is not available to you.",
    },
    {
      prompt:
        "Copilot drafts a variance commentary that reads well and attributes a movement to 'timing differences'. The number is material. What does the file need?",
      options: [
        "The commentary, since it is well written and plausible",
        "The commentary plus the underlying transactions you checked to confirm the explanation",
        "A note that the commentary was AI generated",
      ],
      correctIndex: 1,
      explanation:
        "Fluent writing is not evidence. Disclosing that AI wrote it does not make an unverified explanation defensible; checking the transactions does.",
    },
    {
      prompt:
        "Which task is Copilot most likely to get confidently wrong?",
      options: [
        "Summarising a contract you have attached",
        "Recalling the current threshold for a concession without being given the source",
        "Turning a list of transactions into a formatted table",
      ],
      correctIndex: 1,
      explanation:
        "Giving it the source is reliable and checkable. Asking it to remember produces a fluent, well structured answer with an invented figure, delivered with the same confidence as a real one.",
    },
    {
      prompt:
        "A partner asks how a Copilot assisted board pack figure was arrived at. What makes that question answerable?",
      options: [
        "The certificate showing you completed this course",
        "A record of the source, the prompt, what you checked and who signed it",
        "The Copilot conversation history, which Microsoft retains",
      ],
      correctIndex: 1,
      explanation:
        "The through line of the whole course: Copilot drafts, you verify, and the file shows who decided. A chat log shows what was asked, not what was checked or who took responsibility.",
    },
  ],
};

/** A course can only issue a certificate once its assessment is written. */
export const hasFinalQuiz = (slug: string) =>
  (FINAL_QUIZZES[slug]?.length ?? 0) >= 10;
