import { createClient } from "../../../utils/supabase/client";

export async function fetchVolunteerApplications() {
    const supabase = createClient();
    
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