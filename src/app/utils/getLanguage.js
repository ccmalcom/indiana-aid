'use server';
import { cookies } from 'next/headers';

export async function getLanguage() {
    console.log('Fetching language from cookies');
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value || 'en'; // Default to 'en' if no language cookie is set
    console.log('Detected language:', language);
    return language;
}