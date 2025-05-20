'use client';
import { useState } from 'react';
import Image from 'next/image';

// const opportunities = [
// 	{
// 		title: 'Virtual Visitation',
// 		description:
// 			'Virtual volunteers coordinate and conduct video visits with detainees, offering companionship and support.',
// 	},
// 	{
// 		title: 'In-Person Visitation',
// 		description:
// 			'Visit detainees at designated facilities to provide in-person support and bear witness to their experiences.',
// 	},
// 	{
// 		title: 'Grant Writing',
// 		description:
// 			'Help us secure funding by researching and writing grant proposals for our programs and support efforts.',
// 	},
// 	{
// 		title: 'Translation',
// 		description:
// 			'Assist with translating documents and communication for non-English-speaking detainees and families.',
// 	},
// 	{
// 		title: 'Administrative Assistance',
// 		description:
// 			'Support with data entry, organization, and communication tasks that keep our programs running.',
// 	},
// 	{
// 		title: 'Fundraising',
// 		description:
// 			'Fundraiser volunteers will collaborate to plan and implement fundraiser events to raise money for our costs associated with supporting our detained immigrant partners – commissary, virtual visits, books/puzzles.',
// 	},
// ];

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
		src: '/adminIcon.png',
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
	const [open, setOpen] = useState(null);
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			name: e.target.name.value,
			email: e.target.email.value,
			phone: e.target.phone.value,
			areasOfInterest: Array.from(
				e.target.querySelectorAll('input[name="interest"]:checked')
			).map((checkbox) => checkbox.value),
			additionalInfo: e.target.additional_info.value,
		};

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
				alert('Thank you for signing up to volunteer!');
				e.target.reset();
			} else {
				alert(result.error || 'Unknown error occurred.');
			}
		} catch (error) {
			console.error(error);
			alert('Network error. Please try again later.');
		}
	};

	return (
		<div className="viewport ">
			{/* <div className="header w-[80vw] mx-auto flex flex-col items-center py-12">
				<h1 className="text-3xl text-center mb-4">
					Indiana AID is a volunteer group that supports individuals detained by
					ICE in Indiana by bearing witness to their experiences through visits,
					offering information, and providing resources to them and their
					families. 
				</h1>
			</div> */}
			<div className="volunteer-info my-20 text-center px-4">
				<h2 className="text-4xl font-bold text-blue mb-2">Volunteer with Us!</h2>
				<p className="mb-6">
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
					<div
						key={idx}
						className="text-center"
					>
						<Image
							src={item.src}
							alt={item.alt}
							width={150}
							height={150}
							className="mx-auto mb-2"
						/>
						<div
							className="flex items-center justify-center gap-2 text-green-800 font-semibold text-lg cursor-pointer"
							onClick={() => setOpen(open === idx + 100 ? null : idx + 100)}
						>
							<span>{item.title}</span>
							<span className="text-xl">{open === idx + 100 ? '−' : '+'}</span>
						</div>
						{open === idx + 100 && (
							<div className="mt-2 text-sm text-black">
								<p>{item.description}</p>
							</div>
						)}
					</div>
				))}
				<div className="col-span-full text-center text-sm text-gray-700 mt-4">
					Don’t see your skill listed? We still welcome other talents like web development, art, organizing, and more!
				</div>
			</div>
			{/* oppty grid
			<div className="volunteer-opportunities w-[80vw] mx-auto flex flex-col items-center mb-12">
				<h2 className="text-3xl font-bold text-blue mb-4">
					Current Volunteer Opportunities
				</h2>
				<p className="mb-4">
					We are currently looking for volunteers to help with the following
					opportunities:
				</p>
				{opportunities.map((item, idx) => (
					<div
						key={idx}
						className="w-full border-t border-gray-300 py-2 cursor-pointer"
						onClick={() => setOpen(open === idx ? null : idx)}>
						<div className="flex justify-between items-center text-lg font-semibold text-green-700 hover:text-green-900">
							<span>{item.title}</span>
							<span className="text-xl">{open === idx ? '−' : '+'}</span>
						</div>
						{open === idx && (
							<div className="mt-2 text-sm text-black">
								<p>{item.description}</p>
							</div>
						)}
					</div>
				))}
			</div> */}
			{/* volunteer form */}
			<div
				id="volunteer-form"
				className="volunteer-form w-[66vw] mx-auto flex flex-col items-center bg-blue rounded-2xl shadow-lg p-8 m-4 text-white">
				<h2 className="text-2xl font-semibold">Sign Up to Volunteer</h2>
				<p className="m-2 text-center">
					Please fill out the form below to express your interest in
					volunteering with Indiana AID. We will get back to you as soon as
					possible.
				</p>
				{/* name, email, phone (opt), areas of interest (multi picklist), Additional info (text area) */}
				<form className="w-full px-8 mt-4" onSubmit={handleSubmit}>
					<div className="flex flex-col md:flex-row gap-4 mb-4">
						<div className="form-group w-full md:w-1/3">
							<label
								htmlFor="name"
								className="block text-sm font-semibold mb-2">
								Name: <span className="text-red">*</span>
							</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								className="rounded-lg p-2 border-2 border-gray-300 text-black w-full"
								placeholder="Your name"
							/>
						</div>

						<div className="form-group w-full md:w-1/3">
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

						<div className="form-group w-full md:w-1/3">
							<label
								htmlFor="phone"
								className="block text-sm font-semibold mb-2">
								Phone: <span className="text-gray">(optional)</span>
							</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								className="rounded-lg p-2 border-2 border-gray-300 text-black w-full"
								placeholder="(123) 456-7890"
							/>
						</div>
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
							<span className="text-gray">(optional – e.g., web development, art, organizing, etc.)</span>
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
						className="bg-yellow text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-dark transition-colors duration-200">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
