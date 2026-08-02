import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PartnerBadge } from "../components/PartnerBadge";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { useAuth } from "../lib/auth";

export function Login() {
  const nav = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (user) nav("/my-courses", { replace: true });
  }, [user, nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setNotice(null);
    if (!isSupabaseConfigured || !supabase) {
      setNotice("Sign in will be available at launch.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return setMsg("Please enter a valid email.");
    if (password.length < 8)
      return setMsg("Password must be at least 8 characters.");
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        // Depending on project settings this may require email confirmation.
        const { data } = await supabase.auth.getSession();
        if (data.session) nav("/my-courses");
        else
          setNotice(
            "Account created. Please check your email to confirm, then sign in.",
          );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        nav("/my-courses");
      }
    } catch (err) {
      setMsg(
        (err as { message?: string })?.message ||
          "Sorry, that didn't work. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center justify-center py-10">
      <div className="bg-panel border border-line rounded-[20px] p-8 w-full max-w-md">
        <div className="text-center">
          <PartnerBadge />
          <h1 className="text-[26px] font-bold mt-5">
            {mode === "signin" ? "Student sign in" : "Create your account"}
          </h1>
          <p className="text-ink2 mt-2 text-[14.5px]">
            {mode === "signin"
              ? "Sign in to access your courses."
              : "Use the same email you purchased with to see your courses."}
          </p>
        </div>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="email"
            className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-accent"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full border border-line rounded-[10px] px-4 py-3 text-[15px] outline-none focus:border-accent"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {msg && <p className="text-red-600 text-sm">{msg}</p>}
          {notice && <p className="text-ink2 text-sm">{notice}</p>}
          <button
            type="submit"
            disabled={busy}
            className="btn btn-accent w-full justify-center disabled:opacity-60"
          >
            {busy
              ? "Please wait…"
              : mode === "signin"
                ? "Sign in →"
                : "Create account →"}
          </button>
        </form>
        <div className="text-center text-[14px] text-ink2 mt-4">
          {mode === "signin" ? (
            <>
              New here?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-accent-ink font-semibold"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-accent-ink font-semibold"
              >
                Sign in
              </button>
            </>
          )}
        </div>
        <p className="text-center text-ink2 text-[12.5px] mt-4">
          Just want a taste?{" "}
          <Link to="/" className="text-accent-ink font-semibold">
            Start the free course
          </Link>
        </p>
      </div>
    </div>
  );
}
