import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import { getCourse, hoursLabel } from "../data/courses";

export function MyCourses() {
  const { user, loading } = useAuth();
  const [slugs, setSlugs] = useState<string[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !supabase) return;
    supabase
      .from("entitlements")
      .select("course_slug")
      .then(({ data, error }) => {
        if (error) setErr("Could not load your courses.");
        else setSlugs([...new Set((data ?? []).map((r) => r.course_slug))]);
      });
  }, [user]);

  if (loading) {
    return <div className="p-10 text-ink2">Loading…</div>;
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="bg-panel border border-line rounded-[20px] p-10 mt-1">
        <h1 className="text-[28px] font-bold">My Courses</h1>
        <p className="text-ink2 mt-2">Accounts are available at launch.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-panel border border-line rounded-[20px] p-10 sm:p-14 mt-1 text-center">
        <h1 className="text-[28px] font-bold">My Courses</h1>
        <p className="text-ink2 mt-2 max-w-[440px] mx-auto">
          Sign in to see the courses you have access to.
        </p>
        <Link to="/login" className="btn btn-accent mt-6">
          Sign in →
        </Link>
      </div>
    );
  }

  const courses = (slugs ?? [])
    .map((s) => getCourse(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="mt-1">
      <section className="bg-panel border border-line rounded-[20px] p-6 sm:p-9">
        <h1 className="text-[30px] font-bold tracking-[-0.6px]">My Courses</h1>
        <p className="text-ink2 mt-1.5 text-[15px]">
          Signed in as {user.email}
        </p>

        {err && <p className="text-red-600 mt-4">{err}</p>}

        {slugs === null ? (
          <p className="text-ink2 mt-8">Loading your courses…</p>
        ) : courses.length === 0 ? (
          <div className="mt-8 text-center py-8">
            <p className="text-ink2">
              You don't have any courses yet.
            </p>
            <Link to="/courses" className="btn btn-accent mt-5">
              Browse courses →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {courses.map((c) => (
              <div
                key={c.slug}
                className="border border-line rounded-2xl overflow-hidden bg-white"
              >
                <div className="h-[90px]" style={{ backgroundColor: c.color }} />
                <div className="p-5">
                  <h3 className="font-semibold text-[16px] tracking-[-0.2px]">
                    {c.title}
                  </h3>
                  <p className="text-ink2 text-[13px] mt-1">
                    {hoursLabel(c.learningHours)} · {c.lessonsLabel}
                  </p>
                  <Link
                    to={`/course/${c.slug}`}
                    className="btn btn-dark w-full justify-center mt-4 text-[14px]"
                  >
                    Continue →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
