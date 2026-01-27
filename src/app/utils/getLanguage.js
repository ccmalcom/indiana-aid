/****
 * Utility functions for language detection.
 * 
 * This module provides a function to retrieve the user's language preference
 * from cookies in a Next.js server environment.
 */

/**
 * Retrieves the user's language preference from cookies.
 * 
 * @returns {Promise<string>} The language code from the 'language' cookie, or 'en' if not set.
 * Defaults to 'en' when no language cookie is found.
 */

'use server';
import { cookies } from 'next/headers';

export async function getLanguage() {
    console.log('Fetching language from cookies');
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value || 'en'; // Default to 'en' if no language cookie is set
    // console.log('Detected language:', language);
    return language;
}