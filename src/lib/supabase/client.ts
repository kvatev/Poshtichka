import { createBrowserClient } from '@supabase/ssr';

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nsrmhreocsjtrzjexrbu.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcm1ocmVvY3NqdHJ6amV4cmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMDM4NzAsImV4cCI6MjEwMTg3OTg3MH0.i4vScJtg3MoS8Z0V4qEitevar1px5zuuefryUi0a4vE';

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
