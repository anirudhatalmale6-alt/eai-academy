import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface Enrollment {
  id: string;
  first_name: string | null;
  email: string;
  course_slug: string | null;
  source: string | null;
  created_at: string;
}

// Phase 1 admin. Reads enrollments when Supabase is wired up (admin-only via
// RLS in production). Course management UI arrives alongside the schema.
export function Admin() {
  const [rows, setRows] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase
          .from("enrollments")
          .select("id,first_name,email,course_slug,source,created_at")
          .order("created_at", { ascending: false });
        setRows((data as Enrollment[]) ?? []);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mt-1 space-y-6">
      <div className="bg-panel border border-line rounded-[20px] p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-cyan-ink text-[12px] font-bold uppercase tracking-wide">
              Admin
            </div>
            <h1 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.5px] mt-1">
              Enrolments
            </h1>
            <p className="text-ink2 mt-1">
              {isSupabaseConfigured
                ? `${rows.length} enrolment${rows.length === 1 ? "" : "s"}`
                : "Preview mode. Connect Supabase to see live enrolments."}
            </p>
          </div>
          <button className="btn btn-dark" disabled={!rows.length}>
            Export CSV
          </button>
        </div>

        {loading ? (
          <p className="text-ink2 mt-8">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-ink2 mt-8">
            No enrolments yet. They'll appear here as people join through the
            site.
          </p>
        ) : (
          <div className="overflow-x-auto mt-6 border border-line rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Course</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3">{r.first_name || "-"}</td>
                    <td className="px-4 py-3">{r.email}</td>
                    <td className="px-4 py-3">{r.course_slug || "-"}</td>
                    <td className="px-4 py-3 text-ink2">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-panel border border-line rounded-[20px] p-6 sm:p-8">
        <h2 className="text-[20px] font-bold">Manage courses</h2>
        <p className="text-ink2 mt-1 text-[15px]">
          Add, edit and publish courses here. This is coming with the course
          schema so you can manage everything yourself, no code.
        </p>
      </div>
    </div>
  );
}
