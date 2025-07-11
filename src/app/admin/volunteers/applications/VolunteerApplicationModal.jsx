//Presenational: renders modal UI for one application
// input: application, onClose
// application: single volunteer application object
// onClose: function to close the modal
'use client';
import { useState } from 'react';
import { updateVolunteerApplication, createVolunteerEntry } from '../../actions';

export default function VolunteerApplicationModal({ application, onClose }) {
	if (!application) return null;

	const [isLoading, setIsLoading] = useState(false);
	const [statusMessage, setStatusMessage] = useState(null);
    const [error, setError] = useState(null);

	const handleApprove = async () => {
		setIsLoading(true);
		setStatusMessage(null);
		// console.log('Approving application:', application.id);
		const updateResult = await updateVolunteerApplication(
			application.id,
			'Approved'
		);
		if (updateResult.success) {
			const createResult = await createVolunteerEntry(application);
			if (createResult.success) {
				// console.log('Successfully approved application:', application.id);
                // console.log('Created volunteer entry:', createResult.data);
                application.status = 'Approved'; // Update local state for immediate feedback
				setStatusMessage('Application approved successfully.');
			} else {
                console.log('Error creating volunteer entry:', (createResult.error));
                setError(createResult.error);
				setStatusMessage('Failed to approve application.');
			}
		} else {
			console.error('Error updating application:', updateResult.error);
            setError(updateResult.error);
			setStatusMessage('Failed to approve application.');
		}
		setIsLoading(false);
		// Optionally close modal here, or wait for user to see message
		// onClose();
	};
	const handleReject = async () => {
		setIsLoading(true);
		setStatusMessage(null);
        
		// console.log('Rejecting application:', application.id);
		const updateResult = await updateVolunteerApplication(
			application.id,
			'Rejected'
		);
		if (updateResult.success) {
			// console.log('Successfully rejected application:', application.id);
			setStatusMessage('Application rejected.');
            application.status = 'Rejected'; // Update local state for immediate feedback
		} else {
			console.error('Error updating application:', updateResult.error);
            setError(updateResult.error);
			setStatusMessage('Failed to reject application.');
		}
		setIsLoading(false);
		// Optionally close modal here, or wait for user to see message
		// onClose();
	};

	return (
		<div className="modal-viewport fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="modal bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
						<div className="modal-header mb-4 flex justify-between items-center text-center">
							<h2 className="text-xl font-bold flex-grow">
								Volunteer Application #{application.id}
							</h2>
							<button
								onClick={onClose}
								className="text-gray-500 hover:text-gray-800">
								✕
							</button>
						</div>
						<div className="modal-subtitle mb-4 text-center">
							<h2 className="text-lg font-semibold">
								Submitted: {new Date(application.created_at).toLocaleString()}
							</h2>
							<h2 className="text-lg font-semibold">
								Status: {application.status}
							</h2>
						</div>
				{!isLoading && !statusMessage ? (
					<>
						{/* Info grid for readability */}
						<div className="modal-content grid grid-cols-2 gap-4">
							<p>
								<strong>Name:</strong> {application.name}
							</p>
							<p>
								<strong>Email:</strong> {application.email}
							</p>
							<p>
								<strong>Phone:</strong> {application.phone}
							</p>
							<p>
								<strong>Languages:</strong> {application.languages.join(', ')}
							</p>
							<p>
								<strong>Interest Areas:</strong>{' '}
								{application.interest_areas.join(', ')}
							</p>
							<p>
								<strong>Additional Info:</strong>{' '}
								{application.additional_info || 'N/A'}
							</p>
						</div>
						<div className="modal-actions mt-6 flex justify-center">
							<button
								className="bg-green text-white px-4 py-2 rounded mx-2"
								onClick={handleApprove}>
								Approve
							</button>
							<button
								className="bg-red text-white px-4 py-2 rounded mx-2"
								onClick={handleReject}>
								Reject
							</button>
						</div>
					</>
				) : (
                    <div className="flex justify-center items-center h-full">
                        {statusMessage ? (
                            <div className="mt-4 text-center text-sm text-gray-700">
                                {statusMessage}
                                    {error && <p className="text-red">Error: {error}</p>}
                            </div>
                        ) : (
                            <p className="text-gray-500">Loading...</p>
                        )}
					</div>
				)}
			</div>
		</div>
	);
}
