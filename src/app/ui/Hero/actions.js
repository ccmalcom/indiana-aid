'use server';

import { createClient } from '@/app/utils/supabase/server';
import { cookies } from 'next/headers';

export async function getHeroText() {
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value || 'en'; // Default to
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('website_content')
        .select('value')
        .eq('key', 'heroText')
        .eq('language', language) // Use the detected language
        .single();
    // If there's an error or no data, fallback to English
    if (error || !data) {
        const fallback = await supabase
            .from('website_content')
            .select('value')
            .eq('key', 'heroText')
            .eq('language', 'en') // Fallback to English
            .single();
        if (fallback.error) {
            console.error('Error fetching fallback hero text:', fallback.error);
            return { heroText: 'Welcome to Indiana AID' }; // Fallback text
        }
        return { heroText: fallback.data.value || 'Welcome to Indiana AID' };
    }

    return { heroText: data.value || 'Welcome to Indiana AID' };
}

export async function getHeroButtons() {
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value || 'en'; // Default to 'en'
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('website_content')
        .select('value_json')
        .eq('key', 'heroButtons')
        .eq('language', language) // Use the detected language
        .single();

        console.log('heroButtons data:', data.value_json.buttons);
    if (error || !data) {
        const fallback = await supabase
            .from('website_content')
            .select('value_json')
            .eq('key', 'heroButtons')
            .eq('language', 'en') // Fallback to English
            .single();
        return { heroButtons: fallback.data.value_json.buttons || [] };
    }

    return { heroButtons: data.value_json.buttons || [] };
}