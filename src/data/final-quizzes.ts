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

  "prompting-for-auditable-answers": [
    {
      // reviewed
      prompt:
        "A colleague sends you a research note drafted with AI, citing three ATO rulings. What do you do first?",
      options: [
        "Check the reasoning is sound",
        "Open all three rulings and confirm they exist and say what is claimed",
        "Rewrite it in the firm's voice",
      ],
      correctIndex: 1,
      explanation:
        "Sound reasoning built on a citation that does not exist is still worthless, and it is the failure most likely to reach a client.",
    },
    {
      prompt:
        "You run the same prompt twice and get two materially different answers. What has that told you?",
      options: [
        "Nothing useful, models are non-deterministic",
        "You have found the part of the question where the answer is least reliable",
        "The second answer is the better one, since it had more context",
      ],
      correctIndex: 1,
      explanation:
        "Where the answers disagree with each other is where they might disagree with the truth. Disagreement is a free diagnostic, not noise to be ignored.",
    },
    {
      prompt:
        "Which part is missing from this prompt: 'You are a tax adviser. Using the attached ruling, explain whether the deduction is available.'",
      options: [
        "The role",
        "The shape of the output and the limit on what it may do",
        "The source",
      ],
      correctIndex: 1,
      explanation:
        "Role, source, task, shape, limit. The shape and the limit are missing here, and whatever you leave out gets filled in by the model rather than by you.",
    },
    {
      prompt:
        "You need to understand a 90 page agreement. What produces the more defensible result?",
      options: [
        "Ask for a summary, then read the summary carefully",
        "Ask narrow questions and require the clause to be quoted with each answer",
        "Ask for a summary, then ask it to check its own summary",
      ],
      correctIndex: 1,
      explanation:
        "A summary is the one output you cannot audit without redoing the work. Narrow questions with quoted sources can be checked in seconds.",
    },
    {
      prompt:
        "You are comparing a new contract against last year's version. What does asking 'what changed' miss?",
      options: [
        "Changes to defined terms",
        "Clauses that were removed entirely",
        "Changes to the payment schedule",
      ],
      correctIndex: 1,
      explanation:
        "Deletions rarely show up in a change list because nothing is there to describe. Always ask separately what disappeared.",
    },
    {
      prompt:
        "You are extracting a date field from 200 documents. What most reduces the error rate?",
      options: [
        "Asking for high accuracy in the prompt",
        "Defining precisely which date you mean, in the document's own terms",
        "Running the extraction twice and comparing",
      ],
      correctIndex: 1,
      explanation:
        "Define the field precisely or the model defines it for you, and it will silently pick the execution date on some and the effective date on others.",
    },
    {
      prompt:
        "Your extraction returns a tidy table with no blanks and no flags across 200 documents. What is the most likely explanation?",
      options: [
        "The documents were unusually consistent",
        "The output was designed so that failures look the same as successes",
        "The model performed well",
      ],
      correctIndex: 1,
      explanation:
        "Real batches have ragged edges. An output with no visible uncertainty usually means uncertainty had nowhere to appear, so design the output to tell you where to look.",
    },
    {
      prompt:
        "A draft you asked for comes back full of 'may', 'could potentially' and 'in some circumstances'. What is the problem?",
      options: [
        "The tone is too informal for client work",
        "Hedging is standing in for a decision that has not been made",
        "It needs more supporting citations",
      ],
      correctIndex: 1,
      explanation:
        "Hedging is not caution, it is the absence of a decision. The client still has to be told what you think.",
    },
    {
      prompt:
        "You want AI to write in your firm's voice. What works best?",
      options: [
        "Describe the voice carefully: professional, warm, plain English",
        "Give it three pieces of your own writing and tell it to match them",
        "Ask it to avoid corporate jargon",
      ],
      correctIndex: 1,
      explanation:
        "Show it your writing, do not describe your writing. Every firm describes its voice the same way and the description produces a generic result.",
    },
    {
      prompt:
        "You have finished a piece of analysis. What is the highest value way to use AI on it now?",
      options: [
        "Ask it to make the writing clearer",
        "Ask it to argue against your conclusion and find the weakest link",
        "Ask it to check the spelling and formatting",
      ],
      correctIndex: 1,
      explanation:
        "Have it attack your work before your client, your partner or the board does. Using it to review is often more valuable than using it to produce.",
    },
  ],

  "automating-finance-workflows": [
    {
      // reviewed
      prompt:
        "Your invoice agent has run for a month with a 100 per cent approval rate. What does that tell you?",
      options: [
        "It is working perfectly",
        "The approval step may not be functioning as a control, and should be investigated",
        "The threshold is set too low",
      ],
      correctIndex: 1,
      explanation:
        "It might be perfect. But an approval that never rejects anything is indistinguishable from no approval, and you cannot tell which you have without looking.",
    },
    {
      prompt:
        "A task runs the same way every time with no judgement involved. What should you build?",
      options: [
        "An agent, so it can handle variations later",
        "A plain automation, with no reasoning step at all",
        "A prompt the team runs manually",
      ],
      correctIndex: 1,
      explanation:
        "Use the least clever tool that does the job. Cleverness is unpredictability, and you do not want unpredictability in a task that never varies.",
    },
    {
      prompt:
        "Which process is the best first candidate for automation?",
      options: [
        "Low volume, high value, complex judgement",
        "High volume, clear rules, low consequence if wrong",
        "The process the team complains about most",
      ],
      correctIndex: 1,
      explanation:
        "Start where the volume is high and the consequences are low. You earn trust before you spend it.",
    },
    {
      prompt:
        "You are mapping a process before automating it. Whose version do you map?",
      options: [
        "The documented procedure, since that is the approved method",
        "What actually happens, including the workarounds nobody wrote down",
        "The partner's description of how it should work",
      ],
      correctIndex: 1,
      explanation:
        "Map what happens, not what is supposed to happen. Automating the documented version produces an agent that breaks on the first real case.",
    },
    {
      prompt:
        "Where should the human approval sit in an automated payment run?",
      options: [
        "At the end, just before the file is sent to the bank",
        "At the point where the decision is actually made",
        "At the start, approving the batch before processing",
      ],
      correctIndex: 1,
      explanation:
        "Put the approval where the decision is, not where the process ends. An approval at the end reviews an outcome nobody can now change.",
    },
    {
      prompt:
        "You are about to test a new agent. What do you test first?",
      options: [
        "The straightforward cases, to confirm the happy path works",
        "The messiest real cases you can find",
        "A synthetic dataset covering every field",
      ],
      correctIndex: 1,
      explanation:
        "Mess first. The happy path always works. What you need to know is whether it stops or guesses when the input is bad, and a confident wrong answer is worse than a stop.",
    },
    {
      prompt:
        "Which instruction is missing from this agent brief: 'Extract supplier, date and amount. Never approve a payment. Record what you extracted.'",
      options: [
        "What it must always do",
        "When it must stop and ask a human",
        "Where to write the output",
      ],
      correctIndex: 1,
      explanation:
        "Brief it like a new starter: always, never, stop and ask, record. Without the stop condition it will make its best guess rather than raise its hand.",
    },
    {
      prompt:
        "An exception queue has grown to 400 items over three months. What went wrong at design time?",
      options: [
        "The agent's accuracy was too low",
        "The exceptions were never given a name and an owner",
        "The volume was higher than forecast",
      ],
      correctIndex: 1,
      explanation:
        "Every exception needs a name and an owner or it becomes a backlog. An unowned queue is where the work you automated quietly reappears.",
    },
    {
      prompt:
        "Your team has muted the agent's alerts. What is the most likely cause?",
      options: [
        "There are too many alerts",
        "The alerts do not name an action the recipient can take",
        "The alerts arrive outside working hours",
      ],
      correctIndex: 1,
      explanation:
        "If you cannot name the action, do not send the alert. Volume is usually a symptom; an alert that tells someone what to do rarely gets muted.",
    },
    {
      prompt:
        "You built the firm's invoice agent and you are going on leave for a month. What matters most before you go?",
      options: [
        "Documenting how it was built",
        "Making sure someone else can stop it and knows when to",
        "Handing over the login credentials",
      ],
      correctIndex: 1,
      explanation:
        "An agent nobody but you can turn off is a risk, not an asset. The stop is more urgent than the documentation.",
    },
  ],

  "ai-governance-risk-compliance": [
    {
      // reviewed
      prompt:
        "A regulator asks how your firm governs its use of AI. Which is the strongest response?",
      options: [
        "We do not use AI for anything client related",
        "We take it very seriously and follow best practice",
        "Here is our policy, our approved-use matrix, our assessments for three use cases, and the board minute noting them",
      ],
      correctIndex: 2,
      explanation:
        "The first is rarely true and is easily disproved by asking a junior. The second is a non-answer. The third is a file.",
    },
    {
      prompt:
        "A partner says the firm will wait for AI legislation before setting a policy. What is wrong with that?",
      options: [
        "Legislation is expected within the year, so the wait is short",
        "The obligations that apply have already arrived, under the codes and the Privacy Act",
        "Competitors are moving faster",
      ],
      correctIndex: 1,
      explanation:
        "Nothing is waiting for AI law. Confidentiality, competence and privacy duties already apply in full, and Australia's stated position is that existing law covers it.",
    },
    {
      prompt:
        "What should you do before approving any AI tool?",
      options: [
        "Assess the vendor's security posture",
        "Classify the data the tool would touch",
        "Run a trial with a small group",
      ],
      correctIndex: 1,
      explanation:
        "Classify the data first. Every tool decision follows from what the tool would be allowed to see, and a vendor assessment cannot tell you that.",
    },
    {
      prompt:
        "Your firm's AI risk assessment runs to eleven pages. What is the likely outcome?",
      options: [
        "Thorough governance that stands up to scrutiny",
        "It gets skipped, which is worse than not having one",
        "Slower adoption, which is the intended effect",
      ],
      correctIndex: 1,
      explanation:
        "Governance people skip is worse than none, because it creates a record of a control that was never applied. Keep it to one page and twenty minutes.",
    },
    {
      prompt:
        "What belongs in a board paper about AI?",
      options: [
        "An explanation of how large language models work",
        "The firm's position, its exposure, and the decision being asked for",
        "A survey of what competitors are doing",
      ],
      correctIndex: 1,
      explanation:
        "Position, exposure, decision. Never an explainer. A board paper that teaches the technology has not asked the board for anything.",
    },
    {
      prompt:
        "A junior pasted client information into a public chatbot last week. What is the first hour about?",
      options: [
        "Establishing who is at fault",
        "Establishing what was disclosed, to what, and whether it is still exposed",
        "Drafting the notification to the client",
      ],
      correctIndex: 1,
      explanation:
        "Scope before blame and before communication. You cannot tell a client anything useful, or decide whether it is notifiable, until you know what actually left.",
    },
    {
      prompt:
        "You have to tell a client something went wrong. What order works?",
      options: [
        "Explain the context, then what happened, then the remedy",
        "What happened, specifically, and what you have already done about it",
        "Apologise first, then investigate and follow up with detail",
      ],
      correctIndex: 1,
      explanation:
        "Fast, specific and already fixed, in that order. Context first reads as preparing an excuse, and a bare apology leaves them with nothing to act on.",
    },
    {
      prompt:
        "Your AI policy is one page and lists only prohibitions. What happens next?",
      options: [
        "Usage falls, which is the safe outcome",
        "The same work continues where you cannot see it",
        "Staff ask permission before each new use",
      ],
      correctIndex: 1,
      explanation:
        "A policy that only says no gets ignored quietly and drives usage underground, which is the outcome you were trying to prevent. Say yes to something.",
    },
    {
      prompt:
        "A vendor tells you your data is never used for training. What makes that assurance meaningful?",
      options: [
        "It appears on their website and in their marketing",
        "It appears in the contract you have signed, with the data location stated",
        "Their support team confirmed it by email",
      ],
      correctIndex: 1,
      explanation:
        "A statement you cannot enforce is not a control. It also has to say where the data goes, because overseas disclosure is a separate obligation under the Privacy Act.",
    },
    {
      prompt:
        "What does an auditor actually want to see about a decision your firm made on AI?",
      options: [
        "That the decision was correct in hindsight",
        "The artefacts showing how it was decided, dated and reviewed",
        "That a senior person approved it",
      ],
      correctIndex: 1,
      explanation:
        "Six artefacts, dated and reviewed. That is what governed looks like. Nobody is graded on hindsight, they are graded on whether the process existed at the time.",
    },
  ],
};

/** A course can only issue a certificate once its assessment is written. */
export const hasFinalQuiz = (slug: string) =>
  (FINAL_QUIZZES[slug]?.length ?? 0) >= 10;

// How a certificate is earned, per course.
//
// The free course has no examination on purpose. Its certificate already says
// "Foundation course" where a paid one says "Assessed by examination", so
// putting a ten question exam behind an 80 minute free course would both
// contradict the certificate and overstate what it represents. Finishing the
// six lessons is the honest bar for it.
//
// Every paid course is assessed, because that difference is what stops the
// paid certificate quietly losing its meaning.
export type CertificateRule = "exam" | "completion";

export const certificateRule = (priceCents: number): CertificateRule =>
  priceCents > 0 ? "exam" : "completion";
