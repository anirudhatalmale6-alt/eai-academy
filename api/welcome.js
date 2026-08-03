// POST /api/welcome
// Body: { email, firstName?, courseTitle?, courseSlug? }
// Sends the free-course welcome email. Called by the free signup form after the
// enrollment is recorded. Best-effort: never hard-fails the signup UX.
import { sendWelcomeEmail } from "./_lib/email.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { email, firstName, courseTitle, courseSlug } = body;
    if (!email || !String(email).includes("@")) {
      return res.status(400).json({ error: "invalid email" });
    }
    const r = await sendWelcomeEmail({
      to: String(email),
      firstName,
      courseTitle,
      courseSlug,
    });
    return res.status(200).json({ ok: !!r.ok });
  } catch (err) {
    console.error("welcome error", err && err.message);
    return res.status(200).json({ ok: false });
  }
}
