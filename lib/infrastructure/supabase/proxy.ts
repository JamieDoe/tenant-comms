import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseEnvVars } from '@/lib/utils/getEnvVariables';

export async function updateSession(request: NextRequest) {
  const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } = getSupabaseEnvVars();

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookies) {
        cookies.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        cookies.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  const user = data?.user ?? null;
  const pathname = request.nextUrl.pathname;

  // Not logged in — redirect to appropriate login
  if (
    !user &&
    !pathname.startsWith('/login') &&
    !pathname.startsWith('/register') &&
    !pathname.startsWith('/auth') &&
    !pathname.startsWith('/tenant-portal/login')
  ) {
    if (pathname.startsWith('/tenant-portal')) {
      return NextResponse.redirect(new URL('/tenant-portal/login?expired=true', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Logged in — check onboarding for agent routes
  // if (
  //   user &&
  //   !pathname.startsWith('/tenant-portal') &&
  //   !pathname.startsWith('/onboarding') &&
  //   !pathname.startsWith('/auth')
  // ) {
  //   const { data: profile } = await supabase
  //     .from('profiles')
  //     .select('agency_id')
  //     .eq('id', user.id)
  //     .single();

  //   if (!profile?.agency_id) {
  //     return NextResponse.redirect(new URL('/onboarding', request.url));
  //   }
  // }

  return supabaseResponse;
}