export function getSupabaseEnvVars() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('Missing environment variables for Supabase');
  }

  return { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY };
}

export function getSupabaseServiceKey() {
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_SERVICE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_KEY environment variable');
  }

  return SUPABASE_SERVICE_KEY;
}

export function getBaseUrlEnvVar() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  if (!SITE_URL) {
    throw new Error('Missing environment variable for site URL');
  }

  return { SITE_URL };
}