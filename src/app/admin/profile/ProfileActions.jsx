'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { sendPasswordReset } from './actions';
import Link from 'next/link';

export default function ProfileActions({data}) {
	const pathname = usePathname();

	

	const handleDeleteAccount = () => {
		console.log('Delete account clicked');
		// Delete logic here
	};

	return (
		<div className="mt-4">
			<Link className="bg-yellow text-black rounded-lg p-2 ml-2" href="/admin/profile/change-password">
				Change Password
			</Link>
			<button className="bg-red text-white rounded-lg p-2 ml-2" onClick={handleDeleteAccount}>
				Delete Account
			</button>
		</div>
	);
}