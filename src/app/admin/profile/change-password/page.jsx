'use client';
import Link from 'next/link';
import { validateCurrentPassword, updateUserPassword } from '../actions';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function ChangePassword() {
	const [passwordRequirements, setPasswordRequirements] = useState({
		lowercase: false,
		uppercase: false,
		number: false,
		specialChar: false,
		length: false,
	});
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const passwordsMatch = newPassword === confirmPassword;
	const passwordValid = Object.values(passwordRequirements).every(Boolean);

	const handlePasswordInput = (value) => {
		setNewPassword(value);
		setPasswordRequirements({
			lowercase: /[a-z]/.test(value),
			uppercase: /[A-Z]/.test(value),
			number: /\d/.test(value),
			specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value),
			length: value.length >= 8,
		});
	};

	const handlePasswordChange = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		if (!passwordsMatch || !passwordValid) {
			alert('Please ensure passwords match and meet all requirements.');
			setLoading(false);
		}
		try {
			const validationResponse = await validateCurrentPassword(currentPassword);
			if (validationResponse.error) {
				setError(validationResponse.error);
				setLoading(false);
				return;
			}
			// If current password is valid, proceed to update
			const updateResponse = await updateUserPassword(newPassword);
			if (updateResponse.error) {
				setError(updateResponse.error);
			}
			setSuccess(true);
		} catch (error) {
			console.error('Error validating current password:', error);
			setError('Failed to validate current password. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		// clicking the button will send reset password email from supabase

		<div className="viewport min-h-[66vh] text-center">
			<div className="header grid grid-cols-4">
				<Link
					href="/admin/profile"
					className="text-blue hover:underline col-span-1 text-left p-4">
					<FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
				</Link>
				<h1 className="text-2xl font-semibold my-4 col-span-2">
					Change Password
				</h1>
			</div>
			{/* have user revalidate current password */}
			<div className="flex flex-col items-center space-y-4">
				<p className="text-gray-600">
					To change your password, please enter your current password and then
					your new password.
				</p>
				<p className="my-4 text-sm text-gray-500">
					Password should contain at least:
				</p>
				<ul className="list-disc list-inside text-left text-sm mb-4">
					<li
						className={`${passwordRequirements.lowercase ? 'text-green' : 'text-red'}`}>
						One lowercase letter (a-z)
					</li>
					<li
						className={`${passwordRequirements.uppercase ? 'text-green' : 'text-red'}`}>
						One uppercase letter (A-Z)
					</li>
					<li
						className={`${passwordRequirements.number ? 'text-green' : 'text-red'}`}>
						One number (0-9)
					</li>
					<li
						className={`${passwordRequirements.specialChar ? 'text-green' : 'text-red'}`}>
						One special character (!@#$%^&amp;*()_+-=[]
						{};&#39;:&quot;|&lt;&gt;?,./`~).
					</li>
					<li
						className={`${passwordRequirements.length ? 'text-green' : 'text-red'}`}>
						Minimum length of 8 characters
					</li>
				</ul>
				{loading ? (
					<div className="flex flex-col justify-center items-center space-y-4">
						<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue border-opacity-75"></div>
					</div>
				) : (
					<form className="flex flex-col items-center space-y-4">
						<input
							type="password"
							placeholder="Current Password"
							className="border p-2 rounded w-full"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
						/>
						<input
							type="password"
							placeholder="New Password"
							className="border p-2 rounded w-full"
							value={newPassword}
							onChange={(e) => handlePasswordInput(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Confirm New Password"
							className="border p-2 rounded w-full"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						{!passwordsMatch && (
							<p className="text-red text-sm">Passwords do not match.</p>
						)}
						{!passwordValid && (
							<p className="text-red text-sm">
								Password does not meet requirements.
							</p>
						)}
						{error && <p className="text-red text-sm">{error}</p>}
						{success && (
							<p className="text-green text-sm">
								Password changed successfully!
							</p>
						)}
						<button
							type="submit"
							className={`bg-blue text-white px-4 py-2 rounded ${!passwordsMatch || !passwordValid ? 'opacity-50 cursor-not-allowed' : ''}`}
							disabled={!passwordsMatch || !passwordValid}
							onClick={handlePasswordChange}>
							Change Password
						</button>
					</form>
				)}
				<Link href="/admin/profile/forgot-password" className="text-blue hover:underline">
					Forgot Password?
				</Link>
			</div>
		</div>
	);
}
