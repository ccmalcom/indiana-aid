'use server';
import { createClient } from '@/app/utils/supabase/server';

export async function getAllAdminUsers() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Error fetching admin users:", JSON.stringify(error));
        return [];
    }

    return data;
}