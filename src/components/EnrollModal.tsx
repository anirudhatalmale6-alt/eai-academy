import { useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface Props {
  open: boolean;
  onClose: () => void;
  courseTitle: string;
  courseSlug: string;
}

// Free-course email capture. Writes to the Supabase `enrollments` table when
// configured; in preview mode it just shows the success state so the flow is
// fully demonstrable without credentials.
export function EnrollModal({ open, onClose, courseTitle, courseSlug }: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
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
        setFirstName("");
        setEmail("");
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
    if (!firstName.trim()) return setError("Please enter your first name.");
    if (!emailOk) return setError("Please enter a valid email address.");
    // Anti-spam: honeypot + minimum time on form.
    if (hp.trim() || Date.now() - openedAt.current < 2000) {
      setDone(true);
      return;
    }
    setSubmitting(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { error: insErr } = await supabase.from("enrollments").insert({
          first_name: firstName.trim(),
          email: email.trim(),
          course_slug: courseSlug,
          source: "free-course",
        });
        if (insErr) throw insErr;
      }
      setDone(true);
    } catch {
      setError("Sorry, we couldn't sign you up just now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-7 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-ink2 hover:text-ink text-xl"
          aria-label="Close"
        >
          ×
        </button>
        {done ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-cyan/15 text-cyan-ink flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h3 className="text-xl font-bold mt-4">You're in!</h3>
            <p className="text-ink2 mt-2 text-[15px]">
              Check your inbox. We've sent your access link for{" "}
              <span className="text-ink font-semibold">{courseTitle}</span>.
            </p>
            <button onClick={onClose} className="btn btn-dark mt-6">
              Start learning →
            </button>
          </div>
        ) : (
          <>
            <div className="text-cyan-ink text-[12px] font-bold uppercase tracking-wide">
              Free course
            </div>
            <h3 className="text-[22px] font-bold mt-1 tracking-[-0.4px]">
              {courseTitle}
            </h3>
            <p className="text-ink2 mt-2 text-[14.5px]">
              Enter your details and we'll email you instant access. No payment
              needed.
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
              <input
                className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-cyan"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="email"
                className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-cyan"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-dark w-full justify-center disabled:opacity-60"
              >
                {submitting ? "Signing you up…" : "Get free access →"}
              </button>
            </form>
            <p className="text-ink2 text-[12px] mt-3 text-center">
              By joining you agree to receive emails from Empathetic AI. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
