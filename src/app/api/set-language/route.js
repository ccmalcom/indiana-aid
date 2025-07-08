import { cookies } from 'next/headers';

export async function POST(req) {
    const cookieStore = await cookies();
	const { language } = await req.json();

	if (!language) {
		return new Response('Missing language', { status: 400 });
	}

	cookieStore.set('language', language, {
		path: '/',
		httpOnly: false,
		maxAge: 60 * 60 * 24 * 30, // 30 days
	});

	return new Response('Language set', { status: 200 });
}