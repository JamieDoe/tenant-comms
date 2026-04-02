'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/infrastructure/supabase/server-client';
import { type Provider } from '@supabase/supabase-js';
import { getBaseUrlEnvVar } from '@/lib/utils/getEnvVariables';
import { buildEncodedMessage } from '@/lib/utils/buildEncodedErrorMessage';
import { type ActionType } from '../utils/errors';
import { LoginSchema, RegisterSchema } from '../schemas/auth.schema';

export async function loginWithEmail(formData: FormData): Promise<ActionType> {
  const { email, password } = LoginSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

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
  const { email, password } = RegisterSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

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
