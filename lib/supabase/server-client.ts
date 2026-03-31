import { createServerClient as createClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { getSupabaseEnvVars } from '@/lib/utils/getEnvVariables';

export async function createServerClient() {
  const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } = getSupabaseEnvVars();

  const cookieStore = await cookies();

  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Expected when called from Server Components.
          // Proxy handles session refresh instead.
        }
      },
    },
  });
}
