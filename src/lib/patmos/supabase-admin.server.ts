import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let admin: SupabaseClient | null | undefined;

/**
 * Service-role client (bypasses RLS). Server only: for writes users must not be able to make
 * themselves, such as subscriptions and usage counters. Null when the key isn't configured.
 */
export function getAdminClient(): SupabaseClient | null {
  if (admin !== undefined) return admin;
  const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  admin =
    url && key
      ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
      : null;
  return admin;
}
