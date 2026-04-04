import { createServerClient } from '@/lib/infrastructure/supabase/server-client';

export type TenantCommsClaims = {
  sub: string;
  email: string;
   'tenant_comms/role'?: string;
  'tenant_comms/is_admin'?: boolean;
  'tenant_comms/agency_id'?: string;
  'tenant_comms/tenant_ids'?: string[];
  'tenant_comms/is_tenant'?: boolean;
}

 async function userGuard() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    throw new Error('Unauthorized');
  }

  return {
    supabase,
    claims: data.claims as TenantCommsClaims,
  };
}

 async function agentGuard() {
  const { supabase, claims } = await userGuard();

  if (!claims['tenant_comms/agency_id']) {
    throw new Error('Unauthorized');
  }

  return { supabase, claims, agencyId: claims['tenant_comms/agency_id'] };
}

 async function adminGuard() {
  const { supabase, claims } = await userGuard();

  if (!claims['tenant_comms/is_admin']) {
    throw new Error('Unauthorized');
  }

  return { supabase, claims };
}

 async function tenantGuard() {
  const { supabase, claims } = await userGuard();

  if (!claims['tenant_comms/is_tenant'] || !claims['tenant_comms/tenant_ids']?.length) {
    throw new Error('Unauthorized');
  }

  return { supabase, claims, tenantIds: claims['tenant_comms/tenant_ids'] || [] };
}

 async function requireTenantAccess(tenantId: string) {
  const { supabase, claims, tenantIds } = await tenantGuard();

  if (!tenantIds.includes(tenantId)) {
    throw new Error('Unauthorized');
  }

  return { supabase, claims };  
}


export const authGuards = {
  userGuard,
  agentGuard,
  adminGuard,
  tenantGuard,
  requireTenantAccess,
};



