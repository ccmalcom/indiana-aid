'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { sendPasswordReset } from './actions';

export default function ProfileActions({data}) {
	const pathname = usePathname();

	const handleChangePassword = () => {
		console.log('Change password clicked');
		console.log('pathname:', pathname);
		console.log('email:', data.email);
		// Use Supabase client-side if needed
		try {
			if (!data.email) {
				throw new Error('Email is required to change password');
			}
			sendPasswordReset(data.email, pathname);
		} catch (error) {
			console.error('Error in handleChangePassword:', error);
		}

	};

	const handleDeleteAccount = () => {
		console.log('Delete account clicked');
		// Delete logic here
	};

	return (
		<div className="mt-4">
			<button className="bg-yellow text-black rounded-lg p-2 ml-2" onClick={handleChangePassword}>
				Change Password
			</button>
			<button className="bg-red text-white rounded-lg p-2 ml-2" onClick={handleDeleteAccount}>
				Delete Account
			</button>
		</div>
	);
}