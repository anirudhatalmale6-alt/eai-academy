import { useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { startCheckout } from "../lib/checkout";
import { teamTierPct, seatChargeCents } from "../data/courses";
import {
  WORKSHOP_PROGRAM,
  workshopIncGstCents,
  audLabel,
  type Workshop,
} from "../data/workshops";

interface Props {
  open: boolean;
  onClose: () => void;
  workshop: Workshop | null;
}

// Registration + payment for a live workshop seat.
// The row is written first with status 'pending' (so a seat is never lost if
// the person drops out of Stripe), then we send them to checkout. The row id
// is generated here because anon can insert but cannot read rows back.
export function WorkshopRegisterModal({ open, onClose, workshop }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [seats, setSeats] = useState(1);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [doneNote, setDoneNote] = useState<string | null>(null);
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
        setSeats(1);
        setNotes("");
        setHp("");
        setError(null);
        setDone(false);
        setDoneNote(null);
      }, 200);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !workshop) return null;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const n = Math.max(1, Math.floor(Number(seats) || 1));
  const pct = teamTierPct(n); // null = 25+, custom quote
  const custom = pct === null;
  const unitIncGst = workshopIncGstCents();
  const perSeat = custom
    ? unitIncGst
    : seatChargeCents(WORKSHOP_PROGRAM.priceExGstCents, pct as number);
  const total = perSeat * n;
  const saving = unitIncGst * n - total;

  function newId() {
    try {
      return crypto.randomUUID();
    } catch {
      return "";
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!workshop) return;
    if (!name.trim()) return setError("Please enter your name.");
    if (!emailOk) return setError("Please enter a valid email address.");
    // Anti-spam: honeypot + minimum time on form.
    if (hp.trim() || Date.now() - openedAt.current < 2000) {
      setDone(true);
      return;
    }
    setSubmitting(true);
    const registrationId = newId();
    try {
      if (isSupabaseConfigured && supabase) {
        const row: Record<string, unknown> = {
          workshop_id: workshop.id,
          workshop_date: workshop.dateLabel,
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || null,
          phone: phone.trim() || null,
          seats: n,
          notes: notes.trim() || null,
          status: "pending",
          source: "workshop",
        };
        if (registrationId) row.id = registrationId;
        // No .select(): anon may insert but not read back.
        const { error: insErr } = await supabase
          .from("workshop_registrations")
          .insert(row);
        if (insErr) throw insErr;
      }

      if (custom) {
        // 25+ seats is a custom quote, not sold online.
        setDoneNote(
          "For 25 or more seats we'll put together a custom quote and can invoice your firm directly. We'll be in touch shortly.",
        );
        setDone(true);
        return;
      }

      const err = await startCheckout(
        { type: "workshop", slug: workshop.id },
        n,
        email.trim(),
        { registrationId, name: name.trim(), company: company.trim() },
      );
      if (err) {
        // Payment could not start (for example, before go-live). The seat is
        // still registered, so tell them the truth and follow up by email.
        setDoneNote(
          "Your place is registered. We'll email you a payment link to confirm your seat.",
        );
        setDone(true);
      }
    } catch {
      setError("Sorry, we couldn't register you just now. Please try again.");
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
            <h3 className="text-xl font-bold mt-4">You're registered.</h3>
            <p className="text-ink2 mt-2 text-[15px]">
              {doneNote ??
                `We've saved your place for ${workshop.dateLabel}. A confirmation is on its way to your inbox.`}
            </p>
            <button onClick={onClose} className="btn btn-dark mt-6">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="text-accent-ink text-[12px] font-bold uppercase tracking-wide">
              Live workshop · {workshop.shortDate}
            </div>
            <h3 className="text-[21px] font-bold mt-1 tracking-[-0.4px] leading-snug">
              {WORKSHOP_PROGRAM.title}
            </h3>
            <p className="text-ink2 mt-1.5 text-[14px]">
              {workshop.dateLabel}, {workshop.timeLabel} ·{" "}
              {WORKSHOP_PROGRAM.durationLabel} on {WORKSHOP_PROGRAM.platform}
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
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-accent"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-ink2 text-[12px] mt-1">
                  Your joining link and the recording go to this address.
                </p>
              </div>
              <div className="grid grid-cols-[1fr_110px] gap-3">
                <div>
                  <label className="block text-[13px] font-medium mb-1">
                    Company{" "}
                    <span className="text-ink2 font-normal">(optional)</span>
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
                    Seats
                  </label>
                  <input
                    type="number"
                    min={1}
                    className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-accent"
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1">
                  Anything you'd like covered?{" "}
                  <span className="text-ink2 font-normal">(optional)</span>
                </label>
                <textarea
                  className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-accent min-h-[70px]"
                  placeholder="A task or workflow you'd like us to work through"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Live price, with the team discount applied automatically. */}
              <div className="border border-line rounded-xl bg-bg px-4 py-3">
                {custom ? (
                  <p className="text-[14px] text-ink2">
                    For 25 or more seats we tailor a quote and can invoice your
                    firm. Register here and we'll come back to you.
                  </p>
                ) : (
                  <>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[13.5px] text-ink2">
                        {n} {n === 1 ? "seat" : "seats"} × {audLabel(perSeat)}
                      </span>
                      <span className="text-[20px] font-bold tracking-[-0.4px]">
                        {audLabel(total)}
                      </span>
                    </div>
                    <div className="text-[12.5px] text-ink2 mt-1">
                      GST included.
                      {(pct as number) > 0 && (
                        <span className="font-semibold text-accent-ink">
                          {"  "}· {pct}% team discount, save {audLabel(saving)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-accent w-full justify-center disabled:opacity-60"
              >
                {submitting
                  ? "Registering…"
                  : custom
                    ? "Request a quote →"
                    : `Register and pay ${audLabel(total)} →`}
              </button>
            </form>
            <p className="text-ink2 text-[12px] mt-3 text-center">
              Payment is handled securely by Stripe. Can't make it live? You'll
              still get the recording.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
