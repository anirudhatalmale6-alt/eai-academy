import { Link } from "react-router-dom";

export function CheckoutSuccess() {
  return (
    <div className="bg-panel border border-line rounded-[20px] p-10 sm:p-14 mt-1 text-center">
      <div className="w-16 h-16 rounded-full bg-accent/15 text-accent-ink flex items-center justify-center text-3xl mx-auto">
        ✓
      </div>
      <h1 className="text-[30px] sm:text-[36px] font-bold tracking-[-0.6px] mt-5">
        Thank you, you're enrolled.
      </h1>
      <p className="text-ink2 mt-3 max-w-[520px] mx-auto text-[16px]">
        Your payment was successful. We've sent a receipt and your access
        details to your email. You can start learning right away.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-7">
        <Link to="/my-courses" className="btn btn-accent">
          Go to My Courses →
        </Link>
        <Link to="/courses" className="btn btn-white">
          Browse more courses
        </Link>
      </div>
    </div>
  );
}
