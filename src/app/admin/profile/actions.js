'use server';
import { createClient } from '@/app/utils/supabase/server';
import { getUser } from '@/app/(auth pages)/login/actions';

export async function validateCurrentPassword(currentPassword) {
	const supabase = await createClient();

	const user = await getUser();
	if (!user) {
		return { error: 'User not found' };
	}

	const { data, error } = await supabase.auth.signInWithPassword({
		email: user.email,
		password: currentPassword,
	});

	if (error) {
		console.error('Password validation failed:', error.message);
		return { error: 'Invalid current password' };
	}

	return { success: true };
}

export async function sendPasswordReset(email) {
    console.log(`Preparing to reset password for email: ${email}`);
	const supabase = await createClient();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const redirectUrl = `${baseUrl}/update-password`;
    console.log(`Redirecting to: ${redirectUrl}`);
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: redirectUrl,
	});
	if (error) {
		console.error('Error resetting password:::::', error);
        return { error: error.message || 'Failed to send password reset link. Please try again later.' };
	} else {
		console.log('Password reset email sent successfully');
        return { success: true, message: 'Password reset email sent successfully.' };
	}
}

export async function updateUserPassword(newPassword) {
	// console.log(`Updating user password to: ${newPassword}`);
	const supabase = await createClient();
	const { error } = await supabase.auth.updateUser({ password: newPassword });
	if (error) {
		console.error('Error updating user password:', error);
		return { error: error.message || 'Failed to update password. Please try again later.' };
	} else {
		console.log('User password updated successfully');
		return { success: true, message: 'Password updated successfully.' };
	}
}
