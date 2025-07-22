'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function handlePasswordSet({ password }) {
    const supabase = await createServerActionClient({ cookies }); // ✅ DO NOT call cookies()

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