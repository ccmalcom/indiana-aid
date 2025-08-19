'use server';
import { createClient } from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function getSubscribersInfo(){
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching subscribers:", JSON.stringify(error));
        return [];
    }

    return data;
}

export async function editSubscriberEmail(subscriberId, newEmail) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("newsletter_subscribers")
        .update({ email: newEmail })
        .eq("id", subscriberId);    
    if (error) {
        console.error(`Error updating subscriber ${subscriberId}:`, JSON.stringify(error));
        return { success: false, error: error.message };
    }

    return { success: true, data };
}

export async function deleteSubscriber(subscriberId) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("newsletter_subscribers")
        .delete()
        .eq("id", subscriberId);

    if (error) {
        console.error(`Error deleting subscriber ${subscriberId}:`, JSON.stringify(error));
        return { success: false, error: error.message };
    }

    return { success: true, data };
}

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

export async function createVolunteerEntry(application) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("volunteers")
        .insert([
            {
                name: application.name,
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

export async function logoutUser() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error logging out user:", JSON.stringify(error));
        return { success: false, error: error.message };
    }
    // revalidatePath('/', 'layout');
    redirect('/logout');
    return { success: true };
}

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

export async function getUserDetails() {
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
        updated_at: data.user.updated_at,
        phone: data.user.user_metadata.phone,
        last_sign_in_at: data.user.last_sign_in_at,
        email_verified: data.user.user_metadata.email_verified,

    }

    return res;
}

export async function updateUserPassword(formData) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.updateUser({
        password: formData.get('password'),
    });
    if (error) {
        console.error("Error updating user password:", JSON.stringify(error));
        return { success: false, error: error.message };
    }

    return { success: true, data };
}

// for admin portal quick view
export async function getNewsletterCardInfo() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("newsletter_issues")
        .select("*")
        .order("volume", { ascending: false });

    if (error) {
        console.error("Error fetching newsletter issues:", JSON.stringify(error));
        return [];
    }

    const res = {
        current_issue: data[0].volume || null,
        total_issues: data.length || 0,
        current_issue_date: data[0].date || null,
        thumbnail: formatThumbnailUrl(data[0]),
    }
    return res;
}



export async function getNewsletterSubscriberCount() {
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