import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

// Public client for client-side / anonymous operations
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side elevated operations (bypassing RLS)
export function getSupabaseAdminClient() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Public client getter for server-side read operations
export function getSupabasePublicClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}
