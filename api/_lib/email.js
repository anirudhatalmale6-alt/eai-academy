// Transactional email via the Resend REST API (no SDK dependency).
// Every send is best-effort: failures are logged and returned, never thrown,
// so an email problem can never break a signup or a payment webhook.
// Copy approved by the client (welcome + receipt), human voice, no em dashes.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const fromAddress = () =>
  process.env.EMAIL_FROM || "Empathetic AI Academy <hello@empathetic-ai.com>";
const replyToAddress = () =>
  process.env.EMAIL_REPLY_TO || "hello@empathetic-ai.com";
const siteUrl = () => process.env.SITE_URL || "https://academy.empathetic-ai.com";

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function audLabel(cents, currency) {
  if (cents == null) return "";
  const n = (Number(cents) / 100).toLocaleString("en-AU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const cur = (currency || "aud").toUpperCase();
  return cur === "AUD" ? `A$${n}` : `${n} ${cur}`;
}

function layout(inner, preheader) {
  const logo = `${siteUrl()}/email-logo.png`;
  return `<!doctype html><html><body style="margin:0;background:#f5f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1b1b26;">
<span style="display:none;opacity:0;visibility:hidden;height:0;width:0;overflow:hidden">${esc(preheader || "")}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6f8;padding:28px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e6e7eb;border-radius:14px;overflow:hidden">
<tr><td style="padding:20px 30px;border-bottom:1px solid #eef0f3">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="vertical-align:middle"><img src="${logo}" width="34" height="34" alt="Empathetic AI" style="display:block;border:0;outline:none"></td>
<td style="vertical-align:middle;padding-left:10px"><span style="font-size:18px;font-weight:700;color:#0f172a;letter-spacing:-0.2px">Empathetic AI</span></td>
</tr></table>
</td></tr>
<tr><td style="padding:28px 30px 32px">${inner}</td></tr>
<tr><td style="padding:18px 30px;border-top:1px solid #eef0f3;color:#8a90a2;font-size:12px;line-height:1.6">
Empathetic AI, an OpenAI Select Partner building production AI for finance and business.<br>
You are receiving this because you signed up at Empathetic AI Academy.
</td></tr>
</table></td></tr></table></body></html>`;
}

function button(label, url) {
  return `<a href="${esc(url)}" style="display:inline-block;background:#2563EB;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:10px">${esc(label)}</a>`;
}

export function welcomeEmailHtml({ firstName, courseTitle, courseUrl }) {
  const name = esc(firstName || "there");
  const ct = esc(courseTitle || "AI Foundations for Finance");
  const inner = `
<p style="font-size:15px;margin:0 0 14px">Hi ${name},</p>
<p style="font-size:15px;line-height:1.65;margin:0 0 14px">Thanks for joining the Empathetic AI Academy. Your free course, ${ct}, is ready whenever you are.</p>
<p style="font-size:15px;line-height:1.65;margin:0 0 20px">It is a handful of short lessons built for tax, accounting and finance professionals. No jargon, just what actually helps in your work.</p>
<p style="margin:0 0 22px">${button("Start the free course", courseUrl)}</p>
<p style="font-size:14px;line-height:1.65;color:#4b5563;margin:0 0 14px">We are Empathetic AI, an OpenAI Select Partner that builds production AI for finance and business. The Academy is how we share what we have learned, in practical form.</p>
<p style="font-size:14px;line-height:1.65;color:#4b5563;margin:0 0 6px">If you have a question, just reply to this email, it comes straight to us.</p>
<p style="font-size:15px;margin:16px 0 0">See you inside,<br>The Empathetic AI team</p>`;
  return layout(inner, "Your free course is ready.");
}

export function receiptEmailHtml({
  firstName,
  courseTitle,
  amountLabel,
  orderRef,
  myCoursesUrl,
}) {
  const name = esc(firstName || "there");
  const ct = esc(courseTitle || "your course");
  const inner = `
<p style="font-size:15px;margin:0 0 14px">Hi ${name},</p>
<p style="font-size:15px;line-height:1.65;margin:0 0 14px">Thanks for your purchase, and welcome to the Academy. You now have full access to ${ct}.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #eef0f3;border-radius:10px;margin:0 0 20px">
<tr><td style="padding:14px 16px;font-size:14px;color:#4b5563;line-height:1.75">
<b style="color:#0f172a">Order summary</b><br>
${ct}${amountLabel ? ` &nbsp;&middot;&nbsp; ${esc(amountLabel)}` : ""}${orderRef ? `<br>Order reference: ${esc(orderRef)}` : ""}
</td></tr></table>
<p style="font-size:15px;line-height:1.65;margin:0 0 20px">To start, sign in with this email address and open My Courses.</p>
<p style="margin:0 0 22px">${button("Go to My Courses", myCoursesUrl)}</p>
<p style="font-size:14px;line-height:1.65;color:#4b5563;margin:0 0 6px">Your access does not expire, and a certificate is waiting for you when you finish the course.</p>
<p style="font-size:14px;line-height:1.65;color:#4b5563;margin:0 0 0">Need anything at all? Just reply to this email.</p>
<p style="font-size:15px;margin:16px 0 0">Thanks,<br>The Empathetic AI team</p>`;
  return layout(inner, "You're enrolled.");
}

export async function sendEmail({ to, subject, html, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("email skipped: RESEND_API_KEY not set");
    return { ok: false, skipped: true };
  }
  if (!to || !String(to).includes("@")) return { ok: false, error: "no recipient" };
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: [String(to)],
        reply_to: replyTo || replyToAddress(),
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      console.error("resend send failed", res.status, t.slice(0, 300));
      return { ok: false, error: `resend ${res.status}` };
    }
    const data = await res.json().catch(() => ({}));
    return { ok: true, id: data && data.id };
  } catch (err) {
    console.error("resend send error", err && err.message);
    return { ok: false, error: err && err.message };
  }
}

