#!/usr/bin/env python3
"""Turn the course drafts into Academy lesson content.

The drafts in ../course-drafts are the source of truth: they are what Angela
reviewed and signed off. Re-typing 69 lessons into TypeScript by hand would
guarantee drift the first time a draft changes, so this parses them instead.

Run:  python3 scripts/import-drafts.py
Out:  src/data/course-content.generated.ts

The parser is deliberately strict. If a draft's shape changes in a way it does
not recognise it raises, rather than silently emitting a course with missing
lessons, which is the failure that would actually reach a paying learner.
"""

import html
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DRAFTS = os.path.normpath(os.path.join(HERE, "..", "..", "course-drafts"))
OUT = os.path.normpath(os.path.join(HERE, "..", "src", "data", "course-content.generated.ts"))

# Which draft file holds which course, and where each course starts in files
# that carry more than one. courses-2-3-4.html holds three.
SOURCES = [
    {
        "slug": "microsoft-365-copilot-for-finance",
        "file": "copilot-for-finance.html",
        "prefix": "m",
    },
    {
        "slug": "prompting-for-auditable-answers",
        "file": "courses-2-3-4.html",
        "prefix": "c2m",
    },
    {
        "slug": "automating-finance-workflows",
        "file": "courses-2-3-4.html",
        "prefix": "c3m",
    },
    {
        "slug": "ai-governance-risk-compliance",
        "file": "courses-2-3-4.html",
        "prefix": "c4m",
    },
    {
        "slug": "ai-foundations-for-finance",
        "file": "foundations.html",
        "prefix": "m",
    },
]

# The eyebrow headings the drafts use, mapped to the section kinds the player
# renders. Anything unrecognised is kept as a plain note rather than dropped.
KIND_LABEL = {
    "outcome": "What you will be able to do",
    "idea": "The idea",
    "do": "Do this",
    "check": "Check this",
    "watch": "Watch out",
    "takeaway": "Takeaway",
}

KIND_BY_EYEBROW = {
    "what you will be able to do": "outcome",
    "the idea": "idea",
    "do this": "do",
    "check this": "check",
    "watch out": "watch",
    "takeaway": "takeaway",
}


def text_of(fragment: str) -> str:
    """HTML fragment to readable plain text, preserving inline emphasis markers."""
    s = fragment
    s = re.sub(r"<br\s*/?>", "\n", s, flags=re.I)
    s = re.sub(r"</p>", "\n\n", s, flags=re.I)
    s = re.sub(r"</li>", "\n", s, flags=re.I)
    s = re.sub(r"<li[^>]*>", "• ", s, flags=re.I)
    # Tables carry real teaching content (the Copilot licence tiers, the tool
    # comparison). Stripping the tags without separators runs every cell
    # together into one unreadable sentence, so keep the row and cell breaks.
    s = re.sub(r"</t[dh]>\s*(?=<t[dh])", " · ", s, flags=re.I)
    s = re.sub(r"</tr>", "\n", s, flags=re.I)
    s = re.sub(r"<tr[^>]*>", "", s, flags=re.I)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s)
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def parse_quiz(fragment: str):
    """A .quiz div into a question. The correct option is the one in bold and
    the explanation lives in <p class="a">. Returns None if it does not match,
    because a mis-parsed quiz is worse than no quiz."""
    paras = re.findall(r"<p[^>]*>(.*?)</p>", fragment, re.S)
    if len(paras) < 3:
        return None

    prompt = text_of(paras[0])
    prompt = re.sub(r"^(Knowledge check[^.]*\.|Q\d+\.)\s*", "", prompt).strip()

    option_html = paras[1]
    options, correct = [], -1
    for raw in re.split(r"<br\s*/?>", option_html, flags=re.I):
        raw = raw.strip()
        if not raw:
            continue
        is_correct = "<b>" in raw.lower()
        label = text_of(raw)
        label = re.sub(r"^[A-D]\.\s*", "", label).strip()
        if not label:
            continue
        if is_correct:
            correct = len(options)
        options.append(label)

    explanation = text_of(paras[2])
    explanation = re.sub(r"^Answer:\s*[A-D]\.\s*", "", explanation).strip()

    if correct < 0 or len(options) < 2:
        return None
    return {"prompt": prompt, "options": options, "correctIndex": correct,
            "explanation": explanation}


