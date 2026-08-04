// Enquiry alert endpoint. Called server-side by a Supabase database trigger
// (pg_net) whenever a row is inserted into the `inquiries` table, from either
// the main site contact form or the Academy enquiry forms. It emails the team
// an alert. It never emails an address supplied by the request: the recipient
// is fixed by EMAIL_ADMIN, so this endpoint cannot be abused to send mail to
// third parties. Always returns 200 so the database trigger never retries.

import { sendInquiryNotification } from "./_lib/email.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method not allowed" });
    return;
  }

  // Shared secret so only our Supabase trigger can call this.
  const expected = process.env.NOTIFY_SECRET;
  const got = req.headers["x-notify-secret"];
  if (expected && got !== expected) {
    res.status(401).json({ ok: false, error: "unauthorized" });
    return;
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    // Supabase webhook shape is { type, table, record }. Also accept a bare row.
    const record = (body && body.record) || body || {};
    await sendInquiryNotification({
      name: record.name,
      email: record.email,
      company: record.company,
      phone: record.phone,
      message: record.message,
      source: record.source,
    });
  } catch (err) {
    // Never fail loudly: log and still return ok so pg_net does not retry-storm.
    console.error("notify error", err && err.message);
  }

  res.status(200).json({ ok: true });
}
