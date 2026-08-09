import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "placeholder-key";
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  supabasePublishableKey;

// Public client for client-side / anonymous operations
export const supabasePublic = createClient(supabaseUrl, supabasePublishableKey);

// Admin client for server-side elevated operations using SUPABASE_SECRET_KEY (bypassing RLS)
export function getSupabaseAdminClient() {
  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Public client getter for server-side read operations using NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
export function getSupabasePublicClient() {
  return createClient(supabaseUrl, supabasePublishableKey);
}
