'use server';

import { createClient } from "@/app/utils/supabase/server";
import { cache } from "react";

export async function subscribe(email) {
    const supabase = await createClient();
    if (!email) {
        throw new Error('Email is required for subscription');
    }
    // Ensure email is a string
    if (typeof email !== 'string') {
        throw new Error('Email must be a string');
    }
    //todo: validate email
    const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: email.trim().toLowerCase() }]);

    if (error) {
        throw new Error('Failed to subscribe to newsletter');
    }

    return { success: true, message: 'Subscription successful' };
}


export async function unsubscribe(email) {
    const supabase = await createClient();

    const normalizedEmail = email.trim().toLowerCase();

    const { data, error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('email', normalizedEmail);

    if (error) {
        throw new Error('Failed to unsubscribe from newsletter');
    }

    return { success: true, message: 'Unsubscription successful' };
}

//fetch newsletter_issues from supabase table, url is for storage bucket
// returns [{id, volume, date, language, image_rul, created_at}, {...}]
export const getNewsletters = cache(async() => {
        const supabase = await createClient();

    const { data, error } = await supabase
        .from('newsletter_issues')
        .select('id, volume, date, language, image_url, created_at, published')
        .eq('published', true) // only fetch published newsletters
        .order('id', { ascending: false });
    if (error) {
        throw new Error('Failed to fetch newsletters');
    }
    return data.map(issue => ({
        id: issue.id,
        volume: issue.volume,
        date: issue.date,
        language: issue.language,
        image: getImageUrl(issue),
        url: getUrl(issue),
        createdAt: new Date(issue.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
    }));
});

function getUrl(issue){
    const bucketUrl = process.env.NEXT_PUBLIC_NEWSLETTER_BASE_URL;
    return bucketUrl + '/'+issue.language + '/' + issue.volume + '.pdf';
}

function getImageUrl(issue) {
        const bucketUrl = process.env.NEXT_PUBLIC_NEWSLETTER_BASE_URL;
    return bucketUrl + '/' + issue.language + '/thumbnails/' + issue.volume + '.jpg';
}