def parse_lesson(fragment: str, module_id: str, index: int):
    m = re.search(r"<h4>(.*?)</h4>", fragment, re.S)
    if not m:
        return None
    heading = text_of(m.group(1))
    num = re.match(r"^(\d+\.\d+)\s+(.*)$", heading)
    number, title = (num.group(1), num.group(2)) if num else ("", heading)

    body = fragment[m.end():]
    sections = []

    # Walk the body in document order so prompts and callouts stay attached to
    # the heading they belong under, rather than being collected separately.
    token = re.compile(
        r'<span class="eyebrow">(?P<eyebrow>.*?)</span>'
        r'|<div class="prompt">(?P<prompt>.*?)</div>'
        r'|<div class="red">(?P<red>.*?)</div>'
        r'|<div class="au">(?P<au>.*?)</div>'
        r'|<div class="done">(?P<done>.*?)</div>'
        r'|<div class="input">(?P<inp>.*?)</div>'
        r'|<div class="card"[^>]*>(?P<card>.*?)</div>\s*(?=<span|<div|$)',
        re.S,
    )
    pos, pending = 0, None
    for t in token.finditer(body):
        between = text_of(body[pos:t.start()])
        if between and pending:
            sections.append({"kind": pending, "body": between})
            pending = None
        elif between:
            sections.append({"kind": "note", "body": between})
        pos = t.end()

        if t.group("eyebrow") is not None:
            pending = KIND_BY_EYEBROW.get(text_of(t.group("eyebrow")).lower(), "note")
        elif t.group("prompt") is not None:
            # A prompt often follows its eyebrow directly with no prose in
            # between. Carry the pending heading onto the prompt, otherwise
            # "Do this" drifts down and labels the paragraph after it.
            block = {"kind": "prompt", "body": text_of(t.group("prompt"))}
            if pending:
                block["label"] = KIND_LABEL.get(pending, "")
                pending = None
            sections.append(block)
        elif t.group("red") is not None:
            sections.append({"kind": "redline", "body": text_of(t.group("red"))})
        elif t.group("au") is not None:
            sections.append({"kind": "australia", "body": text_of(t.group("au"))})
        elif t.group("card") is not None:
            sections.append({"kind": "note", "body": text_of(t.group("card"))})
        # .done and .input are notes to Angela about the draft itself. They are
        # deliberately dropped: a learner must never see production scaffolding.

    tail = text_of(body[pos:])
    if tail and pending:
        sections.append({"kind": pending, "body": tail})
    elif tail:
        sections.append({"kind": "note", "body": tail})

    sections = [s for s in sections if s["body"]]
    if not sections:
        return None

    return {
        "id": f"{module_id}-l{index}",
        "number": number,
        "title": title,
        "sections": sections,
    }


