import { createClient } from '@supabase/supabase-js';
import { getSupabaseEnvVars, getSupabaseServiceKey } from '@/lib/utils/getEnvVariables';

export function createAdminClient() {
  const { SUPABASE_URL } = getSupabaseEnvVars();
    const SUPABASE_SERVICE_KEY = getSupabaseServiceKey();

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('Missing Supabase admin environment variables');
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}