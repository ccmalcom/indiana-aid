'use client';

import { useState } from 'react';
import EditableInput from '@/app/ui/EditableInput';
// import { updateVolunteer, createVolunteer, deleteVolunteer } from '../../actions';
import { getVolunteerApplicationById } from './actions';

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
		interest_areas: volunteer?.interest_areas || '',
		languages: volunteer?.languages || '',
		notes: volunteer?.notes || '',
		pronouns: volunteer?.pronouns || '',
	});
	const [appData, setAppData] = useState(null);
	const [showAppData, setShowAppData] = useState(false);

	const isDirty = () => {
		return Object.keys(formData).some((key) => {
			return formData[key] !== volunteer[key];
		});
	};

	const handleGetApplication = async () => {
		setShowAppData(true);
		getVolunteerApplicationById(volunteer.application_id)
			.then((data) => {
				setAppData(data);
			})
			.catch((error) => {
				console.error('Error fetching application:', error);
			});
	};


	const handleUpdate = async () => {
		// console.log('Updating volunteer:', volunteer.id, formData);
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
						label="Pronouns"
						initialValue={formData.pronouns}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						name="pronouns"
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
						initialValue={formData.interest_areas}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						name="interest_areas"
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
				<div className="modal-footer mt-6 flex flex-col items-center">
					{(!showAppData) ?
						
						<button
							className="bg-blue text-gray-100 px-4 py-2 rounded mx-2 hover:bg-blue-dark w-64"
							onClick={handleGetApplication}
							disabled={!volunteer.application_id}
						>
							View Application Data
						</button>
						:
						<button
							className="bg-blue text-gray-100 px-4 py-2 rounded mx-2 hover:bg-blue-dark"
							onClick={() => setShowAppData(false)}
						>
							Hide Application Data
						</button>
					}
					{ !volunteer.application_id && (
						<p>No applicationId for volunteer</p>
					)}
				</div>
				{(appData && showAppData) &&
					<div>
						<p>
							<strong>Additional Info:</strong>{' '}
							{appData.additional_info || 'N/A'}
						</p>
						<p>
							<strong>Signal Handle:</strong> {appData.signal_handle}
						</p>
						<p>
							<strong>Social Media Handles:</strong> {appData.social_media_handles}
						</p>
						<p className="">
							<strong>Bio:</strong> {appData.bio ?? 'N/A'}
						</p>
						<p>
							<strong>Referrer:</strong> {appData.referrer ?? 'N/A'}
						</p>
						<p className="">
							<strong>Previously worked with US Immigration Agency?</strong> {appData.immigration_history}
						</p>
						<p>
							<strong>Currently Working with other groups?</strong> {appData.currently_working}
						</p>
						<p className="">
							<strong>Currently Working – Explanation:</strong> {appData.currently_working_explanation ?? 'N/A'}
						</p>
						<p className="">
							<strong>Relevant Skills:</strong> {appData.relevant_skills}
						</p>
						<p className="">
							<strong>Other Skills:</strong> {appData.other_skills ?? 'N/A'}
						</p>
					</div>
				}

			</div>
		</div>
	);
}
