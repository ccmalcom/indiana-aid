'use client';

export default function Volunteer() {
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
			<div className="header w-[80vw] mx-auto flex flex-col items-center py-12">
				<h1 className="text-3xl text-center mb-4">
					Indiana AID is a volunteer group that supports individuals detained by
					ICE in Indiana by bearing witness to their experiences through visits,
					offering information, and providing resources to them and their
					families. 
				</h1>
			</div>
			<div className="volunteer-info mb-20 text-center px-4">
				<h2 className="text-3xl font-bold text-blue mb-2">Volunteer with Us</h2>
				<p className="mb-6">
					If you are interested in volunteering with Indiana AID, please fill
					out our{' '}
					<a href="#volunteer-form" className="text-blue-700 underline">
						volunteer sign-up form
					</a>
					.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{[
						{
							title: 'Virtual Visitation',
							img: '/virtual-visitation.jpg',
							alt: 'Virtual Visitation',
						},
						{
							title: 'Transportation & Translation',
							img: '/transport-translate.jpg',
							alt: 'Transportation and Translation',
						},
						{
							title: 'In-Person Visitation',
							img: '/circle-placeholder.svg',
							alt: 'In-Person Visitation',
						},
						{
							title: 'Community Integration Partnerships',
							img: '/circle-placeholder.svg',
							alt: 'Community Integration',
						},
					].map(({ title, img, alt }) => (
						<div key={title} className="flex flex-col items-center space-y-2">
							<div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
								<img
									src={img}
									alt={alt}
									className="object-cover w-full h-full"
								/>
							</div>
							<h3 className="font-semibold text-black text-center">{title}</h3>
							<button className="text-blue-700 text-sm hover:underline">
								+ Learn More
							</button>
						</div>
					))}
				</div>
			</div>
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

						<div className="flex flex-col gap-2">
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									name="interest"
									value="visitation"
									className="mr-2"
								/>
								Visitation
							</label>
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									name="interest"
									value="spiritual_care"
									className="mr-2"
								/>
								Spiritual Care
							</label>
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									name="interest"
									value="commissary_support"
									className="mr-2"
								/>
								Commissary Support
							</label>
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									name="interest"
									value="community_outreach"
									className="mr-2"
								/>
								Community Outreach
							</label>
						</div>
					</fieldset>

					<div className="form-group mb-4">
						<label
							htmlFor="additional_info"
							className="block text-sm font-semibold mb-2">
							Additional Information:{' '}
							<span className="text-gray">(optional)</span>
						</label>
						<textarea
							id="additional_info"
							name="additional_info"
							className="rounded-lg p-2 border-2 border-gray-300 text-black w-full"
							rows="4"
							placeholder="Any additional information or questions..."></textarea>
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
