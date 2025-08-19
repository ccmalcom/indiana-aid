'use server';
import { createClient } from '@/app/utils/supabase/server';



export async function getVolunteers() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("volunteers")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching volunteers:", JSON.stringify(error));
        return [];
    }

    return data;
}

