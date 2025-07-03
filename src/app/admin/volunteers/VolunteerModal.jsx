'use client';

import { useState } from 'react';
import EditableInput from '@/app/ui/EditableInput';
// import { updateVolunteer, createVolunteer, deleteVolunteer } from '../../actions';

export default function VolunteerModal({ volunteer, onClose }) {
	if (!volunteer) return null;
	const [isLoading, setIsLoading] = useState(false);
	const [statusMessage, setStatusMessage] = useState(null);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		name: volunteer?.name || '',
		nickname: volunteer?.nickname || '',
		email: volunteer?.email || '',
		phone: volunteer?.phone || '',
		areas_of_interest: volunteer?.areas_of_interest || '',
		languages: volunteer?.languages || '',
		notes: volunteer?.notes || '',
	});

	const isDirty = () => {
		return Object.keys(formData).some((key) => {
			return formData[key] !== volunteer[key];
		});
	};

	const handleUpdate = async () => {
		console.log('Updating volunteer:', volunteer.id, formData);
		setIsLoading(true);
		setStatusMessage(null);
		setError(null);
		try {
			await updateVolunteer(volunteer.id, formData);
			setStatusMessage('Volunteer updated successfully');
		} catch (err) {
			setError('Failed to update volunteer');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="modal-viewport fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="modal bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
				<div className="modal-header flex justify-between items-center text-center mb-4">
					<h2 className="text-2xl font-bold flex-grow">Volunteer Details</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-800">
						✕
					</button>
				</div>
				<div className="modal-subtitle text-center mb-4">
					<h2 className="text-lg font-semibold">{formData.name}</h2>
				</div>
				<div className="modal-body">
					<EditableInput
						label="Name"
						initialValue={formData.name}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						name="name"
					/>
					<EditableInput
						label="Email"
						initialValue={formData.email}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						type="email"
						name="email"
						className="w-full"
					/>
					<EditableInput
						label="Phone"
						initialValue={formData.phone}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						type="tel"
						name="phone"
						className="w-full"
					/>
					<EditableInput
						label="Nickname"
						initialValue={formData.nickname}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						name="nickname"
						className="w-full"
					/>
					<EditableInput
						label="Areas of Interest"
						initialValue={formData.areas_of_interest}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						name="areas_of_interest"
						className="w-full"
					/>
					<EditableInput
						label="Languages"
						initialValue={formData.languages}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						name="languages"
						className="w-full"
					/>
					<EditableInput
						label="Notes"
						initialValue={formData.notes}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						name="notes"
						className="w-full"
						type="textarea"
					/>
				</div>
				<div className="modal-footer mt-6 flex justify-center">
					<button
						className={
							isDirty()
								? `bg-blue text-white px-4 py-2 rounded mx-2 `
								: `bg-gray text-white px-4 py-2 rounded mx-2 opacity-50 cursor-not-allowed`
						}
						disabled={!isDirty()}
						onClick={handleUpdate}>
						Submit Updates
					</button>
					<button className="bg-red text-white px-4 py-2 rounded mx-2">
						Delete Volunteer
					</button>
				</div>
				{isLoading && <p className="text-blue-500">Loading...</p>}
			</div>
		</div>
	);
}
