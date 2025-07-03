'use client';
import React, { useState } from 'react';
import EditableInput from '@/app/ui/EditableInput';

export default function ProfileDataForm({ data }) {
	const [formData, setFormData] = useState({
		displayName: data.name || '',
		email: data.email || '',
		phone: data.phone || '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const isDirty =
		formData.displayName !== (data.name || '') ||
		formData.email !== (data.email || '') ||
		formData.phone !== (data.phone || '');

	const handleUpdateProfile = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		console.log('ProfileDataForm data:', JSON.stringify(formData));
		// Handle profile update logic here
		// For example, you can call supabase.auth.updateUser() with the new values
		const updatedData = {
			displayName: formData.displayName,
			email: formData.email,
			phone: formData.phone,
		};
		try {
			// call api /user/update with updatedData
			const response = await fetch('/api/user/update', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedData),
			});
			if (!response.ok) {
				console.error('Failed to update profile:', response.statusText);
				setError(
					error.message || 'Failed to update profile. Please try again later.'
				);
				throw new Error('Failed to update profile');
			}
			const result = await response.json();
			if (result.success) {
				console.log('Profile updated successfully:', result);
				setSuccess(true);
			}
		} catch (error) {
			console.error('Error updating profile:', error);
			setError(
				error.message || 'Failed to update profile. Please try again later.'
			);
		} finally {
			setIsLoading(false);
			// Reset form data to the latest values
			data.name = formData.displayName;
			data.email = formData.email;
			data.phone = formData.phone;
			setTimeout(() => {
				setSuccess(false);
				setError(null);
			}, 5000); // Reset success message after 5 seconds
		}
	};

	return (
		<div className="profile-details mx-auto w-[80%] lg:w-[60%] border-2 border-blue rounded-lg p-4 flex flex-col space-y-4">
			<h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
			{isLoading ? (
				<div className="min-h-[200px] flex items-center justify-center text-lg text-blue">
					<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue border-opacity-75"></div>
				</div>
			) : (
				<form className="min-h-[200px]">
					<EditableInput
						initialValue={formData.displayName}
						onChange={(value, name) => {
							setFormData((prev) => ({ ...prev, [name]: value }));
						}}
						label="Display Name"
						type="text"
						name="displayName"
						placeholder="Enter your display name"
						className="w-full"
					/>
					<br />
					<EditableInput
						initialValue={formData.email}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						type="email"
                        name="email"
						label="Email"
						placeholder="Enter your email"
						className="w-full"
					/>
					<br />
					<EditableInput
						initialValue={formData.phone}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						label="Phone"
						name="phone"
						type="tel"
						placeholder="xxx-xxx-xxxx"
						className="w-full"
					/>
				</form>
			)}
			{success && (
				<div className="text-green p-4 rounded-lg">
					Profile updated successfully!
				</div>
			)}
			{error && <div className="text-red p-4 rounded-lg">{error}</div>}
			<div className="button-group flex justify-center m">
				<button
					onClick={handleUpdateProfile}
					disabled={!isDirty}
					className={`rounded-lg p-2 ${isDirty ? 'bg-blue text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
					Update Profile
				</button>
				
			</div>
            <div className="flex items-center mx-auto w-[50%] flex-col">
				<p>Created at: {new Date(data.created_at).toLocaleDateString()}</p>
				<p>Last updated at: {new Date(data.updated_at).toLocaleDateString()}</p>
			</div>
		</div>
	);
}
