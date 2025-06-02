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

export async function getPendingVolunteerApplications() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("volunteer-applications")
        .select("*")
        .eq("status", "Pending")
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Error fetching pending volunteer applications:", JSON.stringify(error));
        return [];
    }
    return data;
}

export async function getUserDetails(){
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.error("Error fetching user details:", JSON.stringify(error));
        return null;
    } 

    const res = {
        name: data.user.user_metadata.display_name,
        email: data.user.email,
        role: data.user.role,
        created_at: data.user.created_at,
        phone: data.user.phone,
        last_sign_in_at: data.user.last_sign_in_at,
        email_verified: data.user.user_metadata.email_verified,

    }

    return res;
}

export async function getNewsletterInfo(){
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("newsletter_issues")
        .select("*")
        .order("created_at", { ascending: false });
    
        // console.log('Fetched newsletters:', { data, error });
    if (error) {
        console.error("Error fetching newsletter issues:", JSON.stringify(error));
        return [];
    }

    const res ={
        current_issue: data[0].volume || null,
        total_issues: data.length || 0,
        current_issue_date: data[0].date || null,
        thumbnail: formatThumbnailUrl(data[0]),
    }
    return res;
}

export async function getNewsletterSubscriberCount(){
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*", { count: 'exact' });
    if (error) {
        console.error("Error fetching newsletter subscribers:", JSON.stringify(error));
        return [];
    }
    
    // console.log(data.length);
    return data.length;
}

export async function getMailingListSubscribers() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });
    
    if (error) {
        console.error("Error fetching mailing list subscribers:", JSON.stringify(error));
        return [];
    }
    
    return data;
}

function formatThumbnailUrl(newsletter) {
    const baseUrl = process.env.NEXT_PUBLIC_NEWSLETTER_BASE_URL;
    const language = newsletter.language || '';
    const issue = newsletter.volume || '';

    return `${baseUrl}/${language}/thumbnails/${issue}.jpg`;
}