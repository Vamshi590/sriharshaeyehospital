import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string | undefined

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Supabase credentials are missing. Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_KEY.",
  )
}

/**
 * Shared Supabase client. It is `null` when credentials are missing so the rest
 * of the site still renders (createClient throws on an empty URL).
 */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null
