import { NextResponse } from 'next/server';

export async function POST(req) {
	const { language } = await req.json();

	if (!language) {
		return new Response('Missing language', { status: 400 });
	}

	console.log('Saving language to cookies:', language);

	const res = NextResponse.json({ message: 'Language set' });

	res.cookies.set('language', language, {
		path: '/',
		httpOnly: false,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 30, // 30 days
	});

	return res;
}