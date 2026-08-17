// GENERATED FILE. Do not edit by hand.
// Produced by scripts/import-drafts.py from ../course-drafts, which are the
// drafts Angela reviewed. To change a lesson, change the draft and re-run
// the importer, so the reviewed copy and the shipped copy cannot drift.

import type { CourseContent } from "./content-types";

export const COURSE_CONTENT: CourseContent[] = [
  {
    "slug": "microsoft-365-copilot-for-finance",
    "modules": [
      {
        "id": "m1",
        "number": 1,
        "title": "Getting started with Copilot in a finance team",
        "blurb": "3 lessons · roughly 38 minutes. Sets the boundary before anyone touches client data.",
        "intro": [
          "Before you start: which Copilot do you actually have?\n\nThis course is written for people whose firm runs Microsoft 365, which is nearly everyone in Australian finance. It is not written on the assumption that you hold a paid Copilot seat, because plenty of firms do not, and the feature level varies between those that do. Take two minutes and find out which of these you are, because it changes how you do the exercises, not whether you can.\n\n What you see · What you have · How to do this course\n\n A Copilot button in the ribbon in Excel, Word and Outlook · A paid Microsoft 365 Copilot seat · Follow every exercise exactly as written\n\n Copilot only as a separate chat window or web page · The chat that comes with most business and enterprise subscriptions, at no extra cost, with commercial data protection · Do every exercise by opening the file and supplying the content yourself. Each lesson tells you how\n\n No Copilot anywhere, or a personal account · No work entitlement yet · Do the free AI Foundations course first, and put nothing confidential anywhere until you are licensed\n\nMicrosoft renames these tiers regularly, so if you ask your IT or subscription manager, ask by capability rather than by product name: can I use Copilot inside Word and Excel on our own documents, or only in a chat window? That one question tells you which row you are in."
        ],
        "lessons": [
          {
            "id": "m1-l1",
            "number": "1.1",
            "title": "What Copilot is, and where it lives in Microsoft 365",
            "sections": [
              {
                "kind": "outcome",
                "body": "Find Copilot in each app your team uses, and explain in one sentence what it is doing when you ask it something."
              },
              {
                "kind": "idea",
                "body": "Copilot is not a separate product you visit. It sits inside Excel, Outlook, Word, Teams and PowerPoint, and it reads what you already have access to in Microsoft 365. That last part is the whole story: Copilot's answers are only as good as the file, the thread or the meeting it is looking at, and it can only look at things you are already permitted to see."
              },
              {
                "kind": "do",
                "body": "Open a workbook you know well. Click the Copilot button in the Home ribbon. Ask it something you already know the answer to:"
              },
              {
                "kind": "prompt",
                "body": "Summarise what this worksheet contains, in five bullet points,\nand tell me which columns look like calculated fields."
              },
              {
                "kind": "note",
                "body": "Starting with a question you can already answer is the fastest way to calibrate how much to trust it.\n\nNo Copilot button? You are in the second row of the panel above. Open the Copilot chat instead, attach or paste the same worksheet, and ask the same question. The lesson works identically. The only thing you are missing is not having to hand it the file."
              },
              {
                "kind": "watch",
                "body": "Copilot answers confidently whether or not it has understood the file. Confidence is not accuracy, and this is the single most expensive habit to unlearn."
              },
              {
                "kind": "takeaway",
                "body": "Copilot reads your work. It does not know your business."
              }
            ]
          },
          {
            "id": "m1-l2",
            "number": "1.2",
            "title": "The data boundary: what Copilot can and cannot see",
            "sections": [
              {
                "kind": "outcome",
                "body": "State exactly which data your Copilot licence can reach, and decide confidently whether a given client file may be put in front of it."
              },
              {
                "kind": "idea",
                "body": "There is a meaningful difference between Microsoft 365 Copilot working inside your tenant on files you already have access to, and a free consumer chatbot you paste text into. In the first, the material stays inside your organisation's boundary and inherits your existing permissions. In the second, you have moved client data outside the firm. Most people cannot articulate this difference, which is why they either use AI recklessly or refuse to use it at all."
              },
              {
                "kind": "do",
                "body": "Take the three files you touched most this week. For each, write one line: where it lives, who else can see it, and whether it contains anything you would not email to an external party. Keep the list. Module 7 turns it into a rule for your team."
              },
              {
                "kind": "watch",
                "body": "A file being inside your tenant does not make it appropriate to process. Permission and appropriateness are two different tests, and only one of them is technical."
              },
              {
                "kind": "redline",
                "body": "Red line 3. Handling highly sensitive or confidential financial information in public AI tools without appropriate data controls. If you cannot say where the data goes, do not put it there."
              }
            ]
          },
          {
            "id": "m1-l3",
            "number": "1.3",
            "title": "The five red lines: where AI does not belong in finance",
            "sections": [
              {
                "kind": "outcome",
                "body": "Recognise, before you start a task, whether AI belongs in it at all."
              },
              {
                "kind": "idea",
                "body": "Every other AI course tells you what the tool can do. This lesson tells you where to stop, and it comes third rather than last on purpose. A professional who knows the limits uses the tool more, not less, because they are no longer nervous about the parts that matter.\n\nThe five limits are taught as a decision you make at the start of a task, not a review you do at the end. By the time you are checking, you have already committed."
              },
              {
                "kind": "do",
                "body": "Take the five red lines and apply them to your own week. Write down one task where AI clearly belongs, one where it clearly does not, and one you are genuinely unsure about. The uncertain one is the interesting one, and we return to it in Module 7."
              },
              {
                "kind": "watch",
                "body": "The most common failure is not using AI where it was forbidden. It is using it where it was fine, and then not checking, because the output looked finished."
              },
              {
                "kind": "takeaway",
                "body": "Decide whether AI belongs before you start, not after you have an answer you like.\n\nKnowledge check, end of Module 1. A client sends a spreadsheet of transactions and asks whether a deduction is allowable. Which part is safe to give Copilot?\n\nA. The whole question, then send the answer\n\nB. Summarising and categorising the transactions, while the deductibility conclusion stays with you\n\nC. Neither, AI cannot help here\n\nAnswer: B. Copilot does the volume work. The judgement, and the accountability for it, does not move."
              }
            ]
          }
        ],
        "check": {
          "prompt": "A client sends a spreadsheet of transactions and asks whether a deduction is allowable. Which part is safe to give Copilot?",
          "options": [
            "The whole question, then send the answer",
            "Summarising and categorising the transactions, while the deductibility conclusion stays with you",
            "Neither, AI cannot help here"
          ],
          "correctIndex": 1,
          "explanation": "Copilot does the volume work. The judgement, and the accountability for it, does not move."
        }
      },
      {
        "id": "m2",
        "number": 2,
        "title": "Bank reconciliation",
        "blurb": "3 lessons · roughly 42 minutes. The first real job, chosen because it is high volume, low judgement, and everybody has one.",
        "intro": [],
        "lessons": [
          {
            "id": "m2-l1",
            "number": "2.1",
            "title": "Preparing a bank statement and ledger Copilot can read",
            "sections": [
              {
                "kind": "outcome",
                "body": "Get two messy exports into a shape Copilot can actually work with, in under five minutes."
              },
              {
                "kind": "idea",
                "body": "Most reconciliation frustration with AI is not an AI problem. It is a data shape problem. Copilot works well on a clean table with headers in row one, one row per transaction, real dates and real numbers. It works badly on a bank export with three header rows, merged cells, and amounts stored as text with a currency symbol. Ten minutes of shaping saves an hour of arguing."
              },
              {
                "kind": "do",
                "body": "Put the bank export on one sheet and the ledger on another, then ask:"
              },
              {
                "kind": "prompt",
                "body": "This sheet is a bank export. Tell me which row the real headers\nstart on, which columns are dates, which are amounts, and flag\nany column where the values are stored as text rather than as\nnumbers or dates. Do not change anything yet."
              },
              {
                "kind": "note",
                "body": "Note the \"do not change anything yet\". Ask what is wrong before you ask for a fix, so you stay in control of the edit."
              },
              {
                "kind": "check",
                "body": "Sum the amount column yourself and compare it to the statement's closing figure. If those two do not agree, nothing downstream can be trusted, and you have found it in ten seconds rather than at the end."
              },
              {
                "kind": "watch",
                "body": "Dates are where Australian teams get burned. A file exported with United States conventions turns the 3rd of April into the 4th of March silently, and the reconciliation will still balance. Always spot check one date you recognise."
              },
              {
                "kind": "takeaway",
                "body": "Shape the data first. Everything after that gets easier."
              }
            ]
          },
          {
            "id": "m2-l2",
            "number": "2.2",
            "title": "Matching transactions and surfacing the exceptions",
            "sections": [
              {
                "kind": "outcome",
                "body": "Have Copilot do the matching pass, and get a clean list of exceptions instead of a wall of ticks."
              },
              {
                "kind": "idea",
                "body": "The valuable output of a reconciliation is not the matched items. It is the unmatched ones. So do not ask Copilot to reconcile. Ask it to isolate what does not agree, and to tell you why it thinks so."
              },
              {
                "kind": "prompt",
                "body": "Compare the transactions in the Bank sheet with those in the\nLedger sheet. Match on amount and date within three days.\nReturn three tables: matched, in the bank but not the ledger,\nand in the ledger but not the bank. For each unmatched item\ninclude the date, amount, description, and your best guess at\nthe reason. Do not delete or alter any source rows.",
                "label": "Do this"
              },
              {
                "kind": "note",
                "body": "Three tables, not one verdict. The shape of the request determines whether you get something reviewable."
              },
              {
                "kind": "check",
                "body": "Two checks, both fast. First, matched plus unmatched must equal the total row count on each side; if rows have gone missing, the answer is wrong regardless of how tidy it looks. Second, pick the largest matched item and verify it by eye."
              },
              {
                "kind": "watch",
                "body": "A three-day tolerance will happily match two genuinely different payments of the same amount, which is common with regular supplier payments. Any match you cannot explain is an exception, not a match."
              },
              {
                "kind": "redline",
                "body": "Red line 2. Making decisions purely based on AI output without checking the underlying data, assumptions, calculations and sources. A reconciliation that balances because the tool was allowed to drop rows is worse than one that does not balance, because nobody goes looking."
              }
            ]
          },
          {
            "id": "m2-l3",
            "number": "2.3",
            "title": "Explaining and clearing the unmatched items",
            "sections": [
              {
                "kind": "outcome",
                "body": "Turn a list of exceptions into a short written explanation your manager or client can act on."
              },
              {
                "kind": "idea",
                "body": "The last mile of a reconciliation is writing up what is outstanding and why. It is the part that gets rushed at 6pm, and the part a reviewer actually reads. Copilot is genuinely good here, because you are asking it to describe data you have already verified rather than to reach a conclusion."
              },
              {
                "kind": "prompt",
                "body": "Using only the unmatched table above, write a short note for\nthe file. Group the items into: timing differences, likely\nmissing entries, and items needing investigation. For each\ngroup give the count, the total value, and one sentence on\nwhat needs to happen next. Plain professional English, no\nbullet point jargon.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Read the note against the exception table line by line. Copilot will occasionally state a total that does not match its own table, and a reviewer will spot it before you do."
              },
              {
                "kind": "takeaway",
                "body": "Ask AI to describe what you verified. Do not ask it to conclude what you have not."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "m3",
        "number": 3,
        "title": "Month-end close",
        "blurb": "3 lessons · roughly 44 minutes. From a checklist nobody maintains to a close that explains itself.",
        "intro": [],
        "lessons": [
          {
            "id": "m3-l1",
            "number": "3.1",
            "title": "Building a close checklist Copilot can drive",
            "sections": [
              {
                "kind": "outcome",
                "body": "Turn the close that currently lives in one person's head into a written checklist, and use Copilot to keep it moving."
              },
              {
                "kind": "idea",
                "body": "Most closes run on institutional memory. That is a risk in itself, and it also means AI cannot help, because there is nothing written down for it to work from. Writing the checklist is therefore the first real AI task, and Copilot is good at drafting it from what already exists."
              },
              {
                "kind": "do",
                "body": "Point Copilot at last month's close folder and the Teams channel where the chasing happened:"
              },
              {
                "kind": "prompt",
                "body": "From these files and this channel, reconstruct the steps we\nactually performed in last month's close, in order. For each\nstep list who did it, what it depended on, and where it got\nstuck. Mark any step that appears to have been done twice or\nskipped."
              },
              {
                "kind": "note",
                "body": "Reconstructing the real process is far more useful than drafting an ideal one, because the real one is what your team will recognise."
              },
              {
                "kind": "check",
                "body": "Show the reconstructed list to whoever runs the close. Their corrections are the most valuable part of the exercise, and they take five minutes."
              },
              {
                "kind": "takeaway",
                "body": "You cannot automate a process you have never written down."
              }
            ]
          },
          {
            "id": "m3-l2",
            "number": "3.2",
            "title": "Accruals, prepayments and the supporting workings",
            "sections": [
              {
                "kind": "outcome",
                "body": "Draft recurring journals and their supporting workings faster, with the calculation visible rather than hidden."
              },
              {
                "kind": "idea",
                "body": "An accrual is a small calculation plus a paper trail. The calculation is easy; the trail is what takes the time and what an auditor asks for. Copilot can produce both, provided you insist on seeing the working rather than the answer."
              },
              {
                "kind": "prompt",
                "body": "From the attached invoice schedule, calculate the accrual\nrequired at 31 August for services received but not yet\ninvoiced. Show the calculation for each supplier as a separate\nrow: supplier, period covered, daily rate, days accrued, amount.\nThen give the total. Do not round until the total.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Recalculate two rows by hand, one large and one small. The small one matters: rounding and part-period errors hide in immaterial lines and then repeat every month."
              },
              {
                "kind": "watch",
                "body": "Copilot will fill a gap with a plausible assumption rather than telling you the data was missing. If a supplier's period is unclear, it may simply assume a full month. Ask it explicitly to list any assumption it made, then check that list."
              },
              {
                "kind": "prompt",
                "body": "List every assumption you made and every field you inferred\nrather than read directly from the data."
              },
              {
                "kind": "takeaway",
                "body": "Always ask what it assumed. The answer is rarely nothing."
              }
            ]
          },
          {
            "id": "m3-l3",
            "number": "3.3",
            "title": "Flux analysis: explaining every movement worth explaining",
            "sections": [
              {
                "kind": "outcome",
                "body": "Produce a month-on-month movement analysis with draft explanations, ready for you to confirm or correct."
              },
              {
                "kind": "idea",
                "body": "Flux analysis is repetitive, and it is where a close either becomes insightful or becomes a formality. Copilot can identify every movement above a threshold and propose a reason from the underlying detail. You confirm the reasons, which is the part that requires knowing the business."
              },
              {
                "kind": "prompt",
                "body": "Compare this month's trial balance with last month's. List\nevery account where the movement is greater than 10 percent\nor 5,000 dollars, whichever is smaller. For each, give the\nmovement in dollars and percent, and propose the most likely\nexplanation based on the transactions in that account. Mark\neach explanation as confirmed or unconfirmed. Everything you\npropose is unconfirmed.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Work down the unconfirmed column and convert each one to confirmed, corrected or unknown. The unknowns are your real work, and there are usually fewer than you expect."
              },
              {
                "kind": "redline",
                "body": "Red line 4. Situations where there is no clear audit trail or where you cannot explain how the conclusion was reached. If an explanation reaches the board and nobody can say where it came from, it should not have been in the pack."
              },
              {
                "kind": "note",
                "body": "Knowledge check, end of Module 3. Copilot proposes that a 40,000 dollar rise in professional fees was \"due to increased advisory activity\". What do you do?\n\nA. Include it, it is plausible\n\nB. Delete it, AI cannot explain movements\n\nC. Open the account, find the actual invoices, and either confirm it or write the real reason\n\nAnswer: C. It is a starting hypothesis, not a finding. Plausible and true are different things, and the board cannot tell them apart."
              }
            ]
          }
        ],
        "check": {
          "prompt": "Copilot proposes that a 40,000 dollar rise in professional fees was \"due to increased advisory activity\". What do you do?",
          "options": [
            "Include it, it is plausible",
            "Delete it, AI cannot explain movements",
            "Open the account, find the actual invoices, and either confirm it or write the real reason"
          ],
          "correctIndex": 2,
          "explanation": "It is a starting hypothesis, not a finding. Plausible and true are different things, and the board cannot tell them apart."
        }
      },
      {
        "id": "m4",
        "number": 4,
        "title": "FP&A",
        "blurb": "3 lessons · roughly 45 minutes. Where the work stops being mechanical and judgement starts to matter.",
        "intro": [],
        "lessons": [
          {
            "id": "m4-l1",
            "number": "4.1",
            "title": "Turning last year's actuals into a first-cut budget",
            "sections": [
              {
                "kind": "outcome",
                "body": "Produce a defensible first-cut budget in an afternoon instead of a fortnight, with every driver stated."
              },
              {
                "kind": "idea",
                "body": "A first-cut budget is mostly arithmetic applied to assumptions. The arithmetic is Copilot's job. The assumptions are yours, and the discipline is refusing to let them be invented. So you supply the drivers explicitly rather than asking for a budget."
              },
              {
                "kind": "prompt",
                "body": "Build a 12 month budget from the actuals in this sheet, using\nexactly these drivers and no others:\n- revenue grows 6 percent on prior year, spread on the same\n seasonal pattern as last year\n- salaries rise 3.5 percent from 1 July\n- all other costs rise with revenue except rent and insurance,\n which are fixed\nShow each line as prior year, driver applied, budget. If any\nline does not fit these rules, list it separately rather than\nguessing.",
                "label": "Do this"
              },
              {
                "kind": "note",
                "body": "\"List it separately rather than guessing\" is the most useful sentence in this course. It converts silent invention into a visible question."
              },
              {
                "kind": "check",
                "body": "Check the total, then check the seasonality. A model that hits the right annual number with the wrong shape will pass a glance and fail the first cash-flow conversation."
              },
              {
                "kind": "takeaway",
                "body": "Give it your assumptions. Never let it choose them."
              }
            ]
          },
          {
            "id": "m4-l2",
            "number": "4.2",
            "title": "Scenarios and sensitivities without breaking the model",
            "sections": [
              {
                "kind": "outcome",
                "body": "Build best, base and downside cases from one model, and explain what actually drives the difference."
              },
              {
                "kind": "idea",
                "body": "Boards do not want a number, they want a range and the reason for it. Copilot is quick at generating variants, and the risk is that you end up with three spreadsheets nobody can reconcile. The rule is one model, one set of switchable assumptions, three outputs."
              },
              {
                "kind": "prompt",
                "body": "Using the budget on this sheet, build three scenarios that\nchange only the assumptions block, never the formulas:\n- base: as built\n- downside: revenue growth 0 percent, debtor days up by 15\n- upside: revenue growth 12 percent, headcount up by two from\n January\nFor each, show revenue, EBITDA and closing cash. Then tell me\nwhich single assumption moves closing cash the most.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Confirm the base scenario still reproduces your original budget exactly. If it does not, a formula was changed somewhere and every scenario is now unreliable."
              },
              {
                "kind": "watch",
                "body": "Copilot may hard-code a value where a formula belonged. The model keeps working and quietly stops responding to the driver. Spot-check that changing one assumption actually moves the outputs."
              },
              {
                "kind": "takeaway",
                "body": "Change assumptions, never formulas. Then prove the base case still ties."
              }
            ]
          },
          {
            "id": "m4-l3",
            "number": "4.3",
            "title": "Variance commentary in your CFO's voice",
            "sections": [
              {
                "kind": "outcome",
                "body": "Draft variance commentary that sounds like your organisation and survives review."
              },
              {
                "kind": "idea",
                "body": "Commentary is where AI writing is most obvious and most irritating, because the default output is padded and hedged. The fix is to give it a real sample of your own previous commentary and instruct it to match, then to be specific about what a good explanation contains."
              },
              {
                "kind": "prompt",
                "body": "Here is our commentary from the last two months. Match its\nlength, tone and level of detail exactly. Using the variance\ntable below, draft this month's commentary. Rules: name the\ndriver, quantify it, say whether it is timing or permanent,\nand state what we are doing about it. No adjectives that do\nnot carry information. Anything you cannot support from the\ntable, leave as [TO CONFIRM].",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Search the draft for [TO CONFIRM] and resolve every one. If there are none at all, be suspicious rather than pleased."
              },
              {
                "kind": "redline",
                "body": "Red line 1. Final decisions that require professional judgement, accountability or sign-off. Commentary is not neutral description. It tells the board where to look, and that framing is your professional judgement, not the tool's."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "m5",
        "number": 5,
        "title": "The board pack and management pack",
        "blurb": "3 lessons · roughly 41 minutes. The most visible thing finance produces, and the most time-consuming.",
        "intro": [],
        "lessons": [
          {
            "id": "m5-l1",
            "number": "5.1",
            "title": "From numbers to a narrative the board will read",
            "sections": [
              {
                "kind": "outcome",
                "body": "Decide what belongs in the pack before you build any of it."
              },
              {
                "kind": "idea",
                "body": "Most board packs are long because nobody decided what to leave out. The discipline is to write the three things the board must take away first, then build only what supports them. Copilot helps by drafting candidate messages from the numbers, which you then cut."
              },
              {
                "kind": "prompt",
                "body": "From the management accounts and the variance commentary\nattached, propose the five most decision-relevant messages for\na board, ranked. For each: the message in one sentence, the\nevidence behind it, and the decision or action it should prompt.\nExclude anything that is interesting but does not require a\nboard-level decision.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Ask whether anything in the top five would surprise the chair. If nothing would, the pack is describing rather than informing, and it is worth another pass."
              },
              {
                "kind": "takeaway",
                "body": "Decide the message first. The pack is evidence for it, not a substitute."
              }
            ]
          },
          {
            "id": "m5-l2",
            "number": "5.2",
            "title": "Building the pack in Word and PowerPoint",
            "sections": [
              {
                "kind": "outcome",
                "body": "Turn agreed messages plus supporting schedules into a formatted pack, without retyping anything."
              },
              {
                "kind": "idea",
                "body": "This is the one part of the job where Copilot's convenience features genuinely shine: converting a document into a deck, carrying a house template through, and rewriting the same content for two audiences. It is also where errors are introduced silently, because numbers get retyped into slides."
              },
              {
                "kind": "prompt",
                "body": "Turn this board paper into a 10 slide deck using our template.\nOne message per slide as the headline. Put supporting numbers\nin the slide body, and move all detailed schedules to an\nappendix. Do not re-type any figure: reference the source\ntable so I can check each one.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Take the six most important figures on the slides and tie each back to the source schedule. Six is usually enough to establish whether the conversion was faithful."
              },
              {
                "kind": "watch",
                "body": "A number transcribed into a slide has left its audit trail behind. Wherever the tool allows a live link to the source, use it."
              }
            ]
          },
          {
            "id": "m5-l3",
            "number": "5.3",
            "title": "Anticipating the questions the board will ask",
            "sections": [
              {
                "kind": "outcome",
                "body": "Walk into the meeting having already prepared for the three hardest questions."
              },
              {
                "kind": "idea",
                "body": "This is the highest-value ten minutes in the whole course, and almost nobody does it. Ask Copilot to read your own pack adversarially, as a sceptical director would. It is good at this precisely because it has no loyalty to the work."
              },
              {
                "kind": "prompt",
                "body": "You are a non-executive director with a finance background,\nreading this pack for the first time. List the ten questions\nyou would ask, hardest first. For each, note whether the pack\nalready answers it, answers it partially, or does not answer\nit at all.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Anything marked \"does not answer\" is either a gap in the pack or a question you need a response ready for. Both are useful; neither is comfortable."
              },
              {
                "kind": "takeaway",
                "body": "Let AI attack your work before the board does.\n\nKnowledge check, end of Module 5. Copilot builds your deck and one slide shows EBITDA 40,000 dollars higher than the management accounts. Most likely cause?\n\nA. The board pack is correct and the accounts are wrong\n\nB. A figure was transcribed or a subtotal was recalculated during conversion\n\nC. Rounding\n\nAnswer: B. Conversion between formats is where numbers drift. This is why you tie the key figures back to source every time."
              }
            ]
          }
        ],
        "check": {
          "prompt": "Copilot builds your deck and one slide shows EBITDA 40,000 dollars higher than the management accounts. Most likely cause?",
          "options": [
            "The board pack is correct and the accounts are wrong",
            "A figure was transcribed or a subtotal was recalculated during conversion",
            "Rounding"
          ],
          "correctIndex": 1,
          "explanation": "Conversion between formats is where numbers drift. This is why you tie the key figures back to source every time."
        }
      },
      {
        "id": "m6",
        "number": 6,
        "title": "The real-time dashboard",
        "blurb": "2 lessons · roughly 29 minutes. The one that changes how the rest of the business sees finance.",
        "intro": [],
        "lessons": [
          {
            "id": "m6-l1",
            "number": "6.1",
            "title": "Designing a dashboard around the decisions it serves",
            "sections": [
              {
                "kind": "outcome",
                "body": "Choose the six or seven measures that belong on a dashboard, and defend leaving the rest off."
              },
              {
                "kind": "idea",
                "body": "Dashboards fail for one reason: they are built from what is easy to measure rather than from what someone will decide. Start with the decision, then the measure, then the data. Copilot is a good sounding board for this because it will happily challenge a metric that serves no decision."
              },
              {
                "kind": "prompt",
                "body": "Our operations manager needs to decide weekly on stock\npurchasing and casual rostering. Propose the smallest set of\nmeasures that supports exactly those two decisions. For each,\nsay what action a change in it should trigger. Then list the\nmeasures we currently report that do not support either\ndecision.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "For each proposed measure, name the person who will act on it. Any measure without a name attached comes off the dashboard."
              },
              {
                "kind": "takeaway",
                "body": "A measure nobody acts on is decoration."
              }
            ]
          },
          {
            "id": "m6-l2",
            "number": "6.2",
            "title": "Building it, and keeping it refreshing on its own",
            "sections": [
              {
                "kind": "outcome",
                "body": "Build a working dashboard that updates without anyone rebuilding it each month."
              },
              {
                "kind": "idea",
                "body": "The difference between a dashboard and a report is that nobody touches a dashboard between refreshes. That means the data has to arrive in a consistent shape every period, which is a discipline question more than a technical one."
              },
              {
                "kind": "prompt",
                "body": "Build a summary sheet from the transactions table with these\nmeasures: [your list from 6.1]. Use formulas that reference the\nwhole table so new rows are picked up automatically. Do not\npaste any values. Then tell me exactly what would break if next\nmonth's export has an extra column or renamed headers.",
                "label": "Do this"
              },
              {
                "kind": "note",
                "body": "That last question is the important one. Knowing the failure mode in advance is what stops a dashboard quietly going stale."
              },
              {
                "kind": "check",
                "body": "Add three fake rows to the source table and confirm every measure moves. Then delete them."
              },
              {
                "kind": "redline",
                "body": "Red line 5. Fully automating high-risk decisions without appropriate human oversight. A dashboard that refreshes itself is fine. A dashboard that triggers a payment, a credit decision or a lodgement without a person in the loop is not."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "m7",
        "number": 7,
        "title": "Getting it right every time",
        "blurb": "1 lesson · roughly 15 minutes. Pulls the whole course into one page the learner keeps.",
        "intro": [],
        "lessons": [
          {
            "id": "m7-l1",
            "number": "7.1",
            "title": "Verification, source trails and the pre-send checklist",
            "sections": [
              {
                "kind": "outcome",
                "body": "Apply one checklist to any AI-assisted finance output before it leaves your desk, and know what to keep on file."
              },
              {
                "kind": "idea",
                "body": "Across five very different jobs, the same four habits kept appearing: shape the data first, state the assumptions explicitly, verify a sample by hand, and record what the tool did. That is the whole course in one line, and this lesson turns it into a checklist the learner downloads."
              },
              {
                "kind": "note",
                "body": "• Can I explain how this number was produced, without opening the tool?\n\n • Have I verified at least one item by hand, including one small one?\n\n • Did I ask what it assumed, and did I check that list?\n\n • Does anything here require professional judgement or sign-off that I have not personally given?\n\n • If someone asks in six months where this came from, is the trail on the file?"
              },
              {
                "kind": "australia",
                "body": "The Australian frame. The National AI Plan's direction is adoption with appropriate safeguards rather than avoidance. That is precisely what this checklist is: it lets a finance team use these tools on real client work while keeping the explainability and human accountability their professional obligations already demand. The plan describes the destination; the checklist is how a finance team gets there on a Tuesday."
              },
              {
                "kind": "takeaway",
                "body": "Copilot drafts. You verify. The file shows who decided."
              }
            ]
          }
        ],
        "check": {
          "prompt": "You ask Copilot to accrue for services received but not invoiced. It returns a total with no working. What is the correct next step?",
          "options": [
            "Post it, the total is what matters",
            "Ask it to show the calculation per supplier, then recalculate two rows yourself",
            "Post it and note in the file that Copilot prepared it"
          ],
          "correctIndex": 1,
          "explanation": "C is worse than A, because it records reliance without establishing it was reasonable."
        }
      }
    ]
  },
  {
    "slug": "prompting-for-auditable-answers",
    "modules": [
      {
        "id": "c2m1",
        "number": 1,
        "title": "What makes an answer defensible",
        "blurb": "3 lessons · 40 minutes.",
        "intro": [],
        "lessons": [
          {
            "id": "c2m1-l1",
            "number": "1.1",
            "title": "Why two people get different answers from the same tool",
            "sections": [
              {
                "kind": "outcome",
                "body": "Explain why the same question produces different answers, and stop treating that as a flaw to be worked around."
              },
              {
                "kind": "idea",
                "body": "These tools predict a plausible continuation. Plausible is not the same as correct, and the same question asked twice can land on two different plausible answers. That is not a bug you can prompt your way out of. It is the reason every technique in this course exists: if the output varies, your job is to make variation detectable rather than to hope it does not happen."
              },
              {
                "kind": "do",
                "body": "Ask the same substantive question three times in three fresh chats. Not a trivia question, something with judgement in it. Put the three answers side by side and highlight where they differ. The differences are the parts you must verify on every future answer."
              },
              {
                "kind": "takeaway",
                "body": "Where the answers disagree with each other is where they might disagree with the truth."
              }
            ]
          },
          {
            "id": "c2m1-l2",
            "number": "1.2",
            "title": "The five parts of a reliable prompt",
            "sections": [
              {
                "kind": "outcome",
                "body": "Build any working prompt from five components, instead of writing a sentence and hoping."
              },
              {
                "kind": "idea",
                "body": "Every prompt that behaves consistently has the same five parts: the role, the source, the task, the output shape, and the constraint. Miss the source and it invents. Miss the output shape and you get prose you have to re-read. Miss the constraint and it fills gaps silently."
              },
              {
                "kind": "prompt",
                "body": "ROLE You are reviewing this as a senior accountant.\nSOURCE Use only the attached trial balance and the prior year\n comparison. Do not use outside knowledge.\nTASK Identify the five accounts most likely to contain an\n error, and say why for each.\nSHAPE A table: account, movement, reason for suspicion,\n what I should check.\nLIMIT If the data does not support a suspicion, return fewer\n than five rows rather than filling the table.",
                "label": "Do this"
              },
              {
                "kind": "note",
                "body": "That last line is the one people leave out, and it is the one that stops the model manufacturing a fifth answer to satisfy your request."
              },
              {
                "kind": "check",
                "body": "Remove one part and run it again. Watching the answer degrade teaches the lesson better than any explanation."
              },
              {
                "kind": "takeaway",
                "body": "Role, source, task, shape, limit. Missing parts get filled in by the model, not by you."
              }
            ]
          },
          {
            "id": "c2m1-l3",
            "number": "1.3",
            "title": "Telling it what you do not want",
            "sections": [
              {
                "kind": "outcome",
                "body": "Write the negative half of a prompt, which is where most of the reliability comes from."
              },
              {
                "kind": "idea",
                "body": "Professionals are trained to specify what they want. With these tools, the higher-value instruction is what must not happen: do not infer, do not round, do not use outside knowledge, do not fill a gap, do not soften the finding. Each one closes off a specific failure you would otherwise have to catch by reading."
              },
              {
                "kind": "do",
                "body": "Take a prompt you already use and add three negative constraints. Run both versions on the same source and compare."
              },
              {
                "kind": "prompt",
                "body": "Do not infer any figure that is not stated in the document.\nWhere something is missing, write MISSING rather than an\nestimate. Do not round. Do not summarise across entities."
              },
              {
                "kind": "redline",
                "body": "Red line 2. Making decisions purely based on AI output without checking the underlying data, assumptions, calculations and sources. Negative constraints do not remove the need to check. They make checking possible in a reasonable amount of time."
              },
              {
                "kind": "note",
                "body": "Knowledge check, end of Module 1. Your prompt returns a tidy five-row table every time, even for a small data set. What does that most likely mean?\n\nA. The tool is thorough\n\nB. You asked for five rows, so it produced five rows whether or not the data supported them\n\nC. The data set is larger than you thought\n\nAnswer: B. A requested shape is a target the model will hit. Always allow it to return less."
              }
            ]
          }
        ],
        "check": {
          "prompt": "Your prompt returns a tidy five-row table every time, even for a small data set. What does that most likely mean?",
          "options": [
            "The tool is thorough",
            "You asked for five rows, so it produced five rows whether or not the data supported them",
            "The data set is larger than you thought"
          ],
          "correctIndex": 1,
          "explanation": "A requested shape is a target the model will hit. Always allow it to return less."
        }
      },
      {
        "id": "c2m2",
        "number": 2,
        "title": "Working with long documents",
        "blurb": "3 lessons · 43 minutes. Contracts, supplier agreements, policies, tenders, reports, rulings.",
        "intro": [],
        "lessons": [
          {
            "id": "c2m2-l1",
            "number": "2.1",
            "title": "Questioning a long document instead of summarising it",
            "sections": [
              {
                "kind": "outcome",
                "body": "Get reliable answers out of a fifty-page document in minutes, without trusting a summary."
              },
              {
                "kind": "idea",
                "body": "The instinct is to ask for a summary. A summary is the least useful and most dangerous output, because it flattens exactly the exceptions and carve-outs that matter and you have no way to see what it dropped. Ask narrow questions instead, and ask them one at a time."
              },
              {
                "kind": "prompt",
                "body": "Using only this lease, answer each question separately. For\neach, quote the exact clause you relied on and give the clause\nnumber. If the lease does not answer the question, say NOT\nADDRESSED rather than reasoning from general knowledge.\n\n1. What is the review mechanism and when does it apply?\n2. Who pays outgoings, and are any excluded?\n3. What are the make-good obligations at the end of term?\n4. Is there an option to renew, and what triggers it?",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Open the document at each quoted clause number. This takes two minutes and catches the failure mode that matters most: a real-sounding quote attached to the wrong clause.\n\nThe worked example below is a lease because leases punish sloppy reading. The identical structure works on a supplier agreement, an insurance policy, a tender response or a fifty-page board report. Swap the four questions for the four you would have had to find by hand."
              },
              {
                "kind": "takeaway",
                "body": "Narrow questions with quoted sources. Never a summary you cannot audit."
              }
            ]
          },
          {
            "id": "c2m2-l2",
            "number": "2.2",
            "title": "Making it quote the clause, not paraphrase it",
            "sections": [
              {
                "kind": "outcome",
                "body": "Force verbatim quotation, and recognise a paraphrase pretending to be one."
              },
              {
                "kind": "idea",
                "body": "A paraphrase is where meaning quietly shifts. \"Rent is reviewed annually to CPI\" and \"rent may be reviewed annually to CPI at the lessor's election\" are one word apart and financially very different. Insisting on verbatim text moves the risk from interpretation, which you cannot see, to transcription, which you can check."
              },
              {
                "kind": "prompt",
                "body": "Quote the relevant text word for word, in quotation marks,\nexactly as it appears including any defined terms. Then, on a\nseparate line, give your plain English reading. Never merge\nthe two.",
                "label": "Do this"
              },
              {
                "kind": "watch",
                "body": "Models will occasionally produce a fluent quotation that does not exist in the document. Search the source for a distinctive phrase from each quote. If you cannot find it, nothing else in that answer is trustworthy either."
              }
            ]
          },
          {
            "id": "c2m2-l3",
            "number": "2.3",
            "title": "Comparing two versions of the same document",
            "sections": [
              {
                "kind": "outcome",
                "body": "Find what actually changed between two drafts, including the changes nobody flagged."
              },
              {
                "kind": "idea",
                "body": "Comparison is a task where these tools are genuinely strong, because it is bounded: both texts are in front of it. The discipline is asking for materiality rather than a list of every altered comma."
              },
              {
                "kind": "prompt",
                "body": "Compare version A and version B of this agreement. List only\nchanges that alter an obligation, a payment, a timeframe or a\nrisk allocation. For each: the clause, the old wording, the\nnew wording, and who it now favours. Ignore formatting and\npure drafting changes. Then separately list anything removed\nentirely.",
                "label": "Do this"
              },
              {
                "kind": "note",
                "body": "\"Anything removed entirely\" is asked for separately because deletions are what get missed. There is no new text to notice."
              },
              {
                "kind": "takeaway",
                "body": "Ask what changed materially, and always ask separately what disappeared."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c2m3",
        "number": 3,
        "title": "Structured data you can trust",
        "blurb": "3 lessons · 45 minutes. Turning documents into rows.",
        "intro": [],
        "lessons": [
          {
            "id": "c2m3-l1",
            "number": "3.1",
            "title": "From documents to a clean, checkable table",
            "sections": [
              {
                "kind": "outcome",
                "body": "Extract consistent fields from a stack of inconsistent documents."
              },
              {
                "kind": "idea",
                "body": "Extraction fails when the field definition is loose. \"Date\" is not a field. \"Invoice date as printed on the document, in DD/MM/YYYY\" is. Every ambiguity you leave is a decision the model makes for you, differently, on each document."
              },
              {
                "kind": "prompt",
                "body": "Extract these fields from each attached invoice into one table:\n- supplier_name: exactly as printed\n- abn: digits only, or MISSING\n- invoice_date: DD/MM/YYYY as printed, do not reformat or infer\n- invoice_number: as printed\n- subtotal_ex_gst, gst_amount, total_inc_gst: numbers only\n- source_file: the file name\n\nRules: never calculate a field that is not printed. If GST is\nnot shown, write MISSING, do not derive it. One row per\ninvoice, no merged rows.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "For every row, check that subtotal plus GST equals the total as printed. Any row that fails is a document to open by hand, and this single check catches most extraction errors in seconds.\n\nInvoices are used here because everyone has a stack of them and the arithmetic gives you a free correctness check. The same field-by-field discipline is what you want for expense claims, timesheets, application forms, supplier onboarding packs or survey responses. The check line changes, the method does not."
              },
              {
                "kind": "takeaway",
                "body": "Define the field precisely, or the model defines it for you."
              }
            ]
          },
          {
            "id": "c2m3-l2",
            "number": "3.2",
            "title": "Designing the output so errors are visible",
            "sections": [
              {
                "kind": "outcome",
                "body": "Shape output so that a mistake announces itself instead of hiding."
              },
              {
                "kind": "idea",
                "body": "This is the most transferable idea in the course. You cannot verify everything, so design the output so wrongness is loud. Three devices do most of the work: a MISSING marker instead of a blank, a confidence column, and a self-check the model must perform and report."
              },
              {
                "kind": "prompt",
                "body": "Add two columns to the table above:\n- confidence: high, medium or low, based on how clearly the\n field was printed\n- flag: any row where a field was hard to read, where two\n values could have been the field, or where the arithmetic\n does not tie\n\nThen, below the table, state: how many rows you produced, how\nmany documents you were given, and any document you could not\nprocess at all.",
                "label": "Do this"
              },
              {
                "kind": "note",
                "body": "Row count against document count is a ten-second check that catches silently skipped files, which is the extraction error people notice last."
              },
              {
                "kind": "takeaway",
                "body": "Make the output tell you where to look."
              }
            ]
          },
          {
            "id": "c2m3-l3",
            "number": "3.3",
            "title": "Spot-checking a batch without checking all of it",
            "sections": [
              {
                "kind": "outcome",
                "body": "Verify a two hundred row extraction in about ten minutes, defensibly."
              },
              {
                "kind": "idea",
                "body": "Checking everything defeats the purpose; checking nothing is negligent. The middle path is a deliberate sample: everything flagged, everything low confidence, the largest few by value, and a small random handful. That is a sampling approach your profession already understands, applied to a new source of error."
              },
              {
                "kind": "do",
                "body": "Take a real extraction and check: all flagged rows, all low-confidence rows, the five largest by value, and five chosen at random. Record what you checked and what you found. That record is the file note."
              },
              {
                "kind": "redline",
                "body": "Red line 4. Situations where there is no clear audit trail or where you cannot explain how the conclusion was reached. \"We extracted 200 invoices with AI\" is not a method. \"We extracted 200 invoices, checked all 14 flagged rows plus 10 others by value and at random, and found 2 errors which we corrected\" is."
              },
              {
                "kind": "note",
                "body": "Knowledge check, end of Module 3. Your extraction returns 198 rows from 200 documents and everything ties. What do you do?\n\nA. Proceed, a 99 percent rate is excellent\n\nB. Find the two missing documents, because a skipped file is invisible in the output\n\nC. Re-run the whole batch\n\nAnswer: B. Errors you can see are the manageable kind. Absences are the dangerous kind."
              }
            ]
          }
        ],
        "check": {
          "prompt": "Your extraction returns 198 rows from 200 documents and everything ties. What do you do?",
          "options": [
            "Proceed, a 99 percent rate is excellent",
            "Find the two missing documents, because a skipped file is invisible in the output",
            "Re-run the whole batch"
          ],
          "correctIndex": 1,
          "explanation": "Errors you can see are the manageable kind. Absences are the dangerous kind."
        }
      },
      {
        "id": "c2m4",
        "number": 4,
        "title": "Writing that goes out under your name",
        "blurb": "3 lessons · 40 minutes. Client advice, internal recommendations, board and management updates.",
        "intro": [],
        "lessons": [
          {
            "id": "c2m4-l1",
            "number": "4.1",
            "title": "Drafting so the reviewer edits rather than rewrites",
            "sections": [
              {
                "kind": "outcome",
                "body": "Produce a first draft, of advice or a recommendation, that a reviewer improves rather than rewrites."
              },
              {
                "kind": "idea",
                "body": "The reason AI-drafted work gets rewritten is that it answers the question in general rather than for this reader and this situation. Give it the client's specific facts, the conclusion you have already reached, and the reasoning you want shown. You are asking it to write up your thinking, not to do your thinking."
              },
              {
                "kind": "prompt",
                "body": "Write a client letter setting out the following advice.\nThe conclusion is mine and is not open for revision:\n[your conclusion]\nThe facts you may rely on are these and only these:\n[facts]\nStructure: what we were asked, what we found, what we\nrecommend, what we need from you.\nDo not add caveats I have not given you. Do not restate the\nlaw in general terms. If a fact is needed that I have not\nprovided, mark it [FACT NEEDED] rather than assuming it.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Read the draft asking one question only: does it say anything I did not decide? Anything it added is either a fact it invented or a caveat that changes your advice."
              },
              {
                "kind": "redline",
                "body": "Red line 1. Final decisions that require professional judgement, accountability or sign-off. The conclusion is yours before the drafting starts. If you find yourself reading the draft to discover what you think, stop."
              }
            ]
          },
          {
            "id": "c2m4-l2",
            "number": "4.2",
            "title": "Matching your voice, not the model's",
            "sections": [
              {
                "kind": "outcome",
                "body": "Get output that sounds like your firm, reliably, without editing every sentence."
              },
              {
                "kind": "idea",
                "body": "Describing a tone does not work. \"Professional but warm\" produces the same generic register for everyone. Showing examples works. Two or three pieces of your own real writing will do more than a paragraph of adjectives."
              },
              {
                "kind": "prompt",
                "body": "Here are three letters we have sent. Study the sentence\nlength, how we open, how we deliver bad news, and how much we\nexplain before we recommend. Match those patterns. Do not\nmatch the content.\n\nNow draft the following letter in that voice: [brief]",
                "label": "Do this"
              },
              {
                "kind": "takeaway",
                "body": "Show it your writing. Do not describe your writing."
              }
            ]
          },
          {
            "id": "c2m4-l3",
            "number": "4.3",
            "title": "The hedging problem, and how to remove it",
            "sections": [
              {
                "kind": "outcome",
                "body": "Strip out the padding that makes AI writing recognisable and slightly evasive."
              },
              {
                "kind": "idea",
                "body": "These tools hedge by default: it is important to note, this may vary depending on circumstances, we recommend consulting a professional. In client advice this is worse than clutter. It reads as though you are not sure, and it dilutes the one recommendation you are being paid for."
              },
              {
                "kind": "prompt",
                "body": "Rewrite the draft below. Remove every sentence that does not\ncarry information. Delete phrases like \"it is important to\nnote\", \"this may vary\", and any recommendation to seek\nprofessional advice, since we are the professional advice.\nKeep every number and every deadline. Aim for about 30 percent\nshorter without losing content.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Compare the two versions and confirm nothing substantive was cut alongside the padding. Aggressive shortening occasionally takes a real qualifier with it."
              },
              {
                "kind": "takeaway",
                "body": "Hedging is not caution. It is the absence of a decision."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c2m5",
        "number": 5,
        "title": "Research and citation",
        "blurb": "2 lessons · 29 minutes. The module that prevents the most embarrassing failure.",
        "intro": [],
        "lessons": [
          {
            "id": "c2m5-l1",
            "number": "5.1",
            "title": "Making the model show its sources",
            "sections": [
              {
                "kind": "outcome",
                "body": "Get research output where every claim is traceable, and know which tools can honestly do this."
              },
              {
                "kind": "idea",
                "body": "There is a real difference between a tool that searches and cites what it found, and one that answers from memory and then produces a citation that looks right. The second is where fabricated references come from. Knowing which mode you are in is more important than any prompt."
              },
              {
                "kind": "prompt",
                "body": "Answer using only sources you have actually retrieved in this\nsession. For each claim, give the source and a direct quote\nfrom it. If you did not retrieve a source for a claim, mark it\nUNSOURCED. Do not produce a citation you cannot quote from.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Open every citation. Not a sample, every one. Fabricated references are plausible enough to survive a glance and catastrophic in professional work."
              },
              {
                "kind": "australia",
                "body": "The Australian frame. A citation to an ATO ruling or an accounting standard that does not exist, or that says something different, is the kind of error that ends up in a professional complaint. This lesson exists because the failure is quiet and the consequence is not."
              }
            ]
          },
          {
            "id": "c2m5-l2",
            "number": "5.2",
            "title": "Recognising a confident answer built on nothing",
            "sections": [
              {
                "kind": "outcome",
                "body": "Notice, from the answer alone, when the model is guessing."
              },
              {
                "kind": "idea",
                "body": "There are tells. Round numbers with no source. Generalities where you asked for specifics. Confident dates. A reference to \"recent guidance\" without naming it. Once you have seen the pattern a few times you will feel it before you can articulate it, and the fix is the same every time: ask it to show you."
              },
              {
                "kind": "do",
                "body": "Deliberately ask a question you know the tool cannot answer from your material, and study how it responds. Learning the shape of a guess on a low-stakes question is much cheaper than learning it on a client matter."
              },
              {
                "kind": "prompt",
                "body": "For your previous answer, mark each sentence as: stated in\nthe source, inferred from the source, or from general\nknowledge. Be strict with yourself."
              },
              {
                "kind": "takeaway",
                "body": "Fluency is not evidence. Ask it to mark its own working."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c2m6",
        "number": 6,
        "title": "Reviewing, not just producing",
        "blurb": "2 lessons · 28 minutes. The underused half of the tool.",
        "intro": [],
        "lessons": [
          {
            "id": "c2m6-l1",
            "number": "6.1",
            "title": "Using AI to review a spreadsheet or a draft",
            "sections": [
              {
                "kind": "outcome",
                "body": "Get a genuine second pair of eyes on work you or a colleague produced."
              },
              {
                "kind": "idea",
                "body": "Most people use these tools to produce and then check the output themselves. The inverse is often more valuable: you produce, and it reviews. It is tireless, it has no ego about your model, and it does not get bored on row 400."
              },
              {
                "kind": "prompt",
                "body": "Review this workbook as a careful reviewer would. Look for:\nformulas inconsistent with the rest of their row or column,\nhard-coded numbers inside formulas, references pointing\noutside the intended range, totals that do not equal the sum\nof their parts, and anything labelled in a way that does not\nmatch what it calculates. List findings by severity with the\ncell reference. Do not change anything.",
                "label": "Do this"
              },
              {
                "kind": "check",
                "body": "Verify each finding before acting. Review output has false positives, and a confident finding about a formula that is actually fine wastes time if you accept it blindly."
              },
              {
                "kind": "takeaway",
                "body": "You produce, it reviews. Often more valuable than the other way round."
              }
            ]
          },
          {
            "id": "c2m6-l2",
            "number": "6.2",
            "title": "The adversarial prompt: asking it to argue against you",
            "sections": [
              {
                "kind": "outcome",
                "body": "Stress-test your own conclusion before someone else does."
              },
              {
                "kind": "idea",
                "body": "These tools are agreeable by default, which makes them poor critics unless instructed otherwise. Told explicitly to argue the other side, they become genuinely useful, because they have no stake in your being right."
              },
              {
                "kind": "prompt",
                "body": "Here is my conclusion and the reasoning behind it. Argue\nagainst it as strongly as the evidence allows. Identify the\nweakest link, what assumption it rests on, and what evidence\nwould overturn it. Do not be balanced. Do not reassure me.",
                "label": "Do this"
              },
              {
                "kind": "takeaway",
                "body": "Ask it to attack your work before your client, your partner or the board does."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c2m7",
        "number": 7,
        "title": "Your prompt library",
        "blurb": "1 lesson · 14 minutes. Turning the course into something the team keeps.",
        "intro": [],
        "lessons": [
          {
            "id": "c2m7-l1",
            "number": "7.1",
            "title": "Building and sharing a prompt library that gets used",
            "sections": [
              {
                "kind": "outcome",
                "body": "Leave with a small library of prompts your team will actually reuse."
              },
              {
                "kind": "idea",
                "body": "Most prompt libraries die because they are too big and stored somewhere nobody looks. Ten prompts in a shared document beats a hundred in a system nobody opens. Each entry needs four things: what it is for, the prompt, what to check afterwards, and who owns it."
              },
              {
                "kind": "do",
                "body": "Take the five prompts from this course you would actually use, adapt them to your firm's wording, and put them where your team already works. Add the check line to each. Without the check line it is just a shortcut, and shortcuts are how the habits you have just built get lost."
              },
              {
                "kind": "takeaway",
                "body": "A prompt without its check line is half a prompt.\n\nPractical task and final quiz\nPractical task: take a real document you are working on this week and answer three questions from it using the Module 2 method, with quoted clauses. Submit the questions, the quotes, and what you found when you checked them.\n\nFinal quiz sample. A colleague sends you a research note drafted with AI, citing three ATO rulings. What do you do first?\n\nA. Check the reasoning is sound\n\nB. Open all three rulings and confirm they exist and say what is claimed\n\nC. Rewrite it in the firm's voice\n\nAnswer: B. Sound reasoning built on a citation that does not exist is still worthless, and it is the failure most likely to reach a client."
              }
            ]
          }
        ],
        "check": null
      }
    ]
  },
  {
    "slug": "automating-finance-workflows",
    "modules": [
      {
        "id": "c3m1",
        "number": 1,
        "title": "What an agent is, and when it beats a prompt",
        "blurb": "3 lessons · 42 minutes.",
        "intro": [],
        "lessons": [
          {
            "id": "c3m1-l1",
            "number": "1.1",
            "title": "Prompt, automation or agent: telling them apart",
            "sections": [
              {
                "kind": "outcome",
                "body": "Choose the right level of tool for a task, and stop reaching for the most complex one."
              },
              {
                "kind": "idea",
                "body": "A prompt is you asking, once. An automation follows fixed rules with no judgement. An agent is given a goal and decides its own steps. Most finance problems people describe as needing an agent are actually automations, and a rules-based automation you can read is nearly always better than an agent you cannot predict."
              },
              {
                "kind": "do",
                "body": "List five tasks you would like off your plate. For each, ask whether the steps are the same every time. If yes, it is an automation, and you should build that instead. Only the ones where the steps genuinely vary belong in this course."
              },
              {
                "kind": "takeaway",
                "body": "Use the least clever tool that does the job. Cleverness is unpredictability."
              }
            ]
          },
          {
            "id": "c3m1-l2",
            "number": "1.2",
            "title": "What agents are genuinely good at, and what they are not",
            "sections": [
              {
                "kind": "outcome",
                "body": "Recognise the shape of a task where an agent earns its complexity."
              },
              {
                "kind": "idea",
                "body": "Agents shine where inputs arrive in unpredictable formats but the intent is consistent. Supplier invoices from forty suppliers in forty layouts, all needing the same six fields. Emails that might be a query, an approval or a complaint. The variation is in the input, not in what you want done."
              },
              {
                "kind": "do",
                "body": "For each candidate from 1.1, write down what varies: the input format, the decision, or the output. If only the input format varies, it is a good agent candidate. If the decision varies, be careful. If the output varies, you probably have several processes wearing one name."
              },
              {
                "kind": "takeaway",
                "body": "Varying inputs, consistent intent. That is the sweet spot."
              }
            ]
          },
          {
            "id": "c3m1-l3",
            "number": "1.3",
            "title": "The processes you should refuse to automate",
            "sections": [
              {
                "kind": "outcome",
                "body": "Say no to an automation request, with reasons that hold up."
              },
              {
                "kind": "idea",
                "body": "This lesson is the reason the course is credible. There are processes where full automation is the wrong answer regardless of how well it would work technically, and being able to explain why is a senior skill. Your five limits give the test."
              },
              {
                "kind": "do",
                "body": "Run each candidate through five questions. Does it end in a decision requiring sign-off? Could it act on data nobody checked? Does it touch sensitive information in a tool without controls? Would the trail show how the conclusion was reached? Is it a compliance, tax, audit, credit or investment decision?"
              },
              {
                "kind": "redline",
                "body": "Red line 5. Fully automating high-risk decisions involving compliance, tax, audit, credit, investment or regulatory obligations without appropriate human oversight. Note the words \"fully\" and \"without oversight\". The answer is rarely do not automate. It is automate the preparation, keep the decision."
              },
              {
                "kind": "note",
                "body": "Knowledge check, end of Module 1. A partner asks for an agent that reviews expense claims and approves anything under 500 dollars. What is the right response?\n\nA. Build it, the threshold makes it low risk\n\nB. Build it to prepare and recommend, with a person approving in one click, and log both\n\nC. Refuse, approvals cannot be automated\n\nAnswer: B. A one-click human approval keeps accountability where it belongs and costs almost nothing in time. C loses all the value; A moves the accountability to nobody."
              }
            ]
          }
        ],
        "check": {
          "prompt": "A partner asks for an agent that reviews expense claims and approves anything under 500 dollars. What is the right response?",
          "options": [
            "Build it, the threshold makes it low risk",
            "Build it to prepare and recommend, with a person approving in one click, and log both",
            "Refuse, approvals cannot be automated"
          ],
          "correctIndex": 1,
          "explanation": "A one-click human approval keeps accountability where it belongs and costs almost nothing in time. C loses all the value; A moves the accountability to nobody."
        }
      },
      {
        "id": "c3m2",
        "number": 2,
        "title": "Choosing the right process",
        "blurb": "3 lessons · 46 minutes. The learner picks the process they will build.",
        "intro": [],
        "lessons": [
          {
            "id": "c3m2-l1",
            "number": "2.1",
            "title": "Scoring a candidate process: volume, rules, risk",
            "sections": [
              {
                "kind": "outcome",
                "body": "Rank your candidate processes objectively instead of by whichever annoys you most."
              },
              {
                "kind": "idea",
                "body": "Three scores decide it. Volume: how often does it run, and how long does it take. Rule clarity: could you write the rules down for a new starter. Risk: what happens if it goes wrong and nobody notices. High volume plus clear rules plus low risk is where you start. The most irritating task is usually high risk, which is exactly why it is still manual."
              },
              {
                "kind": "do",
                "body": "Score each candidate out of five on volume, rule clarity and inverse risk. Build the highest total first. Keep the scoring sheet; it is what you show your manager to justify the effort."
              },
              {
                "kind": "takeaway",
                "body": "Start where the volume is high and the consequences are low. Earn trust before you spend it."
              }
            ]
          },
          {
            "id": "c3m2-l2",
            "number": "2.2",
            "title": "Mapping the process as it actually runs today",
            "sections": [
              {
                "kind": "outcome",
                "body": "Document the real process, including the parts nobody admits to."
              },
              {
                "kind": "idea",
                "body": "Every process has an official version and a real one. The real one has the exceptions, the person who is emailed when something looks odd, and the spreadsheet somebody keeps on the side. Automating the official version produces something that breaks in week one."
              },
              {
                "kind": "do",
                "body": "Sit with whoever runs it and walk through the last ten real instances, not a description of the process. Ask what they did each time. Write down every exception. Then ask the question that finds the rest: \"when does this go wrong, and what do you do then?\""
              },
              {
                "kind": "takeaway",
                "body": "Map what happens, not what is supposed to happen."
              }
            ]
          },
          {
            "id": "c3m2-l3",
            "number": "2.3",
            "title": "Deciding where the human sign-off sits",
            "sections": [
              {
                "kind": "outcome",
                "body": "Place the approval step deliberately, before you build anything."
              },
              {
                "kind": "idea",
                "body": "Sign-off placed at the end is usually theatre, because by then the work is done and approving is the path of least resistance. Placed at the point where the decision is actually made, it is real. Deciding this before you build means the agent is designed around the checkpoint rather than having one bolted on."
              },
              {
                "kind": "do",
                "body": "On your process map, mark the single point where a wrong step becomes expensive to undo. The sign-off goes immediately before it, not at the end."
              },
              {
                "kind": "takeaway",
                "body": "Put the approval where the decision is, not where the process ends."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c3m3",
        "number": 3,
        "title": "Your first agent",
        "blurb": "3 lessons · 52 minutes. Built with Power Automate and Copilot, which your firm already has.",
        "intro": [],
        "lessons": [
          {
            "id": "c3m3-l1",
            "number": "3.1",
            "title": "Building an agent with what you already have",
            "sections": [
              {
                "kind": "outcome",
                "body": "Assemble a working agent from Power Automate and Copilot, without buying anything."
              },
              {
                "kind": "idea",
                "body": "An agent is not a product you buy, it is four parts wired together: something that triggers it,\nsomething that reads and reasons, somewhere the rules live, and somewhere the trail is written.\nCopilot Studio bundles those four into one screen. Power Automate makes you assemble them\nyourself, which is slower to build and considerably better to learn on, because you can see every\njoin. Nothing is hidden inside a product you are renting.\n\nThis matters beyond convenience. When a partner asks how the thing decided something, you can\npoint at the step. That is much harder to do with a tool that presents itself as a single box."
              },
              {
                "kind": "do",
                "body": "Build a flow triggered by a file landing in a SharePoint or Teams folder. Have it pass the\ndocument to Copilot with a fixed instruction, write the result to a spreadsheet, and record what\nit did. Use a document you know well and check every field by hand the first time."
              },
              {
                "kind": "watch",
                "body": "Power Automate will happily run on a schedule forever with nobody reading the output. Build the\nlog before you build the automation, not after."
              },
              {
                "kind": "takeaway",
                "body": "You do not need a licence you do not have. You need a trigger, a reasoning step, written rules\nand a trail."
              },
              {
                "kind": "australia",
                "body": "If your firm does have Copilot Studio. Everything in this module transfers\ndirectly. The four parts are the same parts, just assembled for you on one screen. Lesson 3.3\ncloses with what changes and when the upgrade is worth it, so nobody who has paid for it is left\nout."
              }
            ]
          },
          {
            "id": "c3m3-l2",
            "number": "3.2",
            "title": "Building a working agent from your process map",
            "sections": [
              {
                "kind": "outcome",
                "body": "Turn the map from Module 2 into an agent that handles the normal case end to end."
              },
              {
                "kind": "idea",
                "body": "Build the happy path first and resist the urge to handle everything. An agent that manages the seventy percent of cases that are straightforward, and hands the rest to a person, delivers most of the value at a fraction of the complexity."
              },
              {
                "kind": "do",
                "body": "Write the agent's instructions as you would brief a capable new starter: what it is for, what it must always do, what it must never do, and when to stop and ask. Then connect the sources it needs."
              },
              {
                "kind": "prompt",
                "body": "You process supplier invoices for approval.\n\nALWAYS: extract supplier, ABN, date, number, amounts and GST\nexactly as printed. Match to a purchase order where one exists.\nNEVER: approve a payment. Never calculate GST that is not\nprinted. Never guess a supplier from a partial name.\nSTOP AND ASK when: no PO match, the amount differs from the PO\nby more than 5 percent, the supplier is new, or anything is\nunreadable.\nALWAYS RECORD: what you extracted, what you matched it to, and\nwhy you stopped if you stopped."
              },
              {
                "kind": "takeaway",
                "body": "Brief it like a new starter. Always, never, stop and ask, record."
              }
            ]
          },
          {
            "id": "c3m3-l3",
            "number": "3.3",
            "title": "Testing it against the messy cases first",
            "sections": [
              {
                "kind": "outcome",
                "body": "Test in the order that finds problems, rather than the order that feels reassuring."
              },
              {
                "kind": "idea",
                "body": "Everyone tests the clean case, watches it work and feels good. Test the mess first: the scanned document, the credit note, the foreign currency invoice, the duplicate, the one with two pages stapled the wrong way round. If it handles those or stops sensibly, the clean case is not in doubt."
              },
              {
                "kind": "do",
                "body": "Assemble ten genuinely awkward real examples before you test a single normal one. For each, record what you expected, what happened, and whether stopping would have been the right answer."
              },
              {
                "kind": "watch",
                "body": "The dangerous outcome is not an error. It is the agent confidently processing something it should have stopped on. Count those separately, because they are the ones that reach production."
              },
              {
                "kind": "takeaway",
                "body": "Mess first. A confident wrong answer is worse than a stop."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c3m4",
        "number": 4,
        "title": "Document intake",
        "blurb": "3 lessons · 48 minutes. The most common real use case.",
        "intro": [],
        "lessons": [
          {
            "id": "c3m4-l1",
            "number": "4.1",
            "title": "From email attachment to a processed record",
            "sections": [
              {
                "kind": "outcome",
                "body": "Build the full chain: an invoice arrives by email, and a coded draft entry is waiting for approval."
              },
              {
                "kind": "idea",
                "body": "This is the flagship example because everyone has it and everyone hates it. The chain is: receive, extract, match, code, queue for approval. Each link can fail differently, so each gets its own check rather than one check at the end."
              },
              {
                "kind": "do",
                "body": "Build the chain one link at a time, confirming each before adding the next. Coding is where firm knowledge lives, so give it your actual chart of accounts and your real coding rules, including the ones that are conventions rather than rules."
              },
              {
                "kind": "check",
                "body": "Run twenty real invoices through and compare the agent's coding with what your team actually did. Disagreements are either agent errors or undocumented conventions, and both are worth finding."
              }
            ]
          },
          {
            "id": "c3m4-l2",
            "number": "4.2",
            "title": "Handling the documents that do not fit the pattern",
            "sections": [
              {
                "kind": "outcome",
                "body": "Design the exception path properly, so odd documents are handled rather than lost."
              },
              {
                "kind": "idea",
                "body": "Exceptions are not failures, they are a category. Credit notes, statements sent instead of invoices, multi-page bundles, foreign currency, prepayments spanning periods. Each needs a named destination. An exception with no destination becomes an item nobody owns."
              },
              {
                "kind": "do",
                "body": "List every exception type from your testing and give each a route: to a person, to a queue, or to a different process. Then check that every route has an owner and a review interval."
              },
              {
                "kind": "takeaway",
                "body": "Every exception needs a name and an owner, or it becomes a backlog."
              }
            ]
          },
          {
            "id": "c3m4-l3",
            "number": "4.3",
            "title": "The approval step, and what it must show",
            "sections": [
              {
                "kind": "outcome",
                "body": "Build an approval screen that lets someone approve responsibly in seconds."
              },
              {
                "kind": "idea",
                "body": "An approval step that shows only a total trains people to click yes. It must show the source document alongside the extracted values, what it matched to, what it changed, and anything it was unsure about. Enough to actually check, little enough to be quick."
              },
              {
                "kind": "do",
                "body": "Design the approval view, then hand it to a colleague with three invoices, one of which has a deliberate error. If they catch it, the view is good. If they do not, it is showing the wrong things."
              },
              {
                "kind": "redline",
                "body": "Red line 4. Situations where there is no clear audit trail or where you cannot explain how the conclusion was reached. If someone asks in a year why an invoice was coded that way, the answer must be on the record, not in the agent's head."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c3m5",
        "number": 5,
        "title": "Exception monitoring",
        "blurb": "2 lessons · 28 minutes.",
        "intro": [],
        "lessons": [
          {
            "id": "c3m5-l1",
            "number": "5.1",
            "title": "Watching for the things people forget to check",
            "sections": [
              {
                "kind": "outcome",
                "body": "Put an agent on the checks that only get done when someone remembers."
              },
              {
                "kind": "idea",
                "body": "Monitoring is the safest possible use of an agent, because it only ever tells a person something. Duplicate payments, a supplier's bank details changing, a debtor crossing terms, an unusual journal at an unusual hour. None of these are hard to detect. They are just easy to forget."
              },
              {
                "kind": "do",
                "body": "Pick three checks nobody currently does reliably. Define exactly what triggers each, who is told, and what they should do about it. If the last answer is unclear, the check is not ready."
              }
            ]
          },
          {
            "id": "c3m5-l2",
            "number": "5.2",
            "title": "Alerts that get acted on rather than muted",
            "sections": [
              {
                "kind": "outcome",
                "body": "Design alerts people keep reading after the second week."
              },
              {
                "kind": "idea",
                "body": "An alert nobody acts on is worse than none, because it creates the appearance of a control. The rules are simple and widely ignored: alert on the exception rather than the event, include enough context to decide without opening anything else, and state the action. If you cannot say what the person should do, do not send it."
              },
              {
                "kind": "do",
                "body": "Write your three alerts as they will actually appear, then review them a week later and count how many prompted an action. Anything below half needs its threshold changed or should be deleted."
              },
              {
                "kind": "takeaway",
                "body": "If you cannot name the action, do not send the alert."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c3m6",
        "number": 6,
        "title": "Human in the loop",
        "blurb": "2 lessons · 31 minutes. The module that makes the rest defensible.",
        "intro": [],
        "lessons": [
          {
            "id": "c3m6-l1",
            "number": "6.1",
            "title": "Designing a sign-off that is real, not a rubber stamp",
            "sections": [
              {
                "kind": "outcome",
                "body": "Tell the difference between oversight and its appearance, in your own build."
              },
              {
                "kind": "idea",
                "body": "Real sign-off has three properties: the person can see what they are approving, they have a genuine ability to reject, and rejection has somewhere to go. Remove any one and it becomes a rubber stamp. The tell is the approval rate. If nothing is ever rejected, nobody is really reviewing."
              },
              {
                "kind": "do",
                "body": "Look at your approval step and ask what a person would have to do to reject something, and what happens then. If rejecting is harder than approving, people will approve."
              },
              {
                "kind": "redline",
                "body": "Red line 1. Final decisions that require professional judgement, accountability or sign-off. Automation does not move accountability. It only changes how much information the accountable person has when they sign."
              }
            ]
          },
          {
            "id": "c3m6-l2",
            "number": "6.2",
            "title": "What the agent must record about every decision",
            "sections": [
              {
                "kind": "outcome",
                "body": "Specify the log so a year-old decision can be reconstructed."
              },
              {
                "kind": "idea",
                "body": "Six fields cover almost everything: what came in, what the agent extracted or decided, what it matched against, what it was unsure about, who approved and when, and what changed after approval. Written down at design time, this costs nothing. Retrofitted after an incident, it is impossible."
              },
              {
                "kind": "do",
                "body": "Write the six fields for your agent and confirm each is actually captured. Then pick a processed item at random and reconstruct it from the log alone, without opening anything else."
              },
              {
                "kind": "takeaway",
                "body": "If you cannot rebuild the decision from the log, you do not have a log."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c3m7",
        "number": 7,
        "title": "Running it in production",
        "blurb": "2 lessons · 29 minutes. The part every course skips.",
        "intro": [],
        "lessons": [
          {
            "id": "c3m7-l1",
            "number": "7.1",
            "title": "When it breaks: failure modes and safe stopping",
            "sections": [
              {
                "kind": "outcome",
                "body": "Make the agent fail safely rather than quietly."
              },
              {
                "kind": "idea",
                "body": "There are three failure modes. It stops, which is fine and visible. It errors, which is fine if someone is told. Or it keeps going while being wrong, which is the one that costs money. Design so the third becomes the second: volume limits, sanity checks on its own output, and a hard stop when the rate of unusual cases rises."
              },
              {
                "kind": "do",
                "body": "Add three guards: a maximum number of items per run, a check that its own output is within expected ranges, and an automatic stop if exceptions exceed a threshold. Then deliberately break it and confirm you found out."
              },
              {
                "kind": "takeaway",
                "body": "Make it stop loudly. Silence is the expensive failure."
              }
            ]
          },
          {
            "id": "c3m7-l2",
            "number": "7.2",
            "title": "Handover: making it survive you leaving",
            "sections": [
              {
                "kind": "outcome",
                "body": "Document the agent so someone else can own it."
              },
              {
                "kind": "idea",
                "body": "The most common end for an internal automation is that the person who built it moves on and nobody dares touch it. One page prevents this: what it does, what it must never do, who owns it, what to check monthly, how to turn it off, and what breaks if the input format changes."
              },
              {
                "kind": "do",
                "body": "Write that page. Then have a colleague turn the agent off and on using only your page. If they cannot, it is not finished."
              },
              {
                "kind": "takeaway",
                "body": "An agent nobody but you can turn off is a risk, not an asset.\n\nPractical task and final quiz\nPractical task: the agent itself. The learner submits their process map, the agent's instructions, their exception routes and their handover page. This is the capstone of the course and the most substantial artefact in the whole program.\n\nFinal quiz sample. Your invoice agent has run for a month with a 100 percent approval rate. What does that tell you?\n\nA. It is working perfectly\n\nB. The approval step may not be functioning as a control, and should be investigated\n\nC. The threshold is set too low\n\nAnswer: B. It might be perfect. But an approval that never rejects anything is indistinguishable from no approval, and you cannot tell which you have without looking."
              }
            ]
          }
        ],
        "check": null
      }
    ]
  },
  {
    "slug": "ai-governance-risk-compliance",
    "modules": [
      {
        "id": "c4m1",
        "number": 1,
        "title": "What your obligations already say",
        "blurb": "3 lessons · 45 minutes.",
        "intro": [],
        "lessons": [
          {
            "id": "c4m1-l1",
            "number": "1.1",
            "title": "You are already regulated: what applies without new AI law",
            "sections": [
              {
                "kind": "outcome",
                "body": "Explain, without waiting for AI-specific legislation, what already governs your firm's use of these tools."
              },
              {
                "kind": "idea",
                "body": "The most common governance mistake is waiting for a rule that names AI. Your existing obligations already cover it: confidentiality, competence, supervision, record keeping, privacy, and the duty to exercise professional judgement. None of them mention AI, and all of them apply to it. A tool that helps you breach an existing obligation is a problem today, not when a new act commences."
              },
              {
                "kind": "do",
                "body": "List your firm's five most significant existing obligations. For each, write one sentence on how an AI tool could cause a breach. That list is the foundation for everything else in the course, and it is usually the moment the topic stops feeling abstract."
              },
              {
                "kind": "takeaway",
                "body": "Nothing is waiting for AI law. Your obligations already arrived."
              }
            ]
          },
          {
            "id": "c4m1-l2",
            "number": "1.2",
            "title": "Australia's National AI Plan, and what it means for you",
            "sections": [
              {
                "kind": "outcome",
                "body": "Explain the national direction to your board or your team in two minutes, and say what it means practically."
              },
              {
                "kind": "idea",
                "body": "The plan's posture is adoption with appropriate safeguards, rather than restriction. That matters for a firm in two ways. It signals that a blanket ban is out of step with the national direction, and it puts the emphasis on being able to show how you are using AI responsibly. The practical translation is simple: you need a position, and you need evidence for it."
              },
              {
                "kind": "do",
                "body": "Write your firm's one-paragraph position on AI, as you would say it to a client who asked. Not a policy yet, just a position. Most firms discover they do not have one, and that is the useful finding."
              },
              {
                "kind": "australia",
                "body": "Why this matters commercially. Clients are starting to ask their accountants and advisers whether AI touched their work. A firm with a clear position answers confidently, and it becomes a mark of quality. A firm without one either overclaims or goes quiet, and both damage trust."
              }
            ]
          },
          {
            "id": "c4m1-l3",
            "number": "1.3",
            "title": "Where the duty of care actually bites",
            "sections": [
              {
                "kind": "outcome",
                "body": "Identify the specific moments in your firm's work where AI use could become a professional problem."
              },
              {
                "kind": "idea",
                "body": "Duty of care is not breached by using a tool. It is breached at identifiable moments: relying on an output you did not check, sending work you cannot explain, putting confidential information somewhere you should not, or letting a junior use a tool without supervision because nobody said not to. Those are the four moments, and each has a control."
              },
              {
                "kind": "do",
                "body": "Walk one real engagement end to end and mark every point where an AI tool could be used. For each, name who would use it, on what data, and who would check. The gaps in that table are your real risks, and they are usually not where people expect."
              },
              {
                "kind": "redline",
                "body": "Red line 1. Final decisions that require professional judgement, accountability or sign-off, especially where the consequences are material. This is the sentence the rest of the course implements."
              },
              {
                "kind": "note",
                "body": "Knowledge check, end of Module 1. Your firm has no AI policy and a junior uses a public chatbot to summarise a client file. Whose problem is it?\n\nA. The junior's, they should have known\n\nB. The firm's, because supervision and confidentiality obligations sit with the firm regardless of policy\n\nC. Nobody's, there was no rule\n\nAnswer: B. The absence of a policy is itself the finding. \"We had no rule\" is not a defence, it is an aggravating fact."
              }
            ]
          }
        ],
        "check": {
          "prompt": "Your firm has no AI policy and a junior uses a public chatbot to summarise a client file. Whose problem is it?",
          "options": [
            "The junior's, they should have known",
            "The firm's, because supervision and confidentiality obligations sit with the firm regardless of policy",
            "Nobody's, there was no rule"
          ],
          "correctIndex": 1,
          "explanation": "The absence of a policy is itself the finding. \"We had no rule\" is not a defence, it is an aggravating fact."
        }
      },
      {
        "id": "c4m2",
        "number": 2,
        "title": "The board conversation",
        "blurb": "3 lessons · 44 minutes. The most immediately useful module for a senior buyer.",
        "intro": [],
        "lessons": [
          {
            "id": "c4m2-l1",
            "number": "2.1",
            "title": "The five questions a board will ask about AI",
            "sections": [
              {
                "kind": "outcome",
                "body": "Walk into a board meeting knowing precisely what you will be asked."
              },
              {
                "kind": "idea",
                "body": "Boards ask the same five questions, in roughly this order. Are we using it? Where is our client data going? What could go wrong and how would we know? Are we behind our competitors? Who is accountable? Every one has a good answer and a bad answer, and the bad answers are all versions of \"we are looking into it\"."
              },
              {
                "kind": "do",
                "body": "Write your current honest answer to each of the five. Then mark which you could evidence today. The gap between what you would say and what you could show is the work programme for the rest of this course."
              },
              {
                "kind": "takeaway",
                "body": "Five questions. Know them before the meeting, not during it."
              }
            ]
          },
          {
            "id": "c4m2-l2",
            "number": "2.2",
            "title": "Answering them with evidence rather than reassurance",
            "sections": [
              {
                "kind": "outcome",
                "body": "Replace confident-sounding answers with short, checkable ones."
              },
              {
                "kind": "idea",
                "body": "\"We take data security very seriously\" is a non-answer, and experienced directors hear it as one. \"Client data stays in our Microsoft tenant, three tools are approved, two are prohibited, and here is the one-page matrix\" is an answer. The difference is not confidence. It is whether there is an artefact behind the sentence."
              },
              {
                "kind": "do",
                "body": "For each of the five questions, name the single artefact that supports your answer: the approved-tool matrix, the policy, the incident log, the training record. If a question has no artefact, it currently has no answer."
              }
            ]
          },
          {
            "id": "c4m2-l3",
            "number": "2.3",
            "title": "What to put in the board paper, and what to leave out",
            "sections": [
              {
                "kind": "outcome",
                "body": "Write a one-page AI update for a board that gets read and does not create work."
              },
              {
                "kind": "idea",
                "body": "Boards want position, exposure, and decision required. They do not want a technology explainer, and including one signals you have misjudged the audience. One page: where we are, what we have controlled, what we have not yet, and what we want the board to decide or note."
              },
              {
                "kind": "do",
                "body": "Draft that page for your own firm. Then cut it by a third. Whatever survives is the part that mattered."
              },
              {
                "kind": "takeaway",
                "body": "Position, exposure, decision. Never an explainer."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c4m3",
        "number": 3,
        "title": "Tools and data",
        "blurb": "3 lessons · 45 minutes. Where governance becomes concrete.",
        "intro": [],
        "lessons": [
          {
            "id": "c4m3-l1",
            "number": "3.1",
            "title": "Classifying your data before you approve any tool",
            "sections": [
              {
                "kind": "outcome",
                "body": "Sort your firm's information into three or four tiers your team can apply without thinking hard."
              },
              {
                "kind": "idea",
                "body": "Tool approval is impossible without data classification, because the question is never \"is this tool safe\" but \"is this tool appropriate for this information\". Three tiers are usually enough: public, internal, and client confidential, with personal or sensitive information called out separately because it carries its own obligations."
              },
              {
                "kind": "do",
                "body": "Take ten real documents from this week and assign each a tier. Where you hesitate, the definitions need sharpening, and that hesitation is more valuable than a clean first pass."
              },
              {
                "kind": "takeaway",
                "body": "Classify the data first. Tool decisions follow from it."
              }
            ]
          },
          {
            "id": "c4m3-l2",
            "number": "3.2",
            "title": "Approving tools: the questions to ask a vendor",
            "sections": [
              {
                "kind": "outcome",
                "body": "Assess an AI vendor without needing to be technical."
              },
              {
                "kind": "idea",
                "body": "Six questions get you most of the way. Where is our data stored and processed. Is it used to train their models, and can we turn that off. Who at the vendor can access it. How long is it retained and can we delete it. What happens to our data if we leave. Can you tell us if there is a breach, and how quickly. A vendor who cannot answer these plainly has told you something."
              },
              {
                "kind": "do",
                "body": "Send the six questions to a tool your firm already uses. The answers, or the silence, are the lesson."
              }
            ]
          },
          {
            "id": "c4m3-l3",
            "number": "3.3",
            "title": "The approved-use matrix your team can actually follow",
            "sections": [
              {
                "kind": "outcome",
                "body": "Produce a single page that tells everyone which tool may be used on which data."
              },
              {
                "kind": "idea",
                "body": "This is the artefact that does the most work in the whole course. Tools down the side, data tiers across the top, and a yes, no or with-conditions in each cell. It answers the day-to-day question directly, which a policy document does not, and it fits on a wall."
              },
              {
                "kind": "do",
                "body": "Build the matrix for your firm, then test it: ask three colleagues what they would do in three real situations. If they get different answers, a cell is ambiguous."
              },
              {
                "kind": "redline",
                "body": "Red line 3. Handling highly sensitive or confidential financial information in public AI tools without appropriate data controls. The matrix is how that sentence becomes something a team can follow on a Tuesday afternoon."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c4m4",
        "number": 4,
        "title": "Assessing a use case",
        "blurb": "2 lessons · 29 minutes.",
        "intro": [],
        "lessons": [
          {
            "id": "c4m4-l1",
            "number": "4.1",
            "title": "A one-page risk assessment that takes 20 minutes",
            "sections": [
              {
                "kind": "outcome",
                "body": "Assess a proposed AI use before it starts, quickly enough that people actually do it."
              },
              {
                "kind": "idea",
                "body": "A heavy assessment process gets bypassed, and bypassed governance is worse than none because it is invisible. One page, twenty minutes, six questions: what is the use, whose data, what could go wrong, who would notice, who signs off, and how would we stop it. Anything longer will be skipped by the people you most need to reach."
              },
              {
                "kind": "do",
                "body": "Run the assessment on something your firm is already doing with AI, not a hypothetical. Assessing an existing use is more uncomfortable and considerably more useful."
              },
              {
                "kind": "takeaway",
                "body": "Governance people skip is worse than none. Keep it to one page."
              }
            ]
          },
          {
            "id": "c4m4-l2",
            "number": "4.2",
            "title": "Deciding to proceed, proceed with controls, or decline",
            "sections": [
              {
                "kind": "outcome",
                "body": "Make and record a decision that will still look reasonable in two years."
              },
              {
                "kind": "idea",
                "body": "There are only three outcomes, and the middle one is where most cases land. Proceed with controls means naming the controls and who owns them, not writing \"with appropriate safeguards\". Decline needs a reason and a review date, because the answer may change as the tools do."
              },
              {
                "kind": "do",
                "body": "Record your decision on the use case from 4.1 in three lines: the decision, the reasons, the review date. That is the whole record, and it is the thing a regulator or an insurer will ask to see."
              },
              {
                "kind": "redline",
                "body": "Red line 5. Fully automating high-risk decisions involving compliance, tax, audit, credit, investment or regulatory obligations without appropriate human oversight. In assessment terms this is rarely a decline. It is proceed with controls, where the control is a named human."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c4m5",
        "number": 5,
        "title": "The policy",
        "blurb": "2 lessons · 29 minutes. The capstone artefact.",
        "intro": [],
        "lessons": [
          {
            "id": "c4m5-l1",
            "number": "5.1",
            "title": "The one-page AI policy every firm needs",
            "sections": [
              {
                "kind": "outcome",
                "body": "Write a policy your team can read in three minutes and actually follow."
              },
              {
                "kind": "idea",
                "body": "Long policies are written to protect the firm and read by nobody. One page, six sections: what we believe, what is approved, what is prohibited, what always requires a human, what to do if something goes wrong, and who to ask. Prohibitions come with reasons, because a rule people understand survives contact with a deadline."
              },
              {
                "kind": "do",
                "body": "Draft it from the template. The prohibited section writes itself from your five limits, which is why they were taught first."
              }
            ]
          },
          {
            "id": "c4m5-l2",
            "number": "5.2",
            "title": "Making the policy something people follow",
            "sections": [
              {
                "kind": "outcome",
                "body": "Get a policy adopted rather than filed."
              },
              {
                "kind": "idea",
                "body": "Adoption is a separate problem from drafting and it is the one firms lose. Four things move it: someone senior says it out loud, it is short enough to read, it says yes to something rather than only no, and there is an obvious place to ask a question. A policy that only prohibits drives usage underground, which is the outcome you were trying to prevent."
              },
              {
                "kind": "do",
                "body": "Name the person who will introduce it, the meeting where it will be introduced, and the channel for questions. Put a date on all three. Without those, it is a document rather than a change."
              },
              {
                "kind": "takeaway",
                "body": "A policy that only says no gets ignored quietly. Say yes to something."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c4m6",
        "number": 6,
        "title": "When it goes wrong",
        "blurb": "2 lessons · 29 minutes.",
        "intro": [],
        "lessons": [
          {
            "id": "c4m6-l1",
            "number": "6.1",
            "title": "Incident response: the first hour",
            "sections": [
              {
                "kind": "outcome",
                "body": "Know what to do in the first hour after discovering an AI-related problem."
              },
              {
                "kind": "idea",
                "body": "Incidents here have a particular shape. Confidential information was put somewhere it should not have been. An output went to a client and was wrong. A tool was used against policy. The first hour is the same in each case: contain, establish the facts, decide who needs to know, and write it down as you go rather than afterwards."
              },
              {
                "kind": "do",
                "body": "Run a tabletop exercise. \"A junior pasted a client's financials into a public chatbot last Tuesday and has just told you.\" Work through the hour with your team. It takes twenty minutes and changes how seriously the policy is taken."
              }
            ]
          },
          {
            "id": "c4m6-l2",
            "number": "6.2",
            "title": "Telling a client or your board something went wrong",
            "sections": [
              {
                "kind": "outcome",
                "body": "Have the conversation you are dreading, well."
              },
              {
                "kind": "idea",
                "body": "The instinct is to minimise, and it is always the wrong call. What preserves a relationship is speed, specificity and what you have already changed. Clients forgive an error handled openly. They rarely forgive discovering it themselves, and they never forgive being managed."
              },
              {
                "kind": "do",
                "body": "Draft the notification for the scenario from 6.1. Four parts: what happened, what it means for you, what we have done, what we are changing. No adjectives, no self-defence."
              },
              {
                "kind": "takeaway",
                "body": "Fast, specific and already fixed. In that order."
              }
            ]
          }
        ],
        "check": null
      },
      {
        "id": "c4m7",
        "number": 7,
        "title": "Evidence",
        "blurb": "1 lesson · 15 minutes.",
        "intro": [],
        "lessons": [
          {
            "id": "c4m7-l1",
            "number": "7.1",
            "title": "Showing an auditor or regulator how you decided",
            "sections": [
              {
                "kind": "outcome",
                "body": "Assemble, in an afternoon, the file that shows your firm governed this properly."
              },
              {
                "kind": "idea",
                "body": "Nobody expects a firm to have got everything right. What they look for is whether you thought about it, decided deliberately, and can show the decision. Six artefacts do it: the policy, the approved-use matrix, use case assessments, the training record, the incident log, and board minutes noting the position. Each one is produced in this course."
              },
              {
                "kind": "do",
                "body": "Build the folder. Note the date on each artefact and set a review date. A file that has never been reviewed tells its own story."
              },
              {
                "kind": "redline",
                "body": "Red line 4. Situations where there is no clear audit trail or where you cannot explain how the conclusion was reached. At firm level this is the same rule applied to governance itself: if you cannot show how the firm decided, you did not really decide."
              },
              {
                "kind": "takeaway",
                "body": "Six artefacts, dated and reviewed. That is what governed looks like.\n\nPractical task and final quiz\nPractical task: the firm's one-page AI policy plus the approved-use matrix. Two real artefacts the learner walks away with, which is why this course closes the program.\n\nFinal quiz sample. A regulator asks how your firm governs its use of AI. Which is the strongest response?\n\nA. \"We do not use AI for anything client related\"\n\nB. \"We take it very seriously and follow best practice\"\n\nC. \"Here is our policy, our approved-use matrix, our assessments for three use cases, and the board minute noting them\"\n\nAnswer: C. A is rarely true and is easily disproved by asking a junior. B is a non-answer. C is a file."
              }
            ]
          }
        ],
        "check": null
      }
    ]
  },
  {
    "slug": "ai-foundations-for-finance",
    "modules": [
      {
        "id": "m1",
        "number": 1,
        "title": "What this actually is",
        "blurb": "2 lessons · 24 minutes. Clearing away the two things that stop people starting: not knowing what changed, and not knowing which tool they are supposed to be using.",
        "intro": [],
        "lessons": [
          {
            "id": "m1-l1",
            "number": "1.1",
            "title": "Why AI matters for your work",
            "sections": [
              {
                "kind": "outcome",
                "body": "Say precisely which parts of your own work this changes, and which parts it does not, without either overclaiming or dismissing it."
              },
              {
                "kind": "idea",
                "body": "Most explanations of AI for professionals are either breathless or defensive, and neither helps you decide what to do on Monday. The useful version is narrower.\n\nFor most of your career the slow parts of knowledge work were reading and drafting. Reading the fifty page agreement. Writing the first version of the memo. Getting the messy data into a shape you could look at. Those were the bottleneck, and seniority was partly a measure of how fast you could get through them.\n\nThose three things are now fast. Not perfect, but fast. Which means the bottleneck has moved, and it has moved to checking. The constraint on your work is no longer how quickly you can produce a draft, it is how quickly you can satisfy yourself that a draft is right.\n\nThat single relocation explains almost everything else. It explains why the professionals getting value are not the ones with the cleverest prompts, but the ones with the fastest verification habits. It explains why AI helps most on tasks where checking is cheap, like finding a clause you can then go and read, and helps least on tasks where checking is expensive, like a judgement call with no source to check against. And it explains why the rest of this Academy spends so much time on how to check things."
              },
              {
                "kind": "do",
                "body": "Write down three tasks from last week. For each, answer one question: if a competent colleague handed me this finished, how long would it take me to satisfy myself it was right? The tasks with short answers are where you should start. The ones with long answers are where you should be careful."
              },
              {
                "kind": "takeaway",
                "body": "Drafting got cheap. Checking did not. Start where checking is cheap."
              }
            ]
          },
          {
            "id": "m1-l2",
            "number": "1.2",
            "title": "Copilot vs ChatGPT vs OpenAI Enterprise",
            "sections": [
              {
                "kind": "outcome",
                "body": "Work out which tool your firm should be using, and understand why the difference matters more for confidentiality than for capability."
              },
              {
                "kind": "idea",
                "body": "People assume these are competing products that do different things well. Mostly they are not. The underlying capability is similar enough that for the work in this course you would barely notice. What differs, and it differs enormously, is what the tool can see and where your data goes."
              },
              {
                "kind": "note",
                "body": "· What it can see · Where your data goes · Best when\n\n Microsoft 365 Copilot · Your own files, email, Teams and calendar inside your tenant · Stays within your Microsoft tenant, under your existing controls · Your firm already runs Microsoft 365 and the work involves your own documents\n\n ChatGPT or Claude, personal account · Only what you paste into it · Outside your firm entirely · Nothing confidential. Genuinely useful for learning and for public information\n\n ChatGPT Enterprise, or Claude for Work · Only what you give it, plus anything you deliberately connect · Under a commercial agreement, with your data not used for training · You want the strongest general capability with contractual data controls\n\nClaude sits in that table for a reason that matters in this country specifically. Australians are among the heaviest users of Anthropic's tools in the world on a per-person basis, but almost all of that is individual use, on personal accounts, while firms buy Microsoft. So the common situation in an Australian practice is not \"we use Copilot\". It is the firm uses Copilot and several of your colleagues quietly use something else, on their own logins, for work.\n\nThat gap has a name, shadow AI, and it is worth seeing clearly now rather than in Course 4. It is not usually a discipline problem. It happens because someone found a tool that helped and there was no sanctioned way to use it. The fix is a policy that says what is allowed, not a rule that says no, because a rule that says no simply moves the same work somewhere you cannot see it.\n\nThe thing worth understanding is that Copilot's advantage and its risk are the same fact. It can see your files, which is why it is useful without you pasting anything, and it is also why \"it can see your files\" is a sentence your risk committee will want to talk about. Access inside a tenant follows existing permissions, which means Copilot inherits whatever your permissions already were, including the ones nobody has reviewed since 2019.\n\nThe Australian reality. Almost every Australian accounting and finance firm already runs Microsoft 365, and where those firms have adopted AI at all, Copilot is overwhelmingly the tool they have adopted. Not because anyone ran a comparison and picked it, but because the procurement conversation had already happened. That is why Course 1 is built on Copilot. It is not a claim that Copilot is the best tool, it is a recognition of what is actually on your desk.\nOne distinction that catches people out. \"We have Microsoft 365\" and \"we have Copilot\" are not the same statement. The full Copilot that works inside Word, Excel, Outlook and Teams, and that can reach into your own files, is a paid add-on seat on top of your subscription. A firm can be completely on Microsoft 365 with nobody holding one.\n\nMost Microsoft 365 business and enterprise subscriptions do include a Copilot chat you can use at no extra cost, with commercial data protection, meaning what you type is not used to train the model. It is a real tool and it is safe for work material. What it does not do is sit inside your documents and see your files without you supplying them. So the practical difference is not safe versus unsafe, it is whether you paste the document in or whether it is already there.\n\n If your firm has · You can · You cannot\n\n Paid Microsoft 365 Copilot seats · Work inside Word, Excel, Outlook and Teams, grounded in your own files and mail · Assume it respects permissions nobody has reviewed. It inherits them, good and bad\n\n Microsoft 365, Copilot chat only · Do everything in this course, and most of Course 1, by supplying the document yourself · Have it reach into your files unprompted, or work across your mailbox\n\n A personal account, no work subscription · Learn, and work with public information · Put anything confidential in it. This is the line in lesson 2.2\n\nIf you are not sure which of these you are, that is a two minute question for whoever manages your subscription, and it is worth asking before Course 1 rather than during it. Microsoft renames these tiers regularly, so ask by capability, not by product name: can I use Copilot inside Word and Excel on our own documents, or only in the chat window?\n\nResolved. Angela confirmed the client picture: most firms are on Microsoft 365, some hold paid Copilot seats and some do not, and among those that do the feature level varies from basic to enterprise. So this lesson no longer assumes a paid seat, and Course 1 opens by having the learner establish which tier they are on before anything else. Course 1 stays built on Copilot, which is still the right call because it is what is on their desk."
              },
              {
                "kind": "note",
                "body": "Knowledge check, end of Module 1. A colleague pastes a client's draft contract into a personal ChatGPT account to ask what the termination clause means. What is the problem?\n\nA. ChatGPT is not capable enough for legal text\n\nB. Confidential client material has left the firm's control, and it does not matter how good the answer was\n\nC. They should have asked a lawyer\n\nAnswer: B. The capability is not the issue. The tool is the issue, and the same question inside the firm's own Copilot or an enterprise agreement would have been fine."
              }
            ]
          }
        ],
        "check": {
          "prompt": "A colleague pastes a client's draft contract into a personal ChatGPT account to ask what the termination clause means. What is the problem?",
          "options": [
            "ChatGPT is not capable enough for legal text",
            "Confidential client material has left the firm's control, and it does not matter how good the answer was",
            "They should have asked a lawyer"
          ],
          "correctIndex": 1,
          "explanation": "The capability is not the issue. The tool is the issue, and the same question inside the firm's own Copilot or an enterprise agreement would have been fine."
        }
      },
      {
        "id": "m2",
        "number": 2,
        "title": "Using it well",
        "blurb": "2 lessons · 27 minutes. One test that predicts when it will fail, then the five situations where it should not be used at all.",
        "intro": [],
        "lessons": [
          {
            "id": "m2-l1",
            "number": "2.1",
            "title": "What AI is good at, and what to avoid",
            "sections": [
              {
                "kind": "outcome",
                "body": "Predict, before you ask, whether you are likely to get a reliable answer."
              },
              {
                "kind": "idea",
                "body": "There is a long list of strengths and weaknesses you could memorise. There is also one question that predicts most of it:"
              },
              {
                "kind": "note",
                "body": "Am I giving it the source, or asking it to remember?\n\nGiving it the source means the answer is in the material you supplied: find the termination clause in this contract, turn these notes into a table, rewrite this paragraph for a client. These work well, and more importantly, when they fail you can see it, because the source is right there.\n\nAsking it to remember means the answer has to come from somewhere inside the model: what is the current threshold for X, what did that standard say, what is the case law on Y. These fail differently and much worse. Not with an error message, but with a fluent, well-structured, entirely plausible answer that is wrong. It will invent a section number with the same confidence it quotes a real one.\n\nThis is also why the arithmetic question comes up. It is not that these tools cannot calculate, it is that a language model producing a number is remembering what a number looks like rather than computing it. Give it a spreadsheet and ask it to work in the spreadsheet, and you are back in the first category.\n\nDo this\nAsk the same question twice. Once with the document attached, once without. Compare. The version without the source will often look better written, which is precisely the trap.\n\nTakeaway\nSupply the source. When you cannot supply the source, treat the answer as a lead to check, never as a finding."
              }
            ]
          },
          {
            "id": "m2-l2",
            "number": "2.2",
            "title": "Responsible use and professional judgement",
            "sections": [
              {
                "kind": "outcome",
                "body": "Recognise the five situations where AI should not be making the running, and explain to a colleague why."
              },
              {
                "kind": "idea",
                "body": "Everything up to here has been about getting good output. This lesson is about the cases where good output is not the point, because the problem is not accuracy, it is accountability. These five are Empathetic AI's position and they are taught in every course rather than collected at the end of one."
              },
              {
                "kind": "redline",
                "body": "1. Final decisions needing professional judgement. Decisions that require judgement, accountability or sign-off, especially where the consequences are material. The tool can inform the decision. It cannot be the one who made it, because it cannot be the one who answers for it."
              },
              {
                "kind": "redline",
                "body": "2. Acting on output without checking the source. Making decisions purely on AI output without checking the underlying data, assumptions, calculations and sources. This is the one that catches capable people, because the output is well written and reads as though it has already been checked."
              },
              {
                "kind": "redline",
                "body": "3. Sensitive data in public AI tools. Highly sensitive or confidential financial information in public tools without appropriate data controls. Covered in lesson 1.2, and worth repeating because it is the mistake with the fastest consequences."
              },
              {
                "kind": "redline",
                "body": "4. No audit trail, no explanation. Situations where there is no clear audit trail, or where you could not explain how the conclusion was reached. If your only answer to \"how did you get this\" is \"the AI said so\", you do not have a finding, you have a guess in a nice font."
              },
              {
                "kind": "redline",
                "body": "5. Automating high-risk decisions end to end. Fully automating decisions involving compliance, tax, audit, credit, investment or regulatory obligations without human oversight. Automation is fine. Automation with nobody accountable in the loop is not."
              },
              {
                "kind": "note",
                "body": "Notice what these five have in common. Not one of them is about the technology being bad. Every one is about where responsibility sits. That is why they do not change as the tools improve, and it is why they are worth learning now rather than waiting to see how good the next model is."
              },
              {
                "kind": "do",
                "body": "Take the three tasks you wrote down in lesson 1.1. Mark any that touch one of the five. Those are not off limits, but they are the ones where the checking step is not optional.\n\nKnowledge check, end of Module 2. Which of these is closest to a red line?\n\nA. Using AI to draft a client email that you then edit and send\n\nB. Using AI to summarise a public accounting standard so you know where to look\n\nC. Using AI to decide which invoices to approve for payment, automatically\n\nAnswer: C. Red line 5. A and B are ordinary use with a human in the loop. C removes the person who would have been accountable."
              }
            ]
          }
        ],
        "check": {
          "prompt": "Which of these is closest to a red line?",
          "options": [
            "Using AI to draft a client email that you then edit and send",
            "Using AI to summarise a public accounting standard so you know where to look",
            "Using AI to decide which invoices to approve for payment, automatically"
          ],
          "correctIndex": 2,
          "explanation": "Red line 5. A and B are ordinary use with a human in the loop. C removes the person who would have been accountable."
        }
      },
      {
        "id": "m3",
        "number": 3,
        "title": "Doing it yourself",
        "blurb": "2 lessons · 29 minutes. One complete workflow they run on their own material, then an honest account of what this course did not teach them.",
        "intro": [],
        "lessons": [
          {
            "id": "m3-l1",
            "number": "3.1",
            "title": "Your first practical workflow",
            "sections": [
              {
                "kind": "outcome",
                "body": "Get reliable, checkable answers out of a long document in about ten minutes, on your own material, today."
              },
              {
                "kind": "idea",
                "body": "This is the lesson people will tell a colleague about, so it has to work on the first try. We pick document interrogation because it is the highest value thing a beginner can do safely: the source is supplied, so we are on the right side of lesson 2.1, and checking is cheap, so we are on the right side of lesson 1.1.\n\nThe instinct is to ask for a summary. Do not. A summary flattens exactly the exceptions and carve-outs that matter, and you have no way of seeing what it left out. Ask narrow questions instead, one at a time, and make it show you where each answer came from."
              },
              {
                "kind": "do",
                "body": "Take a real document you have to get through. A contract, a policy, a tender, a long report. Attach it and use this:"
              },
              {
                "kind": "prompt",
                "body": "Using only this document, answer each question separately.\nFor each one, quote the exact sentence you relied on and give\nthe page or clause number. If the document does not answer a\nquestion, write NOT ADDRESSED rather than reasoning from\ngeneral knowledge. Do not summarise.\n\n1. [your question]\n2. [your question]\n3. [your question]\n4. [your question]"
              },
              {
                "kind": "note",
                "body": "The four questions should be the four you would otherwise have had to find by hand. That is the whole trick: you are not asking it to understand the document, you are asking it to find things in it."
              },
              {
                "kind": "check",
                "body": "Open the document at each quoted page number and read the sentence. This takes two minutes and it is not optional. It catches the failure that matters most here, which is a real sentence attached to the wrong location, or a quoted line that has been subtly tidied up.\n\nDo this on three documents and you will have a calibrated sense of how much to trust it, which is worth more than any amount of being told."
              },
              {
                "kind": "redline",
                "body": "Red line 2, in practice. The NOT ADDRESSED instruction is doing real work. Without it, a question the document does not answer gets answered anyway, from general knowledge, in the same confident voice as the ones it found. That is the single most likely way this goes wrong for you."
              },
              {
                "kind": "takeaway",
                "body": "Narrow questions, quoted sources, and you open the document yourself. Never a summary you cannot audit."
              }
            ]
          },
          {
            "id": "m3-l2",
            "number": "3.2",
            "title": "Where to go next",
            "sections": [
              {
                "kind": "outcome",
                "body": "Decide what to learn next based on your own situation, including deciding that you have enough for now."
              },
              {
                "kind": "idea",
                "body": "This lesson is written as a diagnostic, not a pitch, and I would keep it that way even though it is the conversion lesson. Someone who has just spent eighty minutes with us can tell the difference immediately, and the version that respects them converts better anyway.\n\nStart with what this course deliberately did not cover, said plainly:\n\n• How to get the same answer reliably, rather than a good answer once.\n\n• How to do this at volume, on twenty documents rather than one.\n\n• How to work inside your own files and email rather than uploading things.\n\n• What to do when you want a process to run without you.\n\n• How to put a policy around any of this so a firm can use it rather than an individual.\n\nThen the routing, which is genuinely about their situation:\n\n If you are... · Go to · Because\n\n Sitting in a Microsoft 365 firm, wanting to speed up your actual job · Course 1, Copilot for Finance · Built on the tool already on your desk, around five real finance jobs\n\n Finding the answers good but inconsistent, and wanting to defend them · Course 2, Prompting · This is the verification skill from lesson 1.1, taught properly\n\n Doing the same task repeatedly and wondering if it could run itself · Course 3, AI Agents · What should run without you, and what must not\n\n Responsible for other people using this · Course 4, Governance · The policy, the register and the evidence trail\n\n Wanting to be taught it live, with your own work in front of you · The live workshop · Half a day, hands on, with Tristan\n\nAnd an honest fifth option: if what you needed was to stop feeling behind, you have that now, and you can leave. People who are told they can leave come back."
              },
              {
                "kind": "takeaway",
                "body": "You can now get checkable answers out of a long document. The next question is whether you need that to be reliable, repeatable, or governed."
              }
            ]
          }
        ],
        "check": null
      }
    ]
  }
];
