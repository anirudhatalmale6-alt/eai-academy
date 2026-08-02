import { useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

// Personal / free email providers are not accepted: this is a business enquiry.
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "outlook.com", "outlook.com.au", "hotmail.com",
  "hotmail.co.uk", "hotmail.com.au", "live.com", "live.com.au", "msn.com",
  "yahoo.com", "yahoo.co.uk", "yahoo.com.au", "ymail.com", "rocketmail.com",
  "icloud.com", "me.com", "mac.com", "aol.com", "gmx.com", "gmx.net",
  "proton.me", "protonmail.com", "pm.me", "yandex.com", "yandex.ru",
  "mail.com", "zoho.com", "hey.com", "fastmail.com", "tutanota.com",
  "bigpond.com", "bigpond.com.au", "optusnet.com.au", "iinet.net.au",
]);
const isFreeEmail = (email: string) =>
  FREE_EMAIL_DOMAINS.has((email.trim().toLowerCase().split("@")[1] || ""));

interface Props {
  open: boolean;
  onClose: () => void;
  title: string; // e.g. "Enterprise Advisory Program"
  source: string; // e.g. "advisory" | "ai-product" | "team-pricing"
  intro?: string;
}

// General enquiry capture (Advisory, AI product, team pricing). Writes to the
// Supabase `inquiries` table when configured. IMPORTANT: insert with NO
// .select() — anon can insert but not read back (admin-only read policy).
export function InquiryModal({ open, onClose, title, source, intro }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const openedAt = useRef(0);
  const [hp, setHp] = useState(""); // honeypot

  useEffect(() => {
    if (open) {
      openedAt.current = Date.now();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setName("");
        setEmail("");
        setCompany("");
        setPhone("");
        setMessage("");
        setHp("");
        setError(null);
        setDone(false);
      }, 200);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError("Please enter your name.");
    if (!company.trim()) return setError("Please enter your company.");
    if (!emailOk) return setError("Please enter a valid work email.");
    if (isFreeEmail(email))
      return setError(
        "Please use your work email, not a personal one like Gmail or Outlook.",
      );
    if (!message.trim()) return setError("Please tell us how we can help.");
    // Anti-spam: honeypot + minimum time on form.
    if (hp.trim() || Date.now() - openedAt.current < 2000) {
      setDone(true);
      return;
    }
    setSubmitting(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { error: insErr } = await supabase.from("inquiries").insert({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || null,
          phone: phone.trim() || null,
          message: message.trim() || null,
          source,
        });
        if (insErr) throw insErr;
      }
      setDone(true);
    } catch {
      setError("Sorry, we couldn't send that just now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-7 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-ink2 hover:text-ink text-xl"
          aria-label="Close"
        >
          ×
        </button>
        {done ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-accent/15 text-accent-ink flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h3 className="text-xl font-bold mt-4">Thank you.</h3>
            <p className="text-ink2 mt-2 text-[15px]">
              We've received your details and will be in touch shortly.
            </p>
            <button onClick={onClose} className="btn btn-dark mt-6">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="text-accent-ink text-[12px] font-bold uppercase tracking-wide">
              {title}
            </div>
            <h3 className="text-[22px] font-bold mt-1 tracking-[-0.4px]">
              Contact us
            </h3>
            <p className="text-ink2 mt-2 text-[14.5px]">
              {intro ??
                "Tell us a little about your firm and we'll get back to you."}
            </p>
            <form onSubmit={submit} className="mt-5 space-y-3">
              <div aria-hidden className="absolute -left-[9999px]">
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1">
                  Your name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-accent"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1">
                  Work email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-accent"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-ink2 text-[12px] mt-1">
                  Company email only, no Gmail, Outlook, etc.
                </p>
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-accent"
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1">
                  Phone <span className="text-ink2 font-normal">(optional)</span>
                </label>
                <input
                  className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-accent"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1">
                  How can we help? <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-accent min-h-[90px]"
                  placeholder="How can we help?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-accent w-full justify-center disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send enquiry →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
