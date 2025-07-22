'use server';

import { createClient } from '@/app/utils/supabase/server';
import { cookies } from 'next/headers';

export async function handlePasswordSet({ password }) {
    const supabase = await createClient();

    if (!password) {
        return { error: new Error('Password is required.') };
    }

    try {
        const { error } = await supabase.auth.updateUser({ password });

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error('Error setting password:', error);
        return { error };
    }
}