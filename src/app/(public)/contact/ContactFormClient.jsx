'use client';
import React, { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { logError } from '@/app/utils/errorLogger';

export default function ContactFormClient({ formData }) {

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
				// console.log('Email sent successfully:', result.data);
				e.target.reset();
			} else {
				setError(result.error || 'Unknown error occurred.');
				await logError({
					page: 'contact',
					component: 'ContactFormClient',
					action: 'sendEmail',
					error_stack: result.error?.stack || null,
					error_details: result.error?.details || null,
					error_code: result.error?.code || null,
					error_message: result.error?.message || null,
					status: 'unresolved',
					resolution_details: null
				});
			}
		} catch (fetchError) {
			console.error(fetchError);
			await logError({
				page: 'contact',
				component: 'ContactFormClient',
				action: 'sendEmail',
				error_stack: fetchError?.stack || null,
				error_details: fetchError?.details || null,
				error_code: fetchError?.code || null,
				error_message: fetchError?.message || null,
				status: 'unresolved',
				resolution_details: null
			});
			setError('Network error. Please try again later.');
		} finally {
			setIsLoading(false);
			
		}
	};

    return (
        <div className="">
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
					<h2 className="text-xl text-yellow font-heading">
						🎉 Message sent successfully!
					</h2>
					<p>Thanks for reaching out. We'll get back to you soon.</p>
				</div>
			) : (
				<div className="contact-form flex flex-col items-center justify-center bg-blue text-white p-4 md:px-16 w-[90%] md:w-[70%] lg:w-[55%] xl:w-[40%] mx-auto mt-4 rounded-lg shadow-lg min-h-[50vh]">
						<h1 className="text-2xl mb-4">{formData.value_json.formTitle}</h1>

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
						<div className="form-group flex flex-col min-w-64 sm:flex-row mb-4 ">
							<div className="flex flex-col ">
								<label htmlFor="name" className="mb-2 font-semibold">
									{formData.value_json.nameLabel}:
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									className="rounded-lg p-2 border-2 border-gray-300 text-black"
									placeholder={formData.value_json.namePlaceholder}
								/>
							</div>
							<div className="flex flex-col sm:ml-2">
								<label htmlFor="email" className="mb-2 font-semibold">
									{formData.value_json.emailLabel}:
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									className="rounded-lg p-2 border-2 border-gray-300 text-black"
									placeholder={formData.value_json.emailPlaceholder}
								/>
							</div>
						</div>
						<div className="form-group flex flex-col w-full mb-4">
							<label htmlFor="message" className="mb-2 font-semibold">
								{formData.value_json.messageLabel}:
							</label>
							<textarea
								id="message"
								name="message"
								required
								className="rounded-lg p-2 border-2 border-gray-300 text-black"
								rows="6"
								placeholder={formData.value_json.messagePlaceholder}></textarea>
						</div>
						<button
							type="submit"
							className="bg-yellow text-black px-4 py-2 rounded-lg hover:bg-yellow-dark transition-colors duration-200"
							disabled={isLoading}>
							{formData.value_json.submitButtonText}
						</button>
					</form>
				</div>
			)}
		</div>
	);
}