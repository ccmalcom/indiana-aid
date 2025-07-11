'use server';
import { cookies } from 'next/headers';

export async function getLanguage() {
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value || 'en'; // Default to 'en' if no language cookie is set
    return language;
}