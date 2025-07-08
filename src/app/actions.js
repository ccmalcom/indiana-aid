'use server';

import { createClient } from '@/app/utils/supabase/server';
import { cookies } from 'next/headers';

async function getLanguage() {
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value || 'en'; // Default to 'en' if no language cookie is set
    return language;
}

export async function getNewsletterCardInfo() {
    const language = await getLanguage();
    const supabase = await createClient();
    const { data: headerText, error } = await supabase
        .from('website_content')
        .select('value')
        .eq('key', 'newsletterCardText')
        .eq('language', language) // Filter by language
        .single();
    let finalHeaderText = headerText?.value || '';
    if (!headerText?.value || error) {
        const fallbackHeaderText = await supabase
            .from('website_content')
            .select('value')
            .eq('key', 'newsletterCardText')
            .eq('language', 'en')
            .single();
        finalHeaderText = fallbackHeaderText?.data?.value || '';
    }
    const { data: buttonsData, error: buttonsError } = await supabase
        .from('website_content')
        .select('value_json')
        .eq('key', 'newsletterCardButtons')
        .eq('language', language) // Filter by language
        .single();
    let buttons = [];
    if (buttonsError || !buttonsData) {
        const fallbackButtons = await supabase
            .from('website_content')
            .select('value_json')
            .eq('key', 'newsletterCardButtons')
            .eq('language', 'en') // Fallback to English
            .single();
        buttons = fallbackButtons.data.value_json.buttons || [];
    }
    else {
        buttons = buttonsData.value_json.buttons || [];
    }
    return {
        headerText: finalHeaderText,
        buttons: buttons
    };
}

export async function getQuickLinksCardInfo() {
    const language = await getLanguage();
    const supabase = await createClient();
    const { data: headerText, error } = await supabase
        .from('website_content')
        .select('value')
        .eq('key', 'quickLinksCardText')
        .eq('language', language) // Filter by language
        .single();
    let finalHeaderText = headerText?.value || '';
    if (!headerText?.value || error) {
        const fallbackHeaderText = await supabase
            .from('website_content')
            .select('value')
            .eq('key', 'quickLinksCardText')
            .eq('language', 'en')
            .single();
        finalHeaderText = fallbackHeaderText?.data?.value || '';
    }
    const { data: buttonsData, error: buttonsError } = await supabase
        .from('website_content')
        .select('value_json')
        .eq('key', 'quickLinksCardButtons')
        .eq('language', language) // Filter by language
        .single();
    let buttons = [];
    if (buttonsError || !buttonsData) {
        const fallbackButtons = await supabase
            .from('website_content')
            .select('value_json')
            .eq('key', 'quickLinksCardButtons')
            .eq('language', 'en') // Fallback to English
            .single();
        buttons = fallbackButtons.data.value_json.buttons || [];
    }
    else {
        buttons = buttonsData.value_json.buttons || [];
    }
    return {
        headerText: finalHeaderText,
        buttons: buttons
    };
}

export async function getConnectWithUsCardInfo() {
    const language = await getLanguage();
    const supabase = await createClient();
    const { data: headerText, error } = await supabase
        .from('website_content')
        .select('value')
        .eq('key', 'connectWithUsCardText')
        .eq('language', language) // Filter by language
        .single();
    let finalHeaderText = headerText?.value || '';
    if (!headerText?.value || error) {
        const fallbackHeaderText = await supabase
            .from('website_content')
            .select('value')
            .eq('key', 'connectWithUsCardText')
            .eq('language', 'en')
            .single();
        finalHeaderText = fallbackHeaderText?.data?.value || '';
    }
    const { data: buttonsData, error: buttonsError } = await supabase
        .from('website_content')
        .select('value_json')
        .eq('key', 'connectWithUsCardButtons')
        .eq('language', language) // Filter by language
        .single();
    let buttons = [];
    if (buttonsError || !buttonsData) {
        const fallbackButtons = await supabase
            .from('website_content')
            .select('value_json')
            .eq('key', 'connectWithUsCardButtons')
            .eq('language', 'en') // Fallback to English
            .single();
        buttons = fallbackButtons.data.value_json.buttons || [];
    }
    else {
        buttons = buttonsData.value_json.buttons || [];
    }
    return {
        headerText: finalHeaderText,
        buttons: buttons
    };
}

export async function getAtAGlanceInfo() {
    const language = await getLanguage();
    const supabase = await createClient();
    const { data: headerText, error } = await supabase
        .from('website_content')
        .select('value')
        .eq('key', 'atAGlanceHeader')
        .eq('language', language) // Filter by language
        .single();
    let finalHeaderText = headerText?.value || '';
    if (!headerText?.value || error) {
        const fallbackHeaderText = await supabase
            .from('website_content')
            .select('value')
            .eq('key', 'atAGlanceHeader')
            .eq('language', 'en')
            .single();
        finalHeaderText = fallbackHeaderText?.data?.value || '';
    }
    const { data: textData, error: textError } = await supabase
        .from('website_content')
        .select('value_list')
        .eq('key', 'atAGlanceText')
        .eq('language', language) // Filter by language
        .single();
    let finalText = textData?.value_list || [];
    if (!textData?.value_list || textError) {
        const fallbackText = await supabase
            .from('website_content')
            .select('value_list')
            .eq('key', 'atAGlanceText')
            .eq('language', 'en') // Fallback to English
            .single();
        finalText = fallbackText?.data?.value_list || [];
    }
    return { headerText: finalHeaderText, text: finalText };
}