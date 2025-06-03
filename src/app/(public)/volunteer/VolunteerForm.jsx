'use client';
import { useState } from 'react';
import Link from 'next/link';


const areasOfInterest = [
	'Virtual Visitation',
	'In-Person Visitation',
	'Grant Writing',
	'Translation',
	'Administrative Assistance',
	'Fundraising',
	'Other (please specify below)',
];

const languages = [
	'English',
	'Spanish',
	'French',
	'Haitian Creole',
	'Mandarin',
	'Other (please specify below)',
];

export default function Volunteer() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error'
	const [submissionMessage, setSubmissionMessage] = useState('');
	const [isLanguagesFilled, setIsLanguagesFilled] = useState(false);
	const [isInterestsFilled, setIsInterestsFilled] = useState(false);
	const [additionalInfo, setAdditionalInfo] = useState('');

	const formatPhoneNumber = (value) => {
		const digits = value.replace(/\D/g, '').substring(0, 10);
		const parts = [];

		if (digits.length > 0) parts.push(digits.slice(0, 3));
		if (digits.length > 3) parts.push(digits.slice(3, 6));
		if (digits.length > 6) parts.push(digits.slice(6, 10));

		return parts.join('-');
	};

	const handlePhoneChange = (e) => {
		const formattedNumber = formatPhoneNumber(e.target.value);
		setPhoneNumber(formattedNumber);
	};

	const handleLanguagesChange = (e) => {
		const checkboxes = e.currentTarget.querySelectorAll('input[name="languages"]');
		const anyChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
		setIsLanguagesFilled(anyChecked);
	};

	const handleInterestsChange = (e) => {
		const checkboxes = e.currentTarget.querySelectorAll('input[name="interest"]');
		const anyChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
		setIsInterestsFilled(anyChecked);
	};

	const handleAdditionalInfoChange = (e) => {
		setAdditionalInfo(e.target.value);
	};

	const isFormValid =
		firstName.trim() &&
		lastName.trim() &&
		email.trim() &&
		isLanguagesFilled &&
		isInterestsFilled;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			name: `${firstName} ${lastName}`,
			email: email,
			phone: phoneNumber,
			languages: Array.from(e.target.querySelectorAll('input[name="language"]:checked')).map(
				(checkbox) => checkbox.value
			),
			areasOfInterest: Array.from(
				e.target.querySelectorAll('input[name="interest"]:checked')
			).map((checkbox) => checkbox.value),
			additionalInfo: e.target.additional_info.value,
		};
		console.log('Form Data:', JSON.stringify(formData));

		setIsSubmitting(true);
		setSubmissionStatus(null);
		setSubmissionMessage('');

		try {
			const res = await fetch('/api/volunteer-signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const result = await res.json();
			if (result.success) {
				setSubmissionStatus('success');
				setSubmissionMessage('Thank you for signing up to volunteer!');
				e.target.reset();
				setIsLanguagesFilled(false);
				setIsInterestsFilled(false);
				setAdditionalInfo('');
			} else if ((result.error.code = '23505')) {
				setSubmissionStatus('error');
				setSubmissionMessage(
					'Oops! It looks like you have already signed up to volunteer. If you need to update your information, please contact us'
				);
			} else if (result.error) {
				setSubmissionStatus('error');
				console.log('Error:', JSON.stringify(result.error));
				setSubmissionMessage('An error occurred. Please try again.');
			}
		} catch (error) {
			console.error(error);
			setSubmissionStatus('error');
			setSubmissionMessage('Network error. Please try again later.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (


			<div
				id="volunteer-form"
				className="volunteer-form w-[66vw] mx-auto flex flex-col items-center bg-blue rounded-2xl shadow-lg p-8 m-4 text-white ">
				<h2 className="text-2xl font-heading font-bold">Volunteer Form</h2>
				{isSubmitting ? (
					<div className="h-6 mt-2 text-sm text-center font-body">
						<span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
					</div>
				) : submissionStatus === 'success' ? (
					<div className="my-20 text-center">
						<h2 className="text-gree text-xl font-semibold">
							Thank you for signing up to volunteer with Indiana AID!
						</h2>
						<br />
						<p>
							We will review your application and get back to you as soon as
							possible. If you have any questions, please{' '}
							<Link href="/contact" className="underline text-yellow">
								contact us
							</Link>
						</p>
					</div>
				) : submissionStatus === 'error' ? (
					<div className="my-20 text-center">
						<h2 className="text-red text-xl text-semibold">
							Oops! It looks like you have already signed up to volunteer.
						</h2>
						<br />
						<p>
							If you need to update your information, please{' '}
							<Link href="/contact" className="underline text-yellow">
								contact us
							</Link>{' '}
						</p>
					</div>
				) : (
					<>
						<p className="m-2 text-center font-body text-lg">
							Please fill out the form below to express your interest in
							volunteering with Indiana AID. We will get back to you as soon as
							possible.
						</p>

						<form className="w-full px-8 mt-4" onSubmit={handleSubmit}>
							<div className="flex flex-col md:flex-row gap-4 mb-4">
								<div className="form-group w-full md:w-1/4">
									<label
										htmlFor="firstName"
										className="block text-sm font-semibold mb-2">
										First Name: <span className="text-red font-heading">*</span>
									</label>
									<input
										type="text"
										id="firstName"
										name="firstName"
										required
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										className={`rounded-lg p-2 border-2 ${firstName ? 'border-yellow' : 'border-gray-300'} text-black w-full font-body`}
										placeholder="First name"
									/>
								</div>

								<div className="form-group w-full md:w-1/4">
									<label
										htmlFor="lastName"
										className="block text-sm font-semibold mb-2">
										Last Name: <span className="text-red font-heading">*</span>
									</label>
									<input
										type="text"
										id="lastName"
										name="lastName"
										required
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className={`rounded-lg p-2 border-2 ${lastName ? 'border-yellow' : 'border-gray-300'} text-black w-full font-body`}
										placeholder="Last name"
									/>
								</div>

								<div className="form-group w-full md:w-1/4">
									<label
										htmlFor="email"
										className="block text-sm font-semibold mb-2">
										Email: <span className="text-red">*</span>
									</label>
									<input
										type="email"
										id="email"
										name="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className={`rounded-lg p-2 border-2 ${email ? 'border-yellow' : 'border-gray-300'} text-black w-full font-body`}
										placeholder="yourname@email.com"
									/>
								</div>
								<div className="form-group w-full md:w-1/4">
									<label
										htmlFor="phone"
										className="block text-sm font-semibold mb-2">
										Phone: <span className="text-gray">(optional)</span>
									</label>
									<div className="flex gap-2">
										<input
											type="tel"
											id="phone"
											name="phone"
											value={phoneNumber}
											onChange={(e) => {
												handlePhoneChange(e);
												e.target.className = `rounded-lg p-2 border-2 ${e.target.value ? 'border-yellow' : 'border-gray-300'} text-black w-4/5 font-body`;
											}}
											className={`rounded-lg p-2 border-2 border-gray-300 text-black w-4/5 font-body`}
											placeholder="123-456-7890"
										/>
									</div>
								</div>
							</div>

							{/* languages fieldset */}
							<fieldset className={`form-group mb-4 border rounded-lg p-4 ${isLanguagesFilled ? 'border-yellow' : 'border-gray-300'}`} onChange={handleLanguagesChange} >
								<legend className="block text-sm font-semibold mb-2">
									Language(s) Spoken: <span className="text-red">*</span>
								</legend>
								<div>
									{languages.map((language) => (
										<div key={language} className="flex items-center mb-2">
											<input
												type="checkbox"
												id={language}
												name="languages"
												value={language}
												className="mr-2"
											/>
											<label
												htmlFor={language}
												className="text-sm font-semibold text-white">
												{language}
											</label>
										</div>
									))}
								</div>

								<p className="text-sm text-gray mt-2">
									Please select all that apply. If you speak a language not
									listed, please specify in the additional information field
									below.
								</p>
							</fieldset>

							{/* interest fieldset */}
							<fieldset className={`form-group mb-4 border rounded-lg p-4 ${isInterestsFilled ? 'border-yellow' : 'border-gray-300'}`} onChange={handleInterestsChange}>
								<legend className="block text-sm font-semibold mb-2">
									Area(s) of Interest: <span className="text-red">*</span>
								</legend>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
									{areasOfInterest.map((interest) => (
										<div key={interest} className="flex items-center">
											<input
												type="checkbox"
												id={interest}
												name="interest"
												value={interest}
												className="mr-2"
											/>
											<label
												htmlFor={interest}
												className="text-sm font-semibold text-white">
												{interest}
											</label>
										</div>
									))}
								</div>
								<p className="text-sm text-gray mt-2">
									Please select all that apply.
								</p>
							</fieldset>
							{/* additional info */}
							<div className="form-group mb-4">
								<label
									htmlFor="additional_info"
									className="block text-sm font-semibold mb-2">
									Additional Information or Other Skills:{' '}
									<span className="text-gray">
										(optional – e.g., web development, art, organizing, etc.)
									</span>
								</label>
								<textarea
									id="additional_info"
									name="additional_info"
									value={additionalInfo}
									onChange={handleAdditionalInfoChange}
									className={`rounded-lg p-2 border-2 ${additionalInfo ? 'border-yellow' : 'border-gray-300'} text-black w-full font-body`}
									rows="4"
									placeholder="Tell us about any other skills, experience, or roles you're interested in..."></textarea>
							</div>

							<button
								type="submit"
								className={`font-semibold px-4 py-2 rounded-lg transition-colors duration-200 ${isFormValid ? 'bg-yellow text-black hover:bg-yellow-dark' : 'bg-gray-300 text-gray-700'}`}
								disabled={isSubmitting || !isFormValid}>
								Submit
							</button>
						</form>
					</>
				)}
			</div>
	);
}
