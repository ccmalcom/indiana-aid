// middleware.js
import { createMiddlewareClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	const res = NextResponse.next();

	const supabase = createMiddlewareClient({
		req,
		res,
		supabaseUrl: process.env.SUPABASE_URL,
		supabaseKey: process.env.SUPABASE_KEY,
	});

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session && req.nextUrl.pathname.startsWith('/admin')) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	return res;
}

export const config = {
	matcher: ['/admin/:path*', '/invite', '/login'],
};