import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Terms, refunds and privacy on one page with three anchors, so checkout can
// deep link to /legal#refunds without us maintaining three near-identical
// layouts.
//
// IMPORTANT, and stated on the page itself: these are drafts prepared for
// Empathetic AI to have reviewed. They are written to reflect Australian
// Consumer Law rather than to work around it.
//
// Two ACL points that shaped the wording:
//  1. There is NO general cooling off right for an online purchase in Australia.
//     Cooling off applies to unsolicited agreements such as telemarketing. So
//     the 14 day window below is a voluntary commitment, not a legal minimum,
//     and it is worth saying so because it is a selling point.
//  2. Consumer guarantees cannot be excluded. Blanket wording like "no refunds"
//     or "all sales are final" is prohibited, so every refund clause here is
//     written to sit ON TOP of the guarantees, never instead of them.

// Supplied by the client. The ABN checksum validates (weighted modulus 89), so
// this is not a typo.
const ENTITY = "Empathetic AI Pty Ltd";
const ABN = "53 665 827 396";
const CONTACT = "the contact form at empathetic-ai.com/contact";

// A refund window on a 3 to 5 hour course needs a consumption cap, or the
// window is simply the course being free. 25% is the common industry setting.
const REFUND_DAYS = 14;
const REFUND_CAP_PCT = 25;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="bg-panel border border-line rounded-[22px] p-6 sm:p-9 mt-6 scroll-mt-6"
    >
      <h2 className="text-[26px] font-bold tracking-[-0.6px]">{title}</h2>
      <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[17px] font-bold tracking-[-0.2px] pt-2">{children}</h3>
  );
}

