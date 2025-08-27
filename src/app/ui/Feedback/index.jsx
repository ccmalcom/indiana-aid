'use client';
import { useState } from 'react';

export default function Feedback() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [feedback, setFeedback] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(null);

	const handleSubmitFeedback = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			// Here you would typically send the feedback to your server
			const response = await fetch('/api/send-feedback', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: feedback }),
			});
			// console.log('Response from server:', JSON.stringify(response));
			if (!response.ok) {
				throw new Error('Network response was not ok');
			} else {
				const data = await response.json();
				if (!data.success) {
					setSuccess(false);
					throw new Error('Failed to send feedback');
				}
				setSuccess(true);
				// console.log('Feedback submitted successfully:', feedback);
			}
			// Reset feedback state
		} catch (error) {
			console.error('Error submitting feedback:', error);
		} finally {
			setLoading(false);
		}
	};

    const handleCloseForm = () => {
        setIsModalOpen(false);
        setFeedback('');
        setLoading(false);
        setSuccess(false);
    };

	return (
		<div className="text-lg text-center w-full m-auto p-2 bg-yellow-dark text-gray font-semibold">
			<h2>Site is currently under development!</h2>
			<button
				onClick={() => setIsModalOpen(true)}
				className="text-sm hover:underline">
				Submit Feedback
			</button>

			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-4 rounded shadow-lg max-w-md w-full relative">
						<button
							onClick={() => setIsModalOpen(false)}
							className="absolute top-2 right-2 text-gray-600">
							×
						</button>
						<h3 className="text-lg font-bold mb-2">Submit Feedback</h3>
						<form>
							<p className="text-sm mb-2">
								We appreciate your feedback to help us improve the site.
							</p>
							<textarea
								className="w-full p-2 border border-gray-300 rounded"
								rows="4"
								placeholder="Your feedback..."
								value={feedback}
								onChange={(e) => setFeedback(e.target.value)}></textarea>
							<div className="mt-2">
								{loading && (
									<p className="text-blue">Sending...</p>
								)}
                                {success && (
                                    <p className="text-green-600">Feedback sent successfully!</p>
                                )}
                                {!success && !loading && success !== null && (
                                    <p className="text-red-600">Failed to send feedback. Please try again.</p>
                                )}
                                {!loading && !success ? (
								<button
									onClick={handleSubmitFeedback}
									className="bg-blue text-white px-4 py-2 rounded"
									disabled={loading || success}>
									Send Feedback
								</button>
                                ): (
                                    <button className='bg-blue text-white px-4 py-2 rounded' onClick={handleCloseForm}>Close Form</button>
                                )}
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
