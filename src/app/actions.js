'use server';

import { createClient } from '@/app/utils/supabase/server';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { getLanguage } from '@/app/utils/getLanguage';

const formatContent = async (data) => {
    const content = data.reduce((acc, item) => {
        acc[item.key] = {
            value: item.value,
            style: item.style,
            value_list: item.value_list,
            value_json: item.value_json
        };
        return acc;
    }, {});
    return content;
}


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
        return { success: false, error: 'error' };
    }

    return { success: true, message: 'Subscription successful' };
}
export const getHomePageContent = cache(async () => {
    const supabase = await createClient();
    const language = await getLanguage();
    const { data: homePageData, error } = await supabase
        .from('website_content')
        .select('value, style, key, value_list, value_json')
        .eq('page', 'home')
        .eq('language', language);

    if (error) {
        console.error(error);
        throw new Error('Failed to fetch home page content');
    }
    // [{key, value, style}]
    // transform to {key: {value, style}, ...}
    const content = formatContent(homePageData);

    return content;
});

export const getVolunteerPageContent = cache(async () => {

    const supabase = await createClient();
    const language = await getLanguage();
    const { data: volunteerPageData, error } = await supabase
        .from('website_content')
        .select('value, style, key, value_list, value_json')
        .eq('page', 'volunteer')
        .eq('language', language);

    if (error) {
        console.error(error);
        throw new Error('Failed to fetch form information');
    }
    // [{key, value, style}]
    // transform to {key: {value, style}, ...}
    const content = formatContent(volunteerPageData);

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
    const content = formatContent(data);
    return content;
});

export const getDonatePageContent = cache(async () => {
    const language = await getLanguage();
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('website_content')
        .select('key, value, value_list, value_json, style')
        .eq('page', 'donate')
        .eq('language', language); // Filter by language
    if (error) {
        console.log('Error fetching donate page content:', error);
    }
    const content = formatContent(data);
    return content;
});

export const getResourcePageContent = cache(async () => {
    const language = await getLanguage();
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('website_content')
        .select('key, value, value_list, value_json, style')
        .eq('page', 'resources')
        .eq('language', language); // Filter by language
    if (error) {
        console.log('Error fetching resource page content:', error);
    }
    const content = formatContent(data);
    return content;
});

export const getContactPageContent = cache(async () => {
    const language = await getLanguage();
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('website_content')
        .select('key, value_json')
        .eq('page', 'contact')
        .eq('language', language); // Filter by language
    if (error) {
        console.log('Error fetching contact page content:', error);
    }
    const content = formatContent(data);
    return content;
});