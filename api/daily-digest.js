// Daily summary email of new free-course sign-ups (and new enquiries), sent
// once a day by a Vercel Cron job. Enquiries still arrive instantly via the
// inquiries trigger; this is the low-noise daily recap the client asked for.
//
// Auth: Vercel Cron sends `Authorization: Bearer <CRON_SECRET>` when CRON_SECRET
// is set. We also allow manual runs with ?key=<LEADS_KEY> for testing. If there
// is nothing new, no email is sent (unless ?force=1).
import { supabaseAdmin } from "./_lib/supabaseAdmin.js";
import { COURSES, BUNDLE } from "./_lib/catalog.js";
import { sendDailyDigest } from "./_lib/email.js";

function courseTitle(slug) {
  if (!slug) return "";
  if (slug === "bundle") return BUNDLE.title;
  return (COURSES[slug] && COURSES[slug].title) || slug;
}

export default async function handler(req, res) {
  // Authorise: either the Vercel cron bearer secret, or the leads key for a
  // manual run.
  const cronSecret = process.env.CRON_SECRET;
  const auth = req.headers["authorization"] || "";
  const key = (req.query && (req.query.key || req.query.k)) || "";
  const cronOk = cronSecret && auth === `Bearer ${cronSecret}`;
  const keyOk = process.env.LEADS_KEY && key === process.env.LEADS_KEY;
  if (!cronOk && !keyOk) {
    res.status(401).json({ ok: false, error: "unauthorized" });
    return;
  }

  const hours = 24;
  const since = new Date(Date.now() - hours * 3600 * 1000).toISOString();
  const force = req.query && (req.query.force === "1" || req.query.force === "true");

  try {
    const sb = supabaseAdmin();
    const [en, iq] = await Promise.all([
      sb
        .from("enrollments")
        .select("first_name,email,course_slug,created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false }),
      sb
        .from("inquiries")
        .select("name,email,company,created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false }),
    ]);

    const signups = (en.data || []).map((r) => ({
      ...r,
      courseTitle: courseTitle(r.course_slug),
    }));
    const inquiries = iq.data || [];

    if (!signups.length && !inquiries.length && !force) {
      res.status(200).json({ ok: true, sent: false, reason: "nothing new" });
      return;
    }

    const leadsUrl = `${
      process.env.SITE_URL || "https://eai-academy.vercel.app"
    }/api/leads`;
    const result = await sendDailyDigest({
      signups,
      inquiries,
      sinceLabel: `last ${hours} hours`,
      leadsUrl,
    });

    res.status(200).json({
      ok: true,
      sent: true,
      signups: signups.length,
      inquiries: inquiries.length,
      email: result && result.ok ? "sent" : result,
    });
  } catch (err) {
    console.error("daily-digest error", err && err.message);
    res.status(200).json({ ok: false, error: (err && err.message) || "failed" });
  }
}
