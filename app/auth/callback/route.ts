import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server-client';
import { buildEncodedMessage } from '@/lib/utils/buildEncodedErrorMessage';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  const safeNext =
    next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(safeNext, origin));
    }

    return NextResponse.redirect(
      buildUrlWithError(origin, 'Could not sign in')
    );
  }

  return NextResponse.redirect(buildUrlWithError(origin, 'Could not sign in'));
}

function buildUrlWithError(origin: string, message: string) {
  return new URL(`/login?error=${buildEncodedMessage(message)}`, origin);
}
