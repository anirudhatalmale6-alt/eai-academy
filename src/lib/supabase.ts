import { createClient } from "@supabase/supabase-js";

// These come from the Academy's own Supabase project. Until they're set, the
// app runs in "preview" mode (seed data, no live writes) so the design and
// flow are fully viewable without credentials.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && key);

export const supabase = isSupabaseConfigured
  ? createClient(url as string, key as string)
  : null;
