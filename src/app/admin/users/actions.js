'use server';
import { createClient } from '@/app/utils/supabase/server';
import { createServiceClient } from '@/app/utils/supabase/serviceWorker';


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

export async function inviteNewUser({ email, name, roles }) {
    const supabase = await createClient();
    // first check user access
    const accessResult = await checkUserAccess(supabase);
    if (accessResult.error) {
        return { error: accessResult.error };
    }
    const serviceSupabase = await createServiceClient();
    // Invite user via Supabase Auth - sends email with magic link
    const { data: authData, error: authError } = await serviceSupabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/invite`,
        data: {
            name: name,
            roles: roles,
        }
    });

    if (authError) {
        console.error('Error inviting user:', authError);
        return { error: {message: authError.message, status: authError.status} };
    }

    // Also insert into admin_users table
    const dbResult = await addUserToDatabase(authData.user, name, roles, supabase);
    if (dbResult.error) {
        return { error: dbResult.error };
    }

    return { success: true, user: authData.user };
}

export async function updateUser({ id, name, roles }) {
    const supabase = await createClient();
    // first check user access
    const accessResult = await checkUserAccess(supabase);
    if (accessResult.error) {
        return { error: accessResult.error };
    }

    const { error } = await supabase
        .from('admin_users')
        .update({
            name: name,
            roles: roles,
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating admin user:', error);
        return { error: { message: error.message, status: error.status } };
    }

    return { success: true };
};

async function addUserToDatabase(user, name, roles, supabase) {
    const { error: dbError } = await supabase
        .from('admin_users')
        .insert({
            id: user.id,
            user_email: user.email,
            name: name,
            roles,
        });

    if (dbError) {
        console.error('Error inserting admin user:', dbError);
        return { error: { message: dbError.message, status: dbError.status } };
    }
    return { success: true };
};

async function checkUserAccess(supabase){

    const { data: currentUser, error: currentUserError } = await supabase.auth.getUser();

    if (currentUserError || !currentUser.user) {
        return { error: { message: 'Unauthorized', status: 401 } };
    }

    const { data: adminUser, error: adminUserError } = await supabase
        .from('admin_users')
        .select('roles')
        .eq('id', currentUser.user.id)
        .single();

    if (adminUserError || !adminUser || !adminUser.roles.includes('super-admin')) {
        return { error: { message: 'Forbidden', status: 403 } };
    }
    return { success: true };
};