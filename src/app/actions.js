'use server';

import { createClient } from '@/app/utils/supabase/server';
import { cookies } from 'next/headers';
import { cache } from 'react';

async function getLanguage() {
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value || 'en'; // Default to 'en' if no language cookie is set
    return language;
}

export const getNewsletterCardInfo = cache(async () => {
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
});

export const getQuickLinksCardInfo = cache(async () => {
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
});

export const getConnectWithUsCardInfo = cache(async () => {
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
});

export const getAtAGlanceInfo = cache(async () => {
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
});

export const subscribeToMailingList = async (email) => {
    const supabase = await createClient();
    if (!email) {
        console.log('Email is required for subscription');
        return { success: false, error: 'Email is required for subscription' };
    }
    // Ensure email is a string
    if (typeof email !== 'string') {
        console.log('Email must be a string');
        return { success: false, error: 'Email must be a string' };
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log('Invalid email format');
        return { success: false, error: 'Invalid email format' };
    }
    const { data, error } = await supabase
        .from('mailing_list')
        .insert([{ email: email.trim().toLowerCase() }]);

    if (error && error.code !== '23505') {

        console.log('Error subscribing to mailing list:', error);
        console.log('Data:', data);
        return { success: false, error: 'error' };
    }

    return { success: true, message: 'Subscription successful' };
}

export const getVolunteerPageContent = cache(async () => {

    const supabase = await createClient();
    const language = await getLanguage();
    const { data: volunteerPageData, error } = await supabase
        .from('website_content')
        .select('value, style, key, value_list')
        .eq('page', 'volunteer')
        .eq('language', language);

    if (error) {
        console.error(error);
        throw new Error('Failed to fetch form information');
    }
    // [{key, value, style}]
    // transform to {key: {value, style}, ...}
    const content = volunteerPageData.reduce((acc, item) => {
        acc[item.key] = {
            value: item.value,
            style: item.style,
            value_list: item.value_list
        };
        return acc;
    }, {});

    return content;
});

export const getAboutPageContent = cache(async () => {
    const language = await getLanguage();
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('website_content')
        .select('key, value, value_list, value_json, style')
        .eq('page', 'about')
        .eq('language', language); // Filter by language
    if (error) {
        console.log('Error fetching about page content:', error);
    }
    const content = data.reduce((acc, item) => {
        acc[item.key] = {
            value: item.value,
            value_list: item.value_list,
            value_json: item.value_json,
            style: item.style
        };
        return acc;
    }, {});
    return content;
});