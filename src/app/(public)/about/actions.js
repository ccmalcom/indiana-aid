'use server';
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from 'next/headers';

async function getLanguage() {
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value || 'en'; // Default to 'en' if no language cookie is set
    return language;
}

export async function getOurStory() {
    const language = await getLanguage();
    const supabase = await createClient();
    // console.log('supabase', supabase);
    const { data, error } = await supabase
        .from('website_content')
        .select('value_list')
        .eq('key', 'ourStory')
        .eq('language', language) // Filter by language
        .single();
    if (error) {
        console.log('Error fetching our story:', error);
        return [];
    }

    return data?.value_list || []; // Return an empty array if no data found

}

export async function getHeaderText() {
    const language = await getLanguage();
    const supabase = await createClient();
    const { data: headerText, error } = await supabase
        .from('website_content')
        .select('value')
        .eq('key', 'headerText')
        .eq('language', language) // Filter by language
        .single();
    const { data: header, error: headerError } = await supabase
        .from('website_content')
        .select('value')
        .eq('key', 'header')
        .eq('language', language) // Filter by language
        .single();
    if (headerError) {
        console.log('Error fetching header text:', headerError);
        return '';
    }

    return { headerText: headerText?.value || '', header: header.value || '' };
}

export async function getLookingAhead() {
    const language = await getLanguage();
    const supabase = await createClient();
    const { data: textData, error } = await supabase
        .from('website_content')
        .select('value')
        .eq('key', 'lookingAheadText')
        .eq('language', language) // Filter by language
        .single();

    const { data: itemData, error: itemsError } = await supabase
        .from('website_content')
        .select('value_list')
        .eq('key', 'lookingAheadItems')
        .eq('language', language) // Filter by language
        .single();

    if (error) {
        console.log('Error fetching looking ahead:', error);
        return { lookingAheadText: '', lookingAheadItems: [] };
    }
    return { lookingAheadText: textData.value || '', lookingAheadItems: itemData.value_list || [] };
}

export async function getAffiliations() {
    const language = await getLanguage();
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('website_content')
        .select('value_json')
        .eq('key', 'affiliations')
        .eq('language', language) // by language
        .single();

    if (error) {
        console.log('Error fetching affiliations:', error);
        return [];
    }

    return data.value_json.affiliations || [];
}