export function Legal() {
  const { hash } = useLocation();

  // HashRouter already owns the URL hash, so an in-page anchor has to be
  // scrolled to manually rather than by the browser.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.getElementById(hash.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <>
      <section className="bg-panel border border-line rounded-[26px] p-8 sm:p-12 mt-1">
        <div className="max-w-[720px]">
          <div className="text-accent-ink text-[12px] font-bold uppercase tracking-[1.5px]">
            Empathetic AI Academy
          </div>
          <h1 className="text-[34px] sm:text-[44px] font-bold tracking-[-1.3px] leading-[1.05] mt-2 text-ink">
            Terms, refunds and privacy
          </h1>
          <p className="text-[16.5px] leading-relaxed mt-4 text-ink2">
            Written plainly, because a policy nobody can read protects nobody.
            Your rights under the Australian Consumer Law sit above everything
            on this page and nothing here reduces them.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-[14.5px]">
            <a href="#terms" className="font-semibold text-accent-ink">
              Terms of service
            </a>
            <a href="#refunds" className="font-semibold text-accent-ink">
              Refund policy
            </a>
            <a href="#privacy" className="font-semibold text-accent-ink">
              Privacy policy
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <Section id="terms" title="Terms of service">
        <p>
          These terms apply when you enrol in a course, register for a live
          workshop or buy a bundle from Empathetic AI Academy, operated by{" "}
          {ENTITY} (ABN {ABN}).
        </p>

        <H3>What you are buying</H3>
        <p>
          You are buying access to online professional development delivered by
          Empathetic AI. Prices are shown excluding GST and Australian GST is
          added at checkout, so the amount charged to your card is the GST
          inclusive amount shown before you pay.
        </p>
        <p>
          Access to self paced courses is for your own individual use and does
          not expire. Seats bought for a team are for named individuals and are
          not shared or transferred between people.
        </p>

        <H3>Certificates and what they are not</H3>
        <p>
          Courses that include an assessment issue a certificate of completion
          when you pass it. These are professional development credentials
          issued by Empathetic AI. They are{" "}
          <strong>
            not nationally recognised qualifications under the Australian
            Qualifications Framework
          </strong>
          , and Empathetic AI is not a Registered Training Organisation. We do
          not claim, and you should not represent, that a certificate carries
          AQF status.
        </p>

        <H3>What we do not promise</H3>
        <p>
          Our courses teach the practical use of AI tools in professional work.
          We do not guarantee any employment outcome, any commercial result, or
          that any particular tool will remain available or behave the same way
          in future. The tools we teach are made by third parties and change
          frequently.
        </p>
        <p>
          Nothing in our courses is legal, tax, accounting, audit or financial
          advice. Course material covering governance, risk and compliance is
          educational. You remain responsible for your own professional
          obligations and for the decisions you make.
        </p>

        <H3>Live workshops</H3>
        <p>
          If we cancel or reschedule a workshop you may move to another date or
          take a full refund, whichever you prefer. Recordings are provided to
          registered attendees for their own use and are not to be redistributed.
        </p>

        <H3>Your content and your data</H3>
        <p>
          Work you produce during a course is yours. Do not upload confidential
          client information, personal information about other people, or
          material you are not permitted to share, to any AI tool used in a
          course exercise. The courses cover why in detail.
        </p>

        <H3>Using the material</H3>
        <p>
          Course videos, templates, prompts and written material remain the
          property of Empathetic AI. You may use them freely in your own work,
          including inside your own organisation. You may not resell them,
          publish them, or use them to deliver training to others commercially.
        </p>

        <H3>Referral commissions</H3>
        <p>
          If you take part in a referral programme and earn a commission on
          enrolments, you must disclose that you earn a commission whenever you
          promote a course. This is required by Australian Consumer Law, not
          just by us. Referral commissions are not payable on institutional or
          bulk seat purchases, and we may withhold a commission where a referral
          was not disclosed or where the enrolment is refunded.
        </p>

        <H3>Changes and contact</H3>
        <p>
          We may update these terms. Material changes will be notified to
          enrolled students. These terms are governed by the law of Australia.
          Questions go to {CONTACT}.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="refunds" title="Refund policy">
        <div className="rounded-[14px] border border-line bg-[#F8FAFC] p-5">
          <p className="text-[15.5px]">
            <strong>The short version.</strong> {REFUND_DAYS} days to change
            your mind, as long as you have not worked through more than{" "}
            {REFUND_CAP_PCT}% of the course. If something is wrong with what we
            sold you, your rights are wider than this and are not limited by
            anything below.
          </p>
        </div>

        <H3>Our {REFUND_DAYS} day commitment</H3>
        <p>
          There is no general cooling off period for online purchases in
          Australia, so this is something we choose to offer rather than
          something we are required to give. If you change your mind within{" "}
          {REFUND_DAYS} days of purchase and have completed no more than{" "}
          {REFUND_CAP_PCT}% of the course, contact us and we will refund you in
          full.
        </p>
        <p>
          The completion limit exists because our courses are short. Without it,
          a refund after finishing the material would simply mean the course was
          free, and we would have to price for that.
        </p>

        <H3>Your Australian Consumer Law rights, which are separate</H3>
        <p>
          Our goods and services come with guarantees that cannot be excluded
          under the Australian Consumer Law. If a course is not of acceptable
          quality, is not fit for the purpose we described, or is significantly
          different from what we advertised, you are entitled to a remedy. For a
          major failure you may choose a refund. These rights apply regardless
          of the {REFUND_DAYS} day window, regardless of how much of the course
          you have completed, and nothing on this page limits them.
        </p>

        <H3>Live workshops</H3>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Cancel more than 7 days before the session: full refund, or move to
            another date at no cost.
          </li>
          <li>
            Cancel within 7 days: transfer to another date, or send a colleague
            in your place. We cannot refund at this point because the seat is
            already committed.
          </li>
          <li>
            If we cancel or reschedule: full refund or another date, your
            choice.
          </li>
          <li>
            If you cannot attend live, the recording is provided, so a missed
            session is not a lost one.
          </li>
        </ul>

        <H3>Bundles and team purchases</H3>
        <p>
          A bundle is refundable on the same terms while no more than{" "}
          {REFUND_CAP_PCT}% of the total material has been completed. Unassigned
          team seats can be refunded at any time before they are allocated to a
          person.
        </p>

        <H3>How to ask</H3>
        <p>
          Contact us through {CONTACT} with the email address you enrolled with.
          We do not ask for a reason. Approved refunds go back to the original
          payment method, normally within five business days.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="privacy" title="Privacy policy">
        <p>
          {ENTITY} (ABN {ABN}) handles personal information in accordance with
          the Privacy Act 1988 (Cth) and the Australian Privacy Principles.
        </p>

        <H3>What we collect</H3>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Your name and email address, so we can give you access to what you
            bought and put the right name on your certificate.
          </li>
          <li>
            Your course progress and assessment results, so you can resume where
            you left off and be issued a certificate.
          </li>
          <li>
            Your organisation and role, where you choose to give them on an
            enquiry or team purchase.
          </li>
          <li>
            Enquiry messages you send us through a form on this site.
          </li>
        </ul>
        <p>
          We do not collect or store your card details. Payments are processed by
          Stripe, and your card information goes to Stripe rather than to us.
        </p>

        <H3>Work you submit</H3>
        <p>
          Where a course asks you to submit a piece of work for assessment, we
          store what you submit so it can be assessed and so your certificate can
          be substantiated later. Do not include confidential client information
          or personal information about other people in submitted work.
        </p>

        <H3>Where it is held</H3>
        <p>
          Your account, course progress and assessment data is held in Australia,
          in our database hosted by Supabase in the AWS Sydney region
          (ap-southeast-2). It does not leave the country in the ordinary course
          of running the Academy.
        </p>

        <H3>Overseas disclosure</H3>
        <p>
          Two things do involve providers that operate internationally. Payments
          are processed by Stripe, and email is delivered by our email provider.
          Each receives only what it needs, which for Stripe is your payment and
          contact details and for our email provider is your name and email
          address. Neither receives your course results.
        </p>
        <p>
          Australian Privacy Principle 8 requires us to tell you this and to take
          reasonable steps to ensure an overseas recipient handles your
          information consistently with the Australian Privacy Principles. We use
          established providers that are contractually bound to their own
          security and privacy obligations.
        </p>

        <H3>What we do not do</H3>
        <p>
          We do not sell your personal information. We do not share it with
          anyone for their own marketing. Your course results are not disclosed
          to your employer unless your employer bought the seat, in which case
          they are told whether you completed it, not what your individual
          answers were.
        </p>

        <H3>Access, correction and complaints</H3>
        <p>
          You can ask us what we hold about you, ask us to correct it, or ask us
          to delete your account and its data. Contact us through {CONTACT}. If
          you are not satisfied with how we have handled a privacy matter you can
          complain to the Office of the Australian Information Commissioner.
        </p>
      </Section>

      <p className="text-ink2 text-[13px] mt-6 mb-2 max-w-[720px] leading-relaxed">
        These policies are prepared in plain English and reflect Australian
        Consumer Law and the Privacy Act. They are not legal advice, and
        Empathetic AI should have them reviewed by its own adviser before
        relying on them commercially.
      </p>
    </>
  );
}
