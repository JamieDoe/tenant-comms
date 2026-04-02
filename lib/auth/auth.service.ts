'use server';
import {authGuards} from './auth.guards';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/infrastructure/supabase/server-client';
import { type Provider } from '@supabase/supabase-js';
import { getBaseUrlEnvVar } from '@/lib/utils/getEnvVariables';
import { buildEncodedMessage } from '@/lib/utils/buildEncodedErrorMessage';
import { type ActionType } from '../utils/errors';
import { LoginSchema, RegisterSchema } from '../schemas/auth.schema';
import { createAdminClient } from '../infrastructure/supabase/admin-client';

export async function loginWithEmail(formData: FormData): Promise<ActionType> {
  const parsed = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { success: false, error: 'Invalid email or password' };
  }

  const { email, password } = parsed.data;

  const supabase = await createServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: 'Invalid email or password' };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function registerWithEmail(
  formData: FormData
): Promise<ActionType> {
  const parsed = RegisterSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!parsed.success) {
    return { success: false, error: 'Invalid registration data' };
  }

  const { email, password } = parsed.data;

  const supabase = await createServerClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {

    console.error('Error during registration:', error);
    return { success: false, error: 'Could not create account' };
  }

  return { success: true, data: null };
}

export async function logout(): Promise<void> {
  const supabase = await createServerClient();

  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/login');
}

export async function oAuthLogin(provider: Provider): Promise<void> {
  const supabase = await createServerClient();

  const { SITE_URL } = getBaseUrlEnvVar();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${SITE_URL}/auth/callback`,
    },
  });

  if (!data?.url || error) {
    const errorMessage = error
      ? 'Could not connect to provider'
      : 'No URL returned from provider';

    const redirectUrl = `/login?error=${buildEncodedMessage(errorMessage)}`;

    redirect(redirectUrl);
  }

  redirect(data.url);
}

export async function signInWithGoogle(): Promise<void> {
  return oAuthLogin('google');
}

export async function signInWithMicrosoft(): Promise<void> {
  return oAuthLogin('azure');
}

export async function loginWithMagicLink(formData: FormData): Promise<ActionType> {
  const email = formData.get('email');

  if (typeof email !== 'string' || !email) {
    return { success: false, error: 'Invalid email address' };
  }

  const supabase = await createServerClient();
  const { SITE_URL } = getBaseUrlEnvVar();
  const emailRedirectTo = `${SITE_URL}/auth/confirm?next=/tenant-portal`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo,
    },
  });

  if (error) {
    console.error('Error sending magic link:', error);
  }

  return { success: true, data: null };
}

export async function inviteTenant(tenantId: string, email: string): Promise<ActionType> {
  
  const {supabase, agencyId} = await authGuards.agentGuard();

  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .select('id, email')
    .eq('id', tenantId)
    .eq('agency_id', agencyId)
    .single();
    
  if (tenantError || !tenant) {
    console.error('Error fetching tenant:', tenantError);
    return { success: false, error: 'Could not find tenant' };
  }

  const {SITE_URL} = getBaseUrlEnvVar();
  const admin = createAdminClient();

  const redirectTo = `${SITE_URL}/auth/confirm?next=/tenant-portal`;

  const { error} = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo
  })

  if (error) {
    console.error('Error inviting tenant:', error);
    return { success: false, error: 'Could not send invite' };
  }

  return { success: true, data: null };
}
