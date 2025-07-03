'use client';

import { sendPasswordReset } from '../actions';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function ResetLink({ data }) {
	const pathname = usePathname();
	const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

	const handleChangePassword = async () => {
		setLoading(true);
		console.log('Change password clicked');
		console.log('pathname:', pathname);
		console.log('email:', data.email);
		// Use Supabase client-side if needed
		try {
			if (!data.email) {
				throw new Error('Email is required to change password');
			}
			const response =  await sendPasswordReset(data.email, pathname);
            console.log('response:', response);
			if (response.error) {
                setError(response.error);
                setSuccess(false);
            } else {
                setSuccess(true);
                setError(null);
            }
		} catch (error) {
            setError(error.message || 'Failed to send password reset link. Please try again later.');
            setSuccess(false);
			console.error('Error in handleChangePassword:', error);
        
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{loading ? (
                <div className="flex justify-center items-center mt-4">

				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue border-opacity-75"></div>
                </div>
			) : (
				<button
					className=" hover:bg-blue bg-[#0056b3] text-white py-2 px-4 rounded w-full mt-2"
					onClick={handleChangePassword}
					disabled={loading}>
					Send Reset Link
				</button>
			)}
            {success && (
                <p className="text-green mt-2">
                    Password reset link sent successfully!
                </p>
            )}
            {error && (
                <p className="text-red mt-2">
                    {error}
                </p>
            )}
            
		</>
	);
}
