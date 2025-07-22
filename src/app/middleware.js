// middleware.js
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	const res = NextResponse.next();

	const supabase = createMiddlewareClient({ req, res });

	await supabase.auth.getSession(); // restores session cookie

	return res;
}

export const config = {
    matcher: ['/admin/:path*', '/invite', '/login'],
};