export async function sendWelcomeEmail({ to, firstName, courseTitle, courseSlug }) {
  const courseUrl = `${siteUrl()}/#/course/${encodeURIComponent(
    courseSlug || "ai-foundations-for-finance",
  )}`;
  return sendEmail({
    to,
    subject: "Welcome to Empathetic AI Academy, your free course is ready",
    html: welcomeEmailHtml({ firstName, courseTitle, courseUrl }),
  });
}

// Friendly label for where an enquiry came from.
function sourceLabel(source) {
  const map = {
    "team-pricing": "Team pricing enquiry",
    "advisory": "Enterprise AI Advisory enquiry",
    "enterprise-advisory": "Enterprise AI Advisory enquiry",
    "ai-product": "Product demo request",
    "demo": "Demo request",
    "demo-form": "Contact form (main site)",
    "main-site-demo": "Contact form (main site)",
    "contact": "Contact form (main site)",
    "main-site": "Contact form (main site)",
  };
  return map[String(source || "").toLowerCase()] || "New enquiry";
}

// Internal alert to the team when a visitor submits an enquiry form (main site
// contact / demo, Academy team pricing, Enterprise Advisory). Sent to the fixed
// admin inbox only; reply-to is the enquirer so a reply goes straight to them.
export function inquiryEmailHtml({ name, email, company, phone, message, source }) {
  const label = sourceLabel(source);
  const row = (k, v) =>
    v
      ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:120px;vertical-align:top">${esc(
          k,
        )}</td><td style="padding:6px 0;color:#0f172a;font-size:14px">${esc(v)}</td></tr>`
      : "";
  const inner = `
<div style="display:inline-block;background:#eef2ff;color:#3730a3;font-size:12px;font-weight:700;padding:4px 10px;border-radius:999px;margin-bottom:14px">${esc(
    label,
  )}</div>
