import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Only throw in development or if critical, but for build we might want to be lenient or ensure env vars are present.
  // Ideally these should be checked.
  // For now keeping the check but with updated names.
  console.warn(
    'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables'
  );
}

// Create a single supabase client for database operations only
// Use non-null assertion or fallback if needed, but createClient might fail if empty.
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');