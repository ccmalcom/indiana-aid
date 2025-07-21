import { createClient } from '@supabase/supabase-js';

export function createServiceClient() {
    return createClient(
        process.env.SUPABASE_URL,
        process.env.SERVICE_ROLE_KEY // NEVER expose this to the browser
    );
}