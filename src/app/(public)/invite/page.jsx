'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';
import { handlePasswordSet } from './actions';

export default function InvitePage() {
	const supabase = createClient();
	const router = useRouter();
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [settingPassword, setSettingPassword] = useState(false);
	const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
        length: false,
    });

    const handlePasswordInput = (value) => {
        setPassword(value);
        setPasswordRequirements({
            lowercase: /[a-z]/.test(value),
            uppercase: /[A-Z]/.test(value),
            number: /\d/.test(value),
            specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value),
            length: value.length >= 8,
        });
    };

    const passwordValid = Object.values(passwordRequirements).every(Boolean);

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
				router.replace('/admin');
			}, 3000);
		}
	};

    if (error === 'Missing invite token.') {
            router.replace('/error?message=Missing invite token. Please check your invite link.');
	}

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
						Password should contain at least: 
					</p>
                    <ul className="list-disc list-inside text-left text-sm mb-4">
                        <li className={`${passwordRequirements.lowercase ? 'text-green' : 'text-red'}`}>One lowercase letter (a-z)</li>
                        <li className={`${passwordRequirements.uppercase ? 'text-green' : 'text-red'}`}>One uppercase letter (A-Z)</li>
                        <li className={`${passwordRequirements.number ? 'text-green' : 'text-red'}`}>One number (0-9)</li>
                        <li className={`${passwordRequirements.specialChar ? 'text-green' : 'text-red'}`}>One special character (!@#$%^&amp;*()_+-=[]
						{};&#39;:&quot;|&lt;&gt;?,./`~).</li>
                        <li className={`${passwordRequirements.length ? 'text-green' : 'text-red'}`}>Minimum length of 8 characters</li>
                    </ul>					{error && <p className="text-red mb-4">{error}</p>}
					{settingPassword ? (
						<p>Setting password...</p>
					) : (
						<div>
							{passwordSuccess ? (
								<p className="text-green mb-4">
									Password set successfully! Redirecting to admin portal...
								</p>
							) : (
								<form onSubmit={handleSubmit} className="space-y-4">
									<input
										type="password"
										placeholder="New Password"
										value={password}
										onChange={(e) => handlePasswordInput(e.target.value)}
										required
										className="w-full border p-2 rounded"
									/>
									<button
										type="submit"
										className={`text-white px-4 py-2 rounded ${passwordValid ? 'bg-blue hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
										disabled={!passwordValid}
									>
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
