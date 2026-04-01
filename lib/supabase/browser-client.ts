'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseEnvVars } from '@/lib/utils/getEnvVariables';

type SupabaseSchema = Record<string, never>;

let client: SupabaseClient<SupabaseSchema> | null = null;

export function getSupabaseClient(): SupabaseClient<SupabaseSchema> {
  if (client) {
    return client;
  }

  const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } = getSupabaseEnvVars();

  client = createBrowserClient<SupabaseSchema>(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  return client;
}
