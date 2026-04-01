'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/infrastructure/supabase/server-client';
import { type Provider } from '@supabase/supabase-js';
import { getBaseUrlEnvVar } from '@/lib/utils/getEnvVariables';
import { buildEncodedMessage } from '@/lib/utils/buildEncodedErrorMessage';

export async function loginWithEmail(formData: FormData): Promise<void> {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) {
    const redirectUrl = `/login?error=${buildEncodedMessage('Invalid email or password')}`;
    redirect(redirectUrl);
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function registerWithEmail(formData: FormData): Promise<void> {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) {
    const redirectUrl = `/login?error=${buildEncodedMessage('Could not create account')}`;
    redirect(redirectUrl);
  }

  revalidatePath('/', 'layout');

  const redirectUrl = `/login?success=${buildEncodedMessage('Account created successfully, please check your email for confirmation')}`;
  redirect(redirectUrl);
}

export async function logout(): Promise<void> {
  const supabase = await createServerClient();
  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/login');
}

async function oAuthLogin(provider: Provider): Promise<void> {
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
