import { PartnerBadge } from "../components/PartnerBadge";

// Audience: executives, CFOs, partners and boards. Focus is on roadmap,
// strategy, readiness and governance, NOT on product or building agents.
const OFFERINGS: { title: string; body: string }[] = [
  {
    title: "AI readiness assessment",
    body: "A clear-eyed view of where your firm stands today: capability, data, risk and the gaps between you and where you want to be.",
  },
  {
    title: "AI strategy and roadmap",
    body: "A board-level plan for adopting AI across the firm, with priorities, sequencing and the investment case, tied to real business outcomes.",
  },
  {
    title: "Governance and risk",
    body: "The controls, policies and accountability a regulated firm needs so leadership can adopt AI with confidence, not exposure.",
  },
  {
    title: "Executive and board briefings",
    body: "Bring your leadership team up to speed on what AI genuinely means for finance, cutting through the hype to what matters for your firm.",
  },
  {
    title: "Change and adoption",
    body: "How to take your people with you: the operating model, ways of working and enablement that turn a strategy into everyday practice.",
  },
  {
    title: "Ongoing advisory partnership",
    body: "A trusted partner in your corner as the landscape shifts, so your firm's AI direction stays current without building an internal team.",
  },
];

export function EnterpriseAdvisory() {
  return (
    <>
      <section className="bg-panel border border-line rounded-[26px] p-8 sm:p-12 mt-1">
        <div className="max-w-[680px]">
          <PartnerBadge />
          <div className="text-accent-ink text-[12px] font-bold uppercase tracking-[1.5px] mt-5">
            Enterprise AI Advisory
          </div>
          <h1 className="text-[34px] sm:text-[46px] font-bold tracking-[-1.4px] leading-[1.03] mt-2 text-ink">
            AI strategy and roadmap for finance leaders.
          </h1>
          <p className="text-[16.5px] sm:text-[18px] leading-relaxed mt-4 text-ink2 max-w-[580px]">
            For executives, CFOs and partners deciding how their firm should
            approach AI. We help you set the direction: readiness, roadmap,
            strategy and governance, so your firm adopts AI deliberately and
            safely. As an OpenAI Select Partner, our advice is grounded in what
            actually works in production, not theory.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a href="https://www.empathetic-ai.com" className="btn btn-accent">
              Book an executive briefing →
            </a>
            <a href="https://www.empathetic-ai.com" className="btn btn-white">
              Talk to our team
            </a>
          </div>
        </div>
      </section>

      <section className="bg-panel border border-line rounded-[22px] p-6 sm:p-9 mt-6">
        <h2 className="text-[24px] sm:text-[28px] font-bold tracking-[-0.6px]">
          How we advise firms
        </h2>
        <p className="text-ink2 mt-2 text-[15.5px] max-w-[620px]">
          Advisory engagements shaped around your leadership team and where your
          firm is heading, not a one-size template.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
          {OFFERINGS.map((o) => (
            <div
              key={o.title}
              className="border border-line rounded-2xl p-6 bg-bg"
            >
              <h3 className="text-[16.5px] font-bold tracking-[-0.2px]">
                {o.title}
              </h3>
              <p className="text-ink2 mt-2 text-[14.5px] leading-relaxed">
                {o.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-plum text-white rounded-[22px] p-8 sm:p-10 mt-6 flex flex-wrap justify-between items-center gap-7">
        <div className="max-w-[560px]">
          <h3 className="text-[24px] font-bold tracking-[-0.4px]">
            Let's shape your firm's AI roadmap.
          </h3>
          <p className="text-white/70 mt-2.5 text-[15px] leading-relaxed">
            A focused conversation for your leadership team: where you stand,
            what to prioritise, and how to move with the right governance in
            place. No obligation.
          </p>
        </div>
        <a href="https://www.empathetic-ai.com" className="btn btn-accent">
          Book an executive briefing →
        </a>
      </section>
    </>
  );
}
