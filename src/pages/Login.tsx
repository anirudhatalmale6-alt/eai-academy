import { PartnerBadge } from "../components/PartnerBadge";

// Placeholder auth screen for Phase 1. Real student login (Supabase Auth) and
// "My Courses" arrive in Phase 2.
export function Login() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="bg-panel border border-line rounded-[20px] p-8 w-full max-w-md text-center">
        <PartnerBadge />
        <h1 className="text-[26px] font-bold mt-5">Student sign in</h1>
        <p className="text-ink2 mt-2 text-[15px]">
          Accounts and "My Courses" are coming in the next phase. For now, start
          the free course from the home page to get access by email.
        </p>
        <input
          className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-accent mt-5"
          placeholder="Email address"
          disabled
        />
        <button className="btn btn-dark w-full justify-center mt-3 opacity-60" disabled>
          Continue
        </button>
      </div>
    </div>
  );
}
