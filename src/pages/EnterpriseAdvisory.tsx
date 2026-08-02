import { PartnerBadge } from "../components/PartnerBadge";

const OFFERINGS: { title: string; body: string }[] = [
  {
    title: "AI readiness assessment",
    body: "We review how your firm works today and map where Copilot and OpenAI Enterprise deliver real, safe gains, with a clear priority order.",
  },
  {
    title: "Rollout strategy",
    body: "A practical plan to introduce AI across the firm: tools, licences, pilot teams and the change management that makes it stick.",
  },
  {
    title: "Governance and compliance",
    body: "Data security, review controls, audit trails and a firm AI policy so you deploy within your professional and regulatory obligations.",
  },
  {
    title: "Custom AI agents",
    body: "We build the production agents finance teams use every day, tailored to your workflows, with a human kept in the loop.",
  },
  {
    title: "Team enablement",
    body: "Hands-on training for your people through the Academy, with team pricing and progress you can track across the firm.",
  },
  {
    title: "Ongoing partnership",
    body: "We stay on as your technical partner as tools evolve, so your firm keeps its edge without building an AI team from scratch.",
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
            Deploy AI across your firm, safely and for real.
          </h1>
          <p className="text-[16.5px] sm:text-[18px] leading-relaxed mt-4 text-ink2 max-w-[560px]">
            Beyond training, we advise and build. As an OpenAI Select Partner
            that ships production AI, we help finance and accounting firms adopt
            AI with the governance and control that regulated work demands.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a href="https://www.empathetic-ai.com" className="btn btn-accent">
              Book a consultation →
            </a>
            <a
              href="https://www.empathetic-ai.com"
              className="btn btn-white"
            >
              See our AI products
            </a>
          </div>
        </div>
      </section>

      <section className="bg-panel border border-line rounded-[22px] p-6 sm:p-9 mt-6">
        <h2 className="text-[24px] sm:text-[28px] font-bold tracking-[-0.6px]">
          How we work with firms
        </h2>
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
            Let's map your firm's AI roadmap.
          </h3>
          <p className="text-white/70 mt-2.5 text-[15px] leading-relaxed">
            A short conversation to see where AI fits your firm, what to roll out
            first, and how to keep it governed. No obligation.
          </p>
        </div>
        <a href="https://www.empathetic-ai.com" className="btn btn-accent">
          Book a consultation →
        </a>
      </section>
    </>
  );
}
