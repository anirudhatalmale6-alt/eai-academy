import { TEAM_TIERS } from "../data/courses";

// Team pricing block: shown in the buying flow (Courses page) and as its own
// page. Replaces the old "For Teams" section with a clear volume-discount offer.
export function TeamPricing() {
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
          across any courses or the full program.
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

      <div className="flex flex-wrap items-center gap-3 mt-7">
        <a href="https://www.empathetic-ai.com" className="btn btn-accent">
          Request team pricing →
        </a>
        <span className="text-ink2 text-[13.5px]">
          Invoicing and central billing available for firms.
        </span>
      </div>
    </section>
  );
}
