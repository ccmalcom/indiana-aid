'use server';
import { createClient } from '@/app/utils/supabase/server';

export async function getVolunteerApplications() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("volunteer-applications")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching volunteer applications:", JSON.stringify(error));
        return [];
    }

    return data;
}

export async function updateVolunteerApplication(applicationId, status) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("volunteer-applications")
        .update({ status })
        .eq("id", applicationId);

    if (error) {
        console.error(`Error updating application ${applicationId}:`, JSON.stringify(error));
        return { success: false, error: error.message };
    }

    return { success: true, data };
}

export async function createVolunteerEntry(application) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("volunteers")
        .insert([
            {
                name: application.name,
                pronouns: application.pronouns,
                email: application.email,
                phone: application.phone,
                languages: application.languages,
                interest_areas: application.interest_areas,
                notes: application.additional_info,
                application_id: application.id, // Link to the original application
            },
        ]);

    if (error) {
        console.error("Error creating volunteer entry:", JSON.stringify(error));
        return { success: false, error: error.message };
    }

    return { success: true, data };
}