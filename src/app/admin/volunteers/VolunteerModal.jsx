'use client';

import { useState } from 'react';
import EditableInput from '@/app/ui/EditableInput';
// import { updateVolunteer, createVolunteer, deleteVolunteer } from '../../actions';

export default function VolunteerModal({ volunteer, onClose }) {
	const [isLoading, setIsLoading] = useState(false);
	const [statusMessage, setStatusMessage] = useState(null);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		email: volunteer?.email || '',
		phone: volunteer?.phone || '',
	});

	if (!volunteer) return null;

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
					<h2 className="text-lg font-semibold">{volunteer.name}</h2>
				</div>
				<div className="modal-body">
					<EditableInput
						label="Email"
						initialValue={volunteer.email}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						type="email"
						name="email"
						className="w-full"
					/>
					<EditableInput
						label="Phone"
						initialValue={volunteer.phone}
						onChange={(value, name) =>
							setFormData((prev) => ({ ...prev, [name]: value }))
						}
						type="tel"
						name="phone"
						className="w-full"
					/>
				</div>
				<div className="modal-footer mt-6 flex justify-center">
                    <button className="bg-blue text-white px-4 py-2 rounded mx-2">
                        Submit Updates
                    </button>
                    <button className='bg-red text-white px-4 py-2 rounded mx-2'>
                        Delete Volunteer
                    </button>
                </div>
				{isLoading && <p className="text-blue-500">Loading...</p>}
			</div>
		</div>
	);
}
