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


async function checkUserRoles(id){
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("admin_users")
        .select("roles")
        .eq("id", id)
        .single();
    if (error) {
        console.error("Error fetching user roles:", JSON.stringify(error));
        return [];
    }

    return data.roles;
}



export async function getUserDetails() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.error("Error fetching user details:", JSON.stringify(error));
        return null;
    }
    const roles = await checkUserRoles(data.user.id);


    const res = {
        name: data.user.user_metadata.display_name,
        email: data.user.email,
        role: roles,
        created_at: data.user.created_at,
        updated_at: data.user.updated_at,
        phone: data.user.user_metadata.phone,
        last_sign_in_at: data.user.last_sign_in_at,
        email_verified: data.user.user_metadata.email_verified,
        isSuperAdmin: roles.includes('super-admin'),

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