import { useState } from "react";
import {
  TEAM_TIERS,
  bundleCourses,
  BUNDLE,
  money,
  teamTierPct,
} from "../data/courses";
import { InquiryModal } from "./InquiryModal";
import { startCheckout, type CheckoutItem } from "../lib/checkout";

// Team pricing block. Small teams (3 to 24) buy themselves and the volume
// discount is applied automatically at checkout. 25+ is custom, and firms who
// prefer central invoicing can request that instead of paying by card.
export function TeamPricing() {
  const [open, setOpen] = useState(false);

  // Buyable options: the full program bundle, plus each paid course.
  const options = [
    { key: "bundle", label: `${BUNDLE.title} (full program)`, cents: BUNDLE.priceCents },
    ...bundleCourses().map((c) => ({ key: c.slug, label: c.title, cents: c.priceCents })),
  ];

  const [selKey, setSelKey] = useState(options[0].key);
  const [seats, setSeats] = useState(10);
  const [buying, setBuying] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const sel = options.find((o) => o.key === selKey) ?? options[0];
  const n = Math.max(1, Math.floor(Number(seats) || 1));
  const pct = teamTierPct(n); // null = 25+ custom
  const custom = pct === null;
  const perSeat = custom ? sel.cents : Math.round(sel.cents * (1 - (pct as number) / 100));
  const total = perSeat * n;
  const saving = sel.cents * n - total;

  async function checkout() {
    setMsg(null);
    setBuying(true);
    const item: CheckoutItem =
      selKey === "bundle" ? { type: "bundle" } : { type: "course", slug: selKey };
    const err = await startCheckout(item, n);
    if (err) setMsg(err);
    setBuying(false);
  }

  return (
    <section className="bg-panel border border-line rounded-[22px] p-6 sm:p-9 mt-6">
      <div className="max-w-[640px]">
        <div className="text-accent-ink text-[12px] font-bold uppercase tracking-[1.5px]">
          Enrol your team
        </div>
        <h2 className="text-[26px] sm:text-[30px] font-bold tracking-[-0.6px] mt-2">
          Team pricing
        </h2>
        <p className="text-ink2 mt-2 text-[15.5px]">
          Training a whole finance team or firm? Enrol several people together
          and everyone saves. The more seats, the bigger the discount, applied
          across any course or the full program.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-7">
        {TEAM_TIERS.map((t) => (
          <div
            key={t.size}
            className="border border-line rounded-2xl p-6 text-center bg-bg"
          >
            <div className="text-ink2 text-[13.5px] font-semibold">{t.size}</div>
            <div className="text-[34px] font-bold tracking-[-1px] mt-2 text-accent-ink">
              {t.discount === null ? "Custom" : `${t.discount}% off`}
            </div>
            <div className="text-ink2 text-[13px] mt-1">
              {t.discount === null ? "let's talk" : "per seat"}
            </div>
          </div>
        ))}
      </div>

      {/* Self-serve seat calculator: pick what to enrol in and how many seats,
          see the discounted total, and check out. 25+ routes to a custom quote. */}
      <div className="border border-line rounded-2xl bg-bg p-5 sm:p-6 mt-5">
        <div className="grid sm:grid-cols-[1fr_140px] gap-4">
          <label className="block">
            <span className="text-ink2 text-[12.5px] font-semibold">Enrol in</span>
            <select
              value={selKey}
              onChange={(e) => setSelKey(e.target.value)}
              className="mt-1 w-full border border-line rounded-xl px-3 py-2.5 text-[14.5px] bg-white"
            >
              {options.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-ink2 text-[12.5px] font-semibold">Seats</span>
            <input
              type="number"
              min={1}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="mt-1 w-full border border-line rounded-xl px-3 py-2.5 text-[14.5px] bg-white"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 mt-5">
          <div>
            {custom ? (
              <div className="text-[15px] text-ink2 max-w-[360px]">
                For 25 or more seats we tailor a custom quote and can invoice you
                directly.
              </div>
            ) : (
              <>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[30px] font-bold tracking-[-0.5px]">
                    {money(total)}
                  </span>
                  {saving > 0 && (
                    <span className="text-ink2 text-[16px] line-through">
                      {money(sel.cents * n)}
                    </span>
                  )}
                </div>
                <div className="text-ink2 text-[13.5px] mt-1">
                  {n} {n === 1 ? "seat" : "seats"} × {money(perSeat)}
                  {(pct as number) > 0 && (
                    <span className="font-semibold text-accent-ink">
                      {"  "}· {pct}% off, save {money(saving)}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col items-stretch">
            {custom ? (
              <button onClick={() => setOpen(true)} className="btn btn-accent">
                Request a quote →
              </button>
            ) : (
              <button
                onClick={checkout}
                disabled={buying}
                className="btn btn-accent disabled:opacity-60"
              >
                {buying ? "Starting checkout…" : `Checkout ${n} seats →`}
              </button>
            )}
          </div>
        </div>
        {msg && <p className="text-ink2 text-[13px] mt-3">{msg}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-5">
        <button onClick={() => setOpen(true)} className="btn btn-white">
          Prefer to be invoiced? Request team pricing →
        </button>
        <span className="text-ink2 text-[13.5px]">
          Central billing available for firms.
        </span>
      </div>

      <InquiryModal
        open={open}
        onClose={() => setOpen(false)}
        title="Team pricing"
        source="team-pricing"
        intro="Tell us roughly how many people you'd like to enrol and which courses, and we'll send you team pricing."
      />
    </section>
  );
}
