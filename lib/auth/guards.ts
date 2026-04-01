import { createServerClient } from '@/lib/supabase/server-client';

export async function requireUser() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    throw new Error('Unauthorized');
  }

  return {
    supabase,
    claims: data.claims,
  };
}
