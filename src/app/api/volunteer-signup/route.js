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
    const { name, email, phone,languages, areasOfInterest, additionalInfo } = await request.json();

    const { data, error } = await supabase
        .from('volunteer-applications')
        .insert({
            name: name,
            email: email,
            phone: phone,
            languages: languages,
            interest_areas: areasOfInterest,
            additional_info: additionalInfo,
        });

    if (error) {
        return Response.json({ success: false, error });
    }

    return Response.json({ success: true, data });
}