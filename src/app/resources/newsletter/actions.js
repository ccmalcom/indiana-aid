'use server';

import { createClient } from "@/app/utils/server";

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
    const { data, error } = await supabase.functions.invoke('subscriber', {
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });
    console.log('Supabase function result:', { data, error });

    if (error) {
        throw new Error('Failed to subscribe to newsletter');
    }

    return { success: true, message: 'Subscription successful' };
}

export async function unsubscribe(email) {
    const supabase = await createClient();
    const normalizedEmail = email.trim().toLowerCase();

    console.log('Attempting to unsubscribe:', normalizedEmail);

    const { data, error } = await supabase.functions.invoke('unsubscriber',{
        body: JSON.stringify({ email: normalizedEmail }),
    })
    console.log('Supabase delete result:', { data, error });

    if (error) {
        throw new Error('Failed to unsubscribe from newsletter');
    }

    return { success: true, message: 'Unsubscription successful' };
}