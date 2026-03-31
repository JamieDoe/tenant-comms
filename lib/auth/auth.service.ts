'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server-client';
import { type Provider } from '@supabase/supabase-js';

export async function loginWithEmail(formData: FormData): Promise<void> {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) {
    redirect('/login?error=Invalid email or password');
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
    redirect('/login?error=Could not create account');
  }

  revalidatePath('/', 'layout');
  redirect('/login?message=Check your email to confirm your account');
}

export async function logout(): Promise<void> {
  const supabase = await createServerClient();
  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/login');
}

async function oAuthLogin(provider: Provider): Promise<void> {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (!data?.url || error) {
    redirect('/login?error=Could not connect to provider');
  }

  redirect(data.url);
}

export async function signInWithGoogle(): Promise<void> {
  return oAuthLogin('google');
}

export async function signInWithMicrosoft(): Promise<void> {
  return oAuthLogin('azure');
}
