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

import { createServiceClient } from '@/app/utils/supabase/serviceWorker';

export async function inviteNewUser({ email, name, roles }) {
    const serviceSupabase = await createServiceClient();

    const supabase = await createClient();
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
    const { error: dbError } = await supabase
        .from('admin_users')
        .insert({
            id: authData.user.id,
            user_email: email,
            name: name,
            roles,
        });

    if (dbError) {
        console.error('Error inserting admin user:', dbError);
        return { error: {message: dbError.message, status: dbError.status} };
    }

    return { success: true, user: authData.user };
}
