'use client';
import React, { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

export default function Contact() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const sendEmail = async (e) => {
		e.preventDefault();

		//ensure state is reset
		setIsLoading(true);
		setError(null);
		setSuccess(false);

		const formData = {
			name: e.target.name.value,
			email: e.target.email.value,
			message: e.target.message.value,
		};
		try {
			const res = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const result = await res.json();

			if (result.success) {
				setSuccess(true);
				e.target.reset();
			} else {
				setError(result.error || 'Unknown error occurred.');
			}
		} catch (fetchError) {
			console.error(fetchError);
			setError('Network error. Please try again later.');
		} finally {
			setIsLoading(false);
			setTimeout(() => {
				//nav back to home '/' after 5 seconds
				router.push('/');
			}, 5000);
		}
	};

	return (
		<div className="viewport min-h-[66vh]">
			{isLoading ? (
				<div className="flex items-center justify-center bg-blue text-white p-4 w-[66%] m-auto mt-4 rounded-lg shadow-lg min-h-[50vh]">
					<PuffLoader
						loading={isLoading}
						size={100}
						aria-label="Loading Spinner"
						data-testid="loader"
						color="#FFC857"
					/>
				</div>
			) : success ? (
				<div className="flex flex-col items-center justify-center bg-blue text-white p-4 w-[66%] m-auto mt-4 rounded-lg shadow-lg min-h-[50vh] text-center">
					<h2 className="text-xl text-yellow font-semibold">
						🎉 Message sent successfully!
					</h2>
					<p>Thanks for reaching out. We'll get back to you soon.</p>
				</div>
			) : (
				<div className="contact-form flex flex-col items-center justify-center bg-blue text-white p-4 w-[66%] m-auto mt-4 rounded-lg shadow-lg min-h-[50vh]">
					<div className="form-header flex flex-col items-center justify-center mb-4">
						<h1 className="text-2xl">Contact Us</h1>
						<p>Have a question? Want to get involved? Send us a message!</p>
					</div>

					{error && (
						<div className="flex flex-col items-center justify-center bg-blue text-white p-4 w-[66%] m-auto mt-4 rounded-lg shadow-lg min-h-[50vh] text-center">
							<div className="bg-red-100 text-red-700 p-4 rounded mb-4">
								{error}
							</div>
							<button
								onClick={() => setError(null)}
								className="bg-yellow text-white px-4 py-2 rounded-lg hover:bg-yellow-dark transition-colors duration-200">
								Try Again
							</button>
						</div>
					)}

					<form onSubmit={sendEmail}>
						<div className="form-group flex w-full gap-4 mb-4">
							<div className="flex flex-col flex-1">
								<label htmlFor="name" className="mb-2 font-semibold">
									Name:
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									className="rounded-lg p-2 border-2 border-gray-300 text-black"
									placeholder="Your name"
								/>
							</div>
							<div className="flex flex-col flex-1">
								<label htmlFor="email" className="mb-2 font-semibold">
									Email:
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									className="rounded-lg p-2 border-2 border-gray-300 text-black"
									placeholder="you@example.com"
								/>
							</div>
						</div>
						<div className="form-group flex flex-col w-full mb-4">
							<label htmlFor="message" className="mb-2 font-semibold">
								Message:
							</label>
							<textarea
								id="message"
								name="message"
								required
								className="rounded-lg p-2 border-2 border-gray-300 text-black"
								rows="6"
								placeholder="Your message here..."></textarea>
						</div>
						<button
							type="submit"
							className="bg-yellow text-white px-4 py-2 rounded-lg hover:bg-yellow-dark transition-colors duration-200"
							disabled={isLoading}>
							Submit
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
