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
    }
    if (!data?.value_list) {
        const fallback = await supabase
            .from('website_content')
            .select('value_list')
            .eq('key', 'ourStory')
            .eq('language', 'en')
            .single();
        return fallback?.data?.value_list || [];
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
    let finalHeaderText = headerText?.value || '';
    if (!headerText?.value) {
        const fallbackHeaderText = await supabase
            .from('website_content')
            .select('value')
            .eq('key', 'headerText')
            .eq('language', 'en')
            .single();
        finalHeaderText = fallbackHeaderText?.data?.value || '';
    }
    const { data: header, error: headerError } = await supabase
        .from('website_content')
        .select('value')
        .eq('key', 'header')
        .eq('language', language) // Filter by language
        .single();
    let finalHeader = header?.value || '';
    if (!header?.value) {
        const fallbackHeader = await supabase
            .from('website_content')
            .select('value')
            .eq('key', 'header')
            .eq('language', 'en')
            .single();
        finalHeader = fallbackHeader?.data?.value || '';
    }
    if (headerError) {
        console.log('Error fetching header text:', headerError);
    }

    return { headerText: finalHeaderText, header: finalHeader };
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
    let finalText = textData?.value || '';
    if (!textData?.value) {
        const fallbackText = await supabase
            .from('website_content')
            .select('value')
            .eq('key', 'lookingAheadText')
            .eq('language', 'en')
            .single();
        finalText = fallbackText?.data?.value || '';
    }

    const { data: itemData, error: itemsError } = await supabase
        .from('website_content')
        .select('value_list')
        .eq('key', 'lookingAheadItems')
        .eq('language', language) // Filter by language
        .single();
    let finalItems = itemData?.value_list || [];
    if (!itemData?.value_list) {
        const fallbackItems = await supabase
            .from('website_content')
            .select('value_list')
            .eq('key', 'lookingAheadItems')
            .eq('language', 'en')
            .single();
        finalItems = fallbackItems?.data?.value_list || [];
    }

    if (error) {
        console.log('Error fetching looking ahead:', error);
    }
    return { lookingAheadText: finalText, lookingAheadItems: finalItems };
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
    }
    if (!data?.value_json?.affiliations) {
        const fallback = await supabase
            .from('website_content')
            .select('value_json')
            .eq('key', 'affiliations')
            .eq('language', 'en')
            .single();
        return fallback?.data?.value_json?.affiliations || [];
    }

    return data.value_json.affiliations || [];
}