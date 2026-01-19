// middleware.js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	let supabaseResponse = NextResponse.next({
		request: req,
	});

	const supabase = createServerClient(
		process.env.SUPABASE_URL,
		process.env.SUPABASE_KEY,
		{
			cookies: {
				getAll() {
					return req.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						req.cookies.set(name, value)
					);
					supabaseResponse = NextResponse.next({
						request: req,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options)
					);
				},
			},
		}
	);

	// Refresh session if expired - required for Server Components
	// This will handle token refresh automatically
	// Note: getSession() may log expected auth errors for users without valid sessions
	const {
		data: { session },
	} = await supabase.auth.getSession();

	// Only redirect to login if trying to access admin pages without a session
	if (!session && req.nextUrl.pathname.startsWith('/admin')) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	return supabaseResponse;
}

export const config = {
	matcher: ['/admin/:path*', '/invite', '/login'],
};