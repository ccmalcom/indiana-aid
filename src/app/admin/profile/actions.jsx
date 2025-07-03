'use server';
import { createClient } from '@/app/utils/supabase/server';


export async function sendPasswordReset(email, pathname) {
    console.log(`Preparing to reset password for email: ${email}`);
	const supabase = await createClient();
    console.log(`Supabase client created: ${supabase}`);
    const redirectUrl = 'https://localhost:3000'+ pathname + '/update-password';
    console.log(`Redirecting to: ${redirectUrl}`);
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: redirectUrl,
	});
	if (error) {
		console.error('Error resetting password:', error);
	} else {
		console.log('Password reset email sent successfully');
	}
}
