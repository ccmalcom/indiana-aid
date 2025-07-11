import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const supabase = await createClient();
    try {
        const body = await request.json();
        if (!body || !body.displayName || !body.email) {
            return NextResponse.json({ success: false, error: 'Invalid input data' }, { status: 400 });
        }
        // Log the incoming request body for debugging
        // console.log('Request body:', body);
        const { data, error } = await supabase.auth.updateUser({
            data: {
                display_name: body.displayName,
                email: body.email,
                phone: body.phone || null, // Optional field
            },
        });
        // console.log('Update user response:', data);
        if (error) {
            console.error('Error updating user:', error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
        // Return the updated user data
        const updatedUser = {
            name: data.user.user_metadata.display_name,
            email: data.user.email,
            phone: data.user.phone,
            created_at: data.user.created_at,
            updated_at: data.user.updated_at,
            last_sign_in_at: data.user.last_sign_in_at,
            email_verified: data.user.user_metadata.email_verified,
        };
        return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error('Error in /api/user/update:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}