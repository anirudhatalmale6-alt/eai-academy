// Who is allowed to read a paid course.
//
// The lesson player shipped without this check, which left every lesson of a
// A$590 course readable by anyone with the URL. This is the gate.

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabase";

// How much of a paid course anyone can read without buying. One module is a
// real taster rather than a teaser: enough to judge the writing and the depth,
// which is what actually sells a course, while the other six stay closed.
export const FREE_PREVIEW_MODULES = 1;

export type Access = "loading" | "granted" | "preview";

/**
 * `granted` once the signed-in learner owns the course, or the course is free.
 * `preview` otherwise, which the player treats as module one only.
 */
export function useAccess(slug: string, priceCents: number): Access {
  const free = priceCents === 0;
  const [access, setAccess] = useState<Access>(free ? "granted" : "loading");

  useEffect(() => {
    let cancelled = false;
    if (free) {
      setAccess("granted");
      return;
    }
    // Without Supabase there is no way to prove entitlement, so the safe
    // answer is preview rather than open.
    if (!isSupabaseConfigured || !supabase) {
      setAccess("preview");
      return;
    }

    (async () => {
      const { data: auth } = await supabase!.auth.getUser();
      if (!auth?.user) {
        if (!cancelled) setAccess("preview");
        return;
      }
      // RLS restricts entitlements to the caller's own rows, so this cannot
      // be used to read someone else's access.
      const { data, error } = await supabase!
        .from("entitlements")
        .select("course_slug")
        .eq("course_slug", slug)
        .limit(1);
      if (cancelled) return;
      setAccess(!error && data && data.length > 0 ? "granted" : "preview");
    })();

    return () => {
      cancelled = true;
    };
  }, [slug, free]);

  return access;
}
