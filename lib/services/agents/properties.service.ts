'use server';

import { createServerClient } from '@/lib/infrastructure/supabase/server-client';
import type { ActionType } from '@/lib/utils/errors';

export async function createFirstProperty(input: {
  agencyId: string;
  addressLine1: string;
  city: string;
  postcode: string;
  propertyType: string;
  bedrooms: number;
}): Promise<ActionType<{ id: string }>> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('properties')
    .insert({
      agency_id: input.agencyId,
      address_line_1: input.addressLine1,
      city: input.city,
      postcode: input.postcode,
      property_type: input.propertyType,
      bedrooms: input.bedrooms,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: 'Could not create property' };
  }

  return { success: true, data: { id: data.id } };
}