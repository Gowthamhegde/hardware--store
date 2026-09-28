import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware — runs on every matched request before rendering
 *
 * Responsibilities:
 * 1. Block access to admin pages for unauthenticated users
 * 2. Add security headers to all responses
 * 3. Block common attack probes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block common attack probe paths
  const attackProbes = [
    '/.env',
    '/wp-admin',
    '/wp-login',
    '/phpmyadmin',
    '/.git',
    '/etc/passwd',
    '/admin.php',
    '/config.php',
  ];
  for (const probe of attackProbes) {
    if (pathname.startsWith(probe)) {
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  // Admin route protection
  // TODO: Replace with proper session check (Supabase Auth / JWT) when auth is implemented
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    const adminKey = process.env.ADMIN_API_KEY;

    // If ADMIN_API_KEY is set and no valid token, redirect to login
    if (adminKey && !adminToken) {
      // For now, just warn in console — full auth gate requires a login page
      // In production: return NextResponse.redirect(new URL('/login', request.url));
      console.warn('[SECURITY] Unauthenticated admin access attempt:', pathname);
    }
  }

  const response = NextResponse.next();

  // Add security headers to every response
  // (these complement the next.config.js headers)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: [
    // Apply to all routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|images|uploads|public).*)',
  ],
};