def parse_course(spec):
    path = os.path.join(DRAFTS, spec["file"])
    with open(path, encoding="utf-8") as fh:
        doc = fh.read()

    # Discover the modules instead of hardcoding a count. Guessing how many a
    # course has is how lessons go missing quietly.
    module_ids = re.findall(
        r'<div class="mod" id="(' + re.escape(spec["prefix"]) + r'\d+)"', doc)
    if not module_ids:
        raise SystemExit(f"{spec['slug']}: no modules matched prefix {spec['prefix']!r}")

    modules = []
    for mi, module_id in enumerate(module_ids):
        start = doc.find(f'<div class="mod" id="{module_id}"')
        if start < 0:
            raise SystemExit(f"{spec['slug']}: module {module_id} not found in {spec['file']}")

        # Runs until the next module in this course, or the next module of any
        # course in a shared file, whichever comes first.
        nxt = doc.find('<div class="mod"', start + 10)
        end = nxt if nxt > 0 else len(doc)
        block = doc[start:end]

        head = re.search(r"<h3>(.*?)</h3>", block, re.S)
        blurb = re.search(r"</h3>\s*<p>(.*?)</p>", block, re.S)
        title = text_of(head.group(1)) if head else module_id
        title = re.sub(r"^Module\s+\d+\s*[··]\s*", "", title)

        # Content between the module header and the first lesson belongs to the
        # module, not to any one lesson. Course 1's licence check panel lives
        # here, and lesson 1.1 refers to it by name, so dropping it leaves the
        # lesson pointing at something the learner cannot see.
        first_lesson = block.find('<div class="lesson">')
        intro_zone = block[:first_lesson] if first_lesson > 0 else ""
        intro = []
        for cm in re.finditer(r'<div class="card"[^>]*>(.*?)</div>\s*(?=<div|<h2|\Z)',
                              intro_zone, re.S):
            body = text_of(cm.group(1))
            if body:
                intro.append(body)

        lessons = []
        for li, lm in enumerate(re.finditer(
                r'<div class="lesson">(.*?)(?=<div class="lesson">|<div class="mod"|<h2|\Z)',
                block, re.S), start=1):
            lesson = parse_lesson(lm.group(1), module_id, li)
            if lesson:
                lessons.append(lesson)

        # Module knowledge checks only. Some modules also carry a block headed
        # "Final quiz sample", which is a preview of the assessment written for
        # Angela's benefit. Importing one as an end-of-module check shows the
        # learner an exam question early and, in Course 1, showed the identical
        # question twice.
        check = None
        for qm in re.finditer(r'<div class="quiz">(.*?)</div>\s*(?:</div>)?', block, re.S):
            if re.search(r"final quiz", qm.group(1)[:200], re.I):
                continue
            check = parse_quiz(qm.group(1))
            if check:
                break

        if not lessons:
            raise SystemExit(f"{spec['slug']}/{module_id}: no lessons parsed")

        modules.append({
            "id": module_id,
            "number": mi + 1,
            "title": title,
            "blurb": text_of(blurb.group(1)) if blurb else "",
            "intro": intro,
            "lessons": lessons,
            "check": check,
        })

    return {"slug": spec["slug"], "modules": modules}


def main():
    courses = [parse_course(s) for s in SOURCES]

    # A draft file's lessons must all land somewhere. Without this, a module id
    # that stops matching silently drops a chunk of a paid course.
    for filename in sorted({s["file"] for s in SOURCES}):
        with open(os.path.join(DRAFTS, filename), encoding="utf-8") as fh:
            in_file = fh.read().count('class="lesson"')
        slugs = {s["slug"] for s in SOURCES if s["file"] == filename}
        parsed = sum(len(m["lessons"]) for c in courses if c["slug"] in slugs
                     for m in c["modules"])
        if parsed != in_file:
            raise SystemExit(
                f"{filename}: {in_file} lessons in the draft but {parsed} parsed. "
                "Refusing to write a short course.")

    total_lessons = sum(len(m["lessons"]) for c in courses for m in c["modules"])
    total_checks = sum(1 for c in courses for m in c["modules"] if m["check"])
    for c in courses:
        n = sum(len(m["lessons"]) for m in c["modules"])
        print(f"  {c['slug']:38s} {len(c['modules'])} modules  {n:3d} lessons")
    print(f"  {'TOTAL':38s} {total_lessons} lessons, {total_checks} knowledge checks")

    banner = (
        "// GENERATED FILE. Do not edit by hand.\n"
        "// Produced by scripts/import-drafts.py from ../course-drafts, which are the\n"
        "// drafts Angela reviewed. To change a lesson, change the draft and re-run\n"
        "// the importer, so the reviewed copy and the shipped copy cannot drift.\n\n"
        "import type { CourseContent } from \"./content-types\";\n\n"
        "export const COURSE_CONTENT: CourseContent[] = "
    )
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(banner + json.dumps(courses, indent=2, ensure_ascii=False) + ";\n")
    print(f"  wrote {OUT}")


if __name__ == "__main__":
    sys.exit(main())
