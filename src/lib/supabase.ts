import type { SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string | undefined

let client: Promise<SupabaseClient | null> | undefined

/**
 * Shared Supabase client, loaded on first use (only when a form is submitted) so the
 * ~100 KB SDK stays out of every page load. Resolves to `null` when credentials are missing,
 * so the site still works and forms show a "call us" message.
 */
export function getSupabase(): Promise<SupabaseClient | null> {
  if (!supabaseUrl || !supabaseKey) {
    if (import.meta.env.DEV) console.warn("Supabase credentials are missing: set VITE_SUPABASE_URL and VITE_SUPABASE_KEY.")
    return Promise.resolve(null)
  }
  client ??= import("@supabase/supabase-js")
    .then(({ createClient }) => createClient(supabaseUrl, supabaseKey))
    .catch((err) => {
      client = undefined // let the next attempt retry instead of reusing the failure
      throw err
    })
  return client
}
