import { useState } from "react";
import {
  BUNDLE,
  money,
  incGstLabel,
  bundleIncludes,
  bundleIndividualCents,
  bundleLearningHours,
} from "../data/courses";
import { startCheckout } from "../lib/checkout";

// Premium "complete program" bundle. Contents, individual total, saving and
// learning hours are all derived from the paid courses, so the bundle stays in
// sync automatically when courses are added or removed. Only the bundle price
// is a fixed number set in courses.ts.
export function BundleCard() {
  const includes = bundleIncludes();
  const individualTotal = bundleIndividualCents();
  const saving = individualTotal - BUNDLE.priceCents;
  const hours = bundleLearningHours();
  const [buying, setBuying] = useState(false);
  const [buyMsg, setBuyMsg] = useState<string | null>(null);

  async function buyBundle() {
    setBuyMsg(null);
    setBuying(true);
    const err = await startCheckout({ type: "bundle" });
    if (err) setBuyMsg(err);
    setBuying(false);
  }

  return (
    <section className="bg-plum text-white rounded-[22px] p-8 sm:p-10 mt-6">
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-center">
        <div>
          <div
            className="text-[12px] font-bold uppercase tracking-[1.5px]"
            style={{ color: "#a5b4fc" }}
          >
            Complete program
          </div>
          <h3 className="text-[26px] sm:text-[30px] font-bold tracking-[-0.6px] mt-2">
            {BUNDLE.title}
          </h3>
          <p className="text-white/70 mt-2 text-[15px] max-w-[520px]">
            {BUNDLE.blurb}
          </p>
          <div className="text-white/60 text-[13px] font-semibold mt-3">
            {hours} Learning Hours in total
          </div>
          <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {includes.map((i) => (
              <li key={i} className="flex gap-2.5 text-[14px] text-white/90">
                <span style={{ color: "#a5b4fc" }} className="font-bold">
                  ✓
                </span>
                {i}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/[0.06] border border-white/15 rounded-2xl p-6 text-center">
          <div className="text-white/50 text-sm line-through">
            {money(individualTotal)}
          </div>
          <div className="text-[38px] font-bold tracking-[-1px] leading-none mt-1">
            {money(BUNDLE.priceCents)}
          </div>
          <div className="text-white/60 text-[12.5px] mt-1.5">
            + GST · {incGstLabel(BUNDLE.priceCents)}
          </div>
          {saving > 0 && (
            <div
              className="inline-block mt-2 text-[12px] font-bold rounded-full px-3 py-1"
              style={{ backgroundColor: "#6366F1" }}
            >
              Save {money(saving)}
            </div>
          )}
          <button
            onClick={buyBundle}
            disabled={buying}
            className="btn btn-accent w-full justify-center mt-5 disabled:opacity-60"
          >
            {buying ? "Starting checkout…" : "Get the full program →"}
          </button>
          <p className="text-white/50 text-[12px] mt-3">
            {buyMsg ?? "Lifetime access · A certificate per course"}
          </p>
        </div>
      </div>
    </section>
  );
}
