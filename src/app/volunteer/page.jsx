'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const imageDescriptions = [
	{
		title: 'In-Person Visitation',
		src: '/inPersonVisitIcon.png',
		alt: 'In Person Visit',
		description:
			'Visit detainees to offer direct support, bear witness, and build human connection with those inside detention centers.',
	},
	{
		title: 'Virtual Visitation',
		src: '/virtualVisitIcon.jpg',
		alt: 'Virtual Visit',
		description:
			'Virtual volunteers coordinate and conduct video visits with detainees, offering companionship and support.',
	},
	{
		title: 'Grant Writing',
		src: '/grantIcon.png',
		alt: 'Grant Writing',
		description:
			'Help us secure funding by researching and writing grant proposals for our programs and support efforts.',
	},
	{
		title: 'Translation',
		src: '/translationIcon.png',
		alt: 'Translation Icon',
		description:
			'Assist with translating documents and communication for non-English-speaking detainees and families.',
	},
	{
		title: 'Administrative Assistance',
		src: '/administrationIcon.png',
		alt: 'Administration Icon',
		description:
			'Help with data entry, organization, and behind-the-scenes tasks that keep our work running.',
	},
	{
		title: 'Fundraising',
		src: '/fundraisingIcon.png',
		alt: 'Fundraising Icon',
		description:
			'Plan events and campaigns to raise money for detainee support (e.g., books, commissary, puzzles).',
	},
];

const areasOfInterest = [
	'Virtual Visitation',
	'In-Person Visitation',
	'Grant Writing',
	'Translation',
	'Administrative Assistance',
	'Fundraising',
	'Other (please specify below)',
];

export default function Volunteer() {
	const [countryCode, setCountryCode] = useState('+1'); // Default to US country code\
	const [phoneNumber, setPhoneNumber] = useState('');
	const [open, setOpen] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error'
	const [submissionMessage, setSubmissionMessage] = useState('');

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			name: `${e.target.firstName.value} ${e.target.lastName.value}`,
			email: e.target.email.value,
			phone: countryCode + '-' + phoneNumber,
			languages: Array.from(e.target.languages.selectedOptions).map(
				(option) => option.value
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
		<div className="viewport ">
			<div className="volunteer-info my-20 text-center px-4">
				<h2 className="text-4xl font-heading font-bold text-blue mb-2">
					Volunteer with Us!
				</h2>
				<p className="mb-6 font-body text-lg">
					If you are interested in volunteering with Indiana AID, please fill
					out our{' '}
					<a href="#volunteer-form" className="text-blue-700 underline">
						volunteer sign-up form
					</a>
					.
				</p>
			</div>
			{/* oppty icons */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 px-4 w-[70vw] mx-auto">
				{imageDescriptions.map((item, idx) => (
					<div key={idx} className="text-center">
						<Image
							src={item.src}
							alt={item.alt}
							width={150}
							height={150}
							className="mx-auto mb-2"
						/>
						<div
							className="flex items-center justify-center gap-2 text-green-800 font-heading -semibold text-lg cursor-pointer"
							onClick={() => setOpen(open === idx + 100 ? null : idx + 100)}>
							<span>{item.title}</span>
							<span className="text-xl">{open === idx + 100 ? '−' : '+'}</span>
						</div>
						{open === idx + 100 && (
							<div className="mt-2 text-md text-black font-body">
								<p>{item.description}</p>
							</div>
						)}
					</div>
				))}
				<div className="col-span-full text-center text-md font-body text-gray-700 mt-4">
					Don’t see your skill listed? We still welcome other talents like web
					development, art, organizing, and more!
				</div>
			</div>
			{/* volunteer form */}

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
							<Link href="/contact" className="underline">
								contact us
							</Link>
						</p>
						{/* <p className="mt-4">
							In the meantime, feel free to check out our{' '}
							<Link href="/events" className="underline">
								events page
							</Link>{' '}
							to see how you can get involved right away!
						</p> */}
					</div>
				) : submissionStatus === 'error' ? (
					<div className="my-20 text-center">
						<h2 className="text-red text-xl">
							Oops! It looks like you have already signed up to volunteer.
						</h2>
						<br />
						<p>
							If you need to update your information, please{' '}
							<Link href="/contact" className="underline">
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
										className="rounded-lg p-2 border-2 border-gray-300 text-black w-full font-body"
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
										className="rounded-lg p-2 border-2 border-gray-300 text-black w-full font-body"
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
										className="rounded-lg p-2 border-2 border-gray-300 text-black w-full"
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
											type="text"
											id="countryCode"
											name="countryCode"
											value={countryCode}
											onChange={(e) => setCountryCode(e.target.value)}
											className="rounded-lg p-2 border-2 border-gray-300 text-black w-1/5"
											placeholder="+1"
										/>
										<input
											type="tel"
											id="phone"
											name="phone"
											value={phoneNumber}
											onChange={handlePhoneChange}
											className="rounded-lg p-2 border-2 border-gray-300 text-black w-4/5"
											placeholder="123-456-7890"
										/>
									</div>
								</div>
							</div>

							<div className="form-group mb-4">
								<label
									htmlFor="languages"
									className="block text-sm font-semibold mb-2">
									Languages Spoken:{' '}
									<span className="text-gray">(optional)</span>
								</label>
								<select
									id="languages"
									name="languages"
									multiple
									className="rounded-lg p-2 border-2 border-gray-300 text-black w-full h-32">
									<option value="English">English</option>
									<option value="Spanish">Spanish</option>
									<option value="Arabic">Arabic</option>
									<option value="French">French</option>
									<option value="Mandarin">Mandarin</option>
									<option value="Russian">Russian</option>
									<option value="Other">Other</option>
								</select>
								<p className="text-sm text-gray mt-1">
									Hold Ctrl (Windows) or Command (Mac) to select multiple
									languages.
								</p>
							</div>

							<fieldset className="form-group mb-4 border rounded-lg p-4 border-gray-300">
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
									className="rounded-lg p-2 border-2 border-gray-300 text-black w-full"
									rows="4"
									placeholder="Tell us about any other skills, experience, or roles you're interested in..."></textarea>
							</div>

							<button
								type="submit"
								className="bg-yellow text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-dark transition-colors duration-200"
								disabled={isSubmitting}>
								Submit
							</button>
						</form>
					</>
				)}
			</div>
		</div>
	);
}