<p style="font-size:15px;line-height:1.6;margin:0 0 16px">You have a new enquiry from the website.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #eef0f3;border-radius:10px;margin:0 0 18px">
<tr><td style="padding:14px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Name", name)}
${row("Email", email)}
${row("Company", company)}
${row("Phone", phone)}
</table>
</td></tr></table>
${
  message
    ? `<p style="font-size:13px;color:#6b7280;margin:0 0 6px">Message</p>
<div style="font-size:14px;line-height:1.65;color:#0f172a;white-space:pre-wrap;background:#ffffff;border:1px solid #eef0f3;border-radius:10px;padding:14px 16px">${esc(
        message,
      )}</div>`
    : ""
}
<p style="font-size:13px;line-height:1.6;color:#8a90a2;margin:18px 0 0">Reply to this email to respond directly to ${esc(
    name || "the enquirer",
  )}.</p>`;
  return layout(inner, `${label}: ${name || email || "new lead"}`);
}

export async function sendInquiryNotification({
  name,
  email,
  company,
  phone,
  message,
  source,
}) {
  const to = process.env.EMAIL_ADMIN || "service@empathetic-ai.com";
  const label = sourceLabel(source);
  const who = [name, company].filter(Boolean).join(", ");
  return sendEmail({
    to,
    subject: `${label}${who ? ` — ${who}` : ""}`,
    html: inquiryEmailHtml({ name, email, company, phone, message, source }),
    replyTo: email && String(email).includes("@") ? String(email) : undefined,
  });
}

// Internal alert to the team when someone signs up for a free course, so the
// email lands with the team (not just in the database). Fixed admin recipient.
export function signupEmailHtml({ firstName, email, courseTitle }) {
  const ct = esc(courseTitle || "a free course");
  const inner = `
<div style="display:inline-block;background:#ecfdf5;color:#065f46;font-size:12px;font-weight:700;padding:4px 10px;border-radius:999px;margin-bottom:14px">New free-course sign-up</div>
<p style="font-size:15px;line-height:1.6;margin:0 0 16px">A new learner just signed up for a free course.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #eef0f3;border-radius:10px;margin:0 0 18px">
<tr><td style="padding:14px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:120px">Name</td><td style="padding:6px 0;color:#0f172a;font-size:14px">${esc(
    firstName || "-",
  )}</td></tr>
<tr><td style="padding:6px 0;color:#6b7280;font-size:13px">Email</td><td style="padding:6px 0;color:#0f172a;font-size:14px">${esc(
    email || "-",
  )}</td></tr>
<tr><td style="padding:6px 0;color:#6b7280;font-size:13px">Course</td><td style="padding:6px 0;color:#0f172a;font-size:14px">${ct}</td></tr>
</table>
</td></tr></table>
<p style="font-size:13px;line-height:1.6;color:#8a90a2;margin:0">Reply to this email to reach ${esc(
    firstName || "them",
  )} directly.</p>`;
  return layout(inner, `New sign-up: ${firstName || email || "new learner"}`);
}

export async function sendSignupNotification({ firstName, email, courseTitle }) {
  const to = process.env.EMAIL_ADMIN || "service@empathetic-ai.com";
  return sendEmail({
    to,
    subject: `New free-course sign-up${firstName ? ` — ${firstName}` : ""}${
      email ? ` (${email})` : ""
    }`,
    html: signupEmailHtml({ firstName, email, courseTitle }),
    replyTo: email && String(email).includes("@") ? String(email) : undefined,
  });
}

// Once-a-day summary of new free-course sign-ups (and any new enquiries), so
// the inbox stays quiet but nothing is missed. Sent to the fixed admin inbox.
export function dailyDigestHtml({ signups = [], inquiries = [], sinceLabel, leadsUrl }) {
  const sRows = signups
    .map(
      (r) =>
        `<tr><td style="padding:8px 10px;border-top:1px solid #eef0f3;font-size:14px;color:#0f172a">${esc(
          r.first_name || "-",
        )}</td><td style="padding:8px 10px;border-top:1px solid #eef0f3;font-size:14px"><a href="mailto:${esc(
          r.email,
        )}" style="color:#2563EB;text-decoration:none">${esc(
          r.email,
        )}</a></td><td style="padding:8px 10px;border-top:1px solid #eef0f3;font-size:14px;color:#0f172a">${esc(
          r.courseTitle || r.course_slug || "-",
        )}</td></tr>`,
    )
    .join("");
  const iRows = inquiries
    .map(
      (r) =>
        `<tr><td style="padding:8px 10px;border-top:1px solid #eef0f3;font-size:14px;color:#0f172a">${esc(
          r.name || "-",
        )}</td><td style="padding:8px 10px;border-top:1px solid #eef0f3;font-size:14px"><a href="mailto:${esc(
          r.email,
        )}" style="color:#2563EB;text-decoration:none">${esc(
          r.email,
        )}</a></td><td style="padding:8px 10px;border-top:1px solid #eef0f3;font-size:14px;color:#0f172a">${esc(
          r.company || "-",
        )}</td></tr>`,
    )
    .join("");
  const section = (title, count, headers, rows, emptyText) => `
