'use server';
import { createClient } from "@/app/utils/supabase/server";

export async function unsubscribe(email) {
    const supabase = await createClient();

    const normalizedEmail = email.trim().toLowerCase();

    const { data, error } = await supabase
        .from('mailing_list')
        .delete()
        .eq('email', normalizedEmail);

    if (error) {
        throw new Error('Failed to unsubscribe from newsletter');
    }

    return { success: true, message: 'Unsubscription successful' };
}