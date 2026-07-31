import { BUNDLE, COURSES, money } from "../data/courses";

// Premium "complete program" bundle: the 4 paid courses + certificate, sold
// as one program at a saving versus buying individually.
export function BundleCard() {
  const individualTotal = COURSES.filter((c) => c.priceCents > 0).reduce(
    (sum, c) => sum + c.priceCents,
    0,
  );
  const saving = individualTotal - BUNDLE.priceCents;

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
          <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {BUNDLE.includes.map((i) => (
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
          <div
            className="inline-block mt-2 text-[12px] font-bold rounded-full px-3 py-1"
            style={{ backgroundColor: "#6366F1" }}
          >
            Save {money(saving)}
          </div>
          <button className="btn btn-accent w-full justify-center mt-5">
            Get the full program →
          </button>
          <p className="text-white/50 text-[12px] mt-3">
            Lifetime access · Certificate included
          </p>
        </div>
      </div>
    </section>
  );
}
