'use server';

import { createServerClient } from '@/lib/infrastructure/supabase/server-client';
import { createAdminClient } from '@/lib/infrastructure/supabase/admin-client';
import type { ActionType } from '@/lib/utils/errors';

interface CreateAgencyInput {
  name: string;
  email?: string | null;
  phone?: string | null;
}

export async function createAgency(
  input: CreateAgencyInput
): Promise<ActionType<{ id: string }>> {
  const supabase = await createServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: 'Not authenticated' };
  }

  const admin = createAdminClient();

  const { data: agency, error: agencyError } = await admin
    .from('agencies')
    .insert({
      name: input.name,
      email: input.email ?? undefined,
      phone: input.phone ?? undefined,
      created_by: user.id,
    })
    .select('id')
    .single();

  if (agencyError || !agency) {
    return { success: false, error: 'Could not create agency' };
  }

  const { error: profileError } = await admin
    .from('profiles')
    .update({
      agency_id: agency.id,
      role: 'owner',
    })
    .eq('id', user.id);

  if (profileError) {
    return { success: false, error: 'Could not link profile to agency' };
  }

  return { success: true, data: { id: agency.id } };
}