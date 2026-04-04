'use server';

import { createServerClient } from '@/lib/infrastructure/supabase/server-client';
import type { ActionType } from '@/lib/utils/errors';

export async function createFirstTenant(input: {
  agencyId: string;
  fullName: string;
  email: string;
  phone?: string;
  propertyId?: string;
}): Promise<ActionType<{ id: string }>> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('tenants')
    .insert({
      agency_id: input.agencyId,
      full_name: input.fullName,
      email: input.email,
      phone: input.phone || null,
      property_id: input.propertyId || null,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: 'Could not create tenant' };
  }

  return { success: true, data: { id: data.id } };
}