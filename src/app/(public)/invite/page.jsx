'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { handlePasswordSet } from './actions';

export default function InvitePage() {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [settingPassword, setSettingPassword] = useState(false);
	const [passwordSuccess, setPasswordSuccess] = useState(false);

	useEffect(() => {
		const hash = window.location.hash;

		if (hash.includes('access_token')) {
			const params = new URLSearchParams(hash.slice(1));
			const session = {
				access_token: params.get('access_token'),
				refresh_token: params.get('refresh_token'),
				expires_in: parseInt(params.get('expires_in')),
				token_type: params.get('token_type'),
			};

			supabase.auth
				.setSession(session)
				.then(({ error }) => {
					if (error) {
						setError('Invalid or expired invite link.');
					} else {
						setLoading(false);
					}
				})
				.catch((err) => {
					console.error('Error setting session:', err);
					setError('Unexpected error during sign-in.');
				});
		} else {
			setError('Missing invite token.');
			setLoading(false);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSettingPassword(true);

		const { error } = await handlePasswordSet({ password });

		if (error) {
			setError(error.message);
			setPasswordSuccess(false);
			setSettingPassword(false);
		} else {
			setPasswordSuccess(true);
			setSettingPassword(false);
			setTimeout(() => {
				router.replace('/login?set=success');
			}, 3000);
		}
	};

	// Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};':"|<>?,./`~
	return (
		<div className="max-w-md mx-auto mt-16 p-6 border rounded shadow text-center">
			{loading ? (
				<p className="p-6">Signing you in...</p>
			) : (
				<div>
					<h1 className="text-xl font-bold mb-4">Welcome!</h1>
					<p className="">Please set your password to continue.</p>
					<p className="my-4 text-sm text-gray-500">
						Password should contain at least one Capital letter, one lowercase
						letter, one number, and one special character (!@#$%^&amp;*()_+-=[]
						{};&#39;:&quot;|&lt;&gt;?,./`~).
					</p>
					{error && <p className="text-red mb-4">{error}</p>}
					{settingPassword ? (
						<p>Setting password...</p>
					) : (
						<div>
							{passwordSuccess ? (
								<p className="text-green mb-4">
									Password set successfully! Redirecting to login screen...
								</p>
							) : (
								<form onSubmit={handleSubmit} className="space-y-4">
									<input
										type="password"
										placeholder="New Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										className="w-full border p-2 rounded"
									/>
									<button
										type="submit"
										className="bg-blue text-white px-4 py-2 rounded">
										Set Password & Continue
									</button>
								</form>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