<p style="font-size:15px;font-weight:700;color:#0f172a;margin:22px 0 8px">${esc(
    title,
  )} <span style="color:#8a90a2;font-weight:400">(${count})</span></p>
${
  count
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef0f3;border-radius:10px;border-collapse:separate;overflow:hidden">
<tr>${headers
        .map(
          (h) =>
            `<th style="background:#0f172a;color:#fff;text-align:left;padding:8px 10px;font-size:12px;font-weight:600">${esc(
              h,
            )}</th>`,
        )
        .join("")}</tr>${rows}</table>`
    : `<p style="font-size:14px;color:#8a90a2;margin:0">${esc(emptyText)}</p>`
}`;
  const inner = `
<p style="font-size:15px;line-height:1.6;margin:0 0 4px">Here is your daily summary${
    sinceLabel ? ` (${esc(sinceLabel)})` : ""
  }.</p>
${section(
  "New free-course sign-ups",
  signups.length,
  ["Name", "Email", "Course"],
  sRows,
  "No new sign-ups today.",
)}
${section(
  "New enquiries",
  inquiries.length,
  ["Name", "Email", "Company"],
  iRows,
  "No new enquiries today.",
)}
<p style="margin:24px 0 0">${button("Open your Leads page", leadsUrl || siteUrl())}</p>
<p style="font-size:12px;line-height:1.6;color:#8a90a2;margin:14px 0 0">Enquiries also arrive instantly as they come in. This summary is once a day.</p>`;
  return layout(inner, `Daily summary: ${signups.length} sign-ups, ${inquiries.length} enquiries`);
}

export async function sendDailyDigest({ signups, inquiries, sinceLabel, leadsUrl }) {
  const to = process.env.EMAIL_ADMIN || "service@empathetic-ai.com";
  const nS = (signups || []).length;
  const nI = (inquiries || []).length;
  return sendEmail({
    to,
    subject: `Daily summary — ${nS} new sign-up${nS === 1 ? "" : "s"}, ${nI} new enquir${
      nI === 1 ? "y" : "ies"
    }`,
    html: dailyDigestHtml({ signups, inquiries, sinceLabel, leadsUrl }),
  });
}

export async function sendReceiptEmail({
  to,
  firstName,
  courseTitle,
  amountLabel,
  orderRef,
}) {
  const myCoursesUrl = `${siteUrl()}/#/login`;
  return sendEmail({
    to,
    subject: `You're enrolled, ${courseTitle || "your course"}`,
    html: receiptEmailHtml({ firstName, courseTitle, amountLabel, orderRef, myCoursesUrl }),
  });
}
