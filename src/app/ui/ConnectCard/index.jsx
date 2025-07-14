'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { subscribeToMailingList } from '@/app/actions';

export default function ConnectCard({ data }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [error, setError] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const message = error
		? 'Error occured: ' + error
		: 'You have successfully subscribed to our mailing list!';

	const handleClick = () => {
		setIsModalOpen(true);
	};

	const handleSubmit = async () => {
		// add email to mailing_list table
		if (!email) {
			setError('Please enter a valid email address.');
			return;
		}
		try {
			const response = await subscribeToMailingList(email);
            console.log('Subscription response:', JSON.stringify(response));
			if (response.success) {
				setSubmitted(true);
                setError(null);
			} else {
                setSubmitted(true);
				setError(response.error);
                console.error('Error subscribing to mailing list:', response.error);
			}
		} catch (error) {
			setError('Failed to subscribe. Please try again later.');
			console.error('Error subscribing to mailing list:', error);
		}
	};

	return (
		<div id="connect-card" className="bg-blue m-4 p-4 text-white text-center">
			<div className="card-header">
				<h1 className="text-2xl">{data.value_json.heading}</h1>
			</div>
			<div className="card-buttons flex flex-col items-center justify-center">
				{data.value_json.buttons.map((button, index) => (
					<button
						key={index}
						onClick={() => handleClick()}
						className={button.style}>
						{button.text}
					</button>
				))}

				<div className="social-links flex flex-row mb-4 mt-2">
					<Link
						href="https://www.instagram.com/indianaaid/"
						target="_blank"
						rel="noopener noreferrer"
						className="mx-2 hover:text-yellow">
						<FontAwesomeIcon icon={faInstagram} />
					</Link>
					<Link
						href="https://www.facebook.com/indianaAID1"
						target="_blank"
						rel="noopener noreferrer"
						className="mx-2 hover:text-yellow">
						<FontAwesomeIcon icon={faFacebook} />
					</Link>
				</div>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white text-black p-8 rounded max-w-md w-full">
						<h2 className="text-2xl mb-4">Join Our Mailing List</h2>
						<p className="text-sm text-gray-600 mb-4">
							We will never share your email with anyone else. Click{' '}
							<Link
								href="/resources/mailing-list/unsubscribe"
								className="underline">
								here
							</Link>{' '}
							to unsubscribe at any time.
						</p>
                        {error && (
                            <p className="text-red mb-4">{error}</p>
						)}
						<input
							type="email"
							placeholder="you@example.com"
							className="border p-2 w-full mb-4"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{submitted && !error ? (
							<div className="flex flex-col justify-end gap-4">
								<p className="text-green-600 mt-2">{message}</p>
								<button
									className="bg-blue text-white px-4 py-2 rounded"
									onClick={() => setIsModalOpen(false)}>
									Close
								</button>
							</div>
						) : (
							<div className="flex justify-end gap-4">
								<button
									className="text-sm underline"
									onClick={() => setIsModalOpen(false)}>
									Cancel
								</button>
								<button
									className="bg-blue text-white px-4 py-2 rounded"
									onClick={handleSubmit}>
									Join
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
