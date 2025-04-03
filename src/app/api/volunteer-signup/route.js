//starter code for supabase
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export async function POST(request) {
    const testData = {
        first_name: 'Test',
        last_name: 'Test',
        nickname: 'Test',
        phone: '1234567890',
        email: 'test@example.com',
        areas_of_interest: ['Visitation', 'Food Pantry'],
        notes: 'This is a test submission.',
    }
    // const { name, email, phone, interests, additionalInfo } = await request.json();

    const { data, error } = await supabase
        .from('volunteers')
        .insert([testData])
        .select();

    if (error) {
        return Response.json({ success: false, error });
    }

    return Response.json({ success: true, data });
}