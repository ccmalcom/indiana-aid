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
			<div className="header w-[80vw] mx-auto flex flex-col items-center">
				<h1 className="text-4xl font-bold mt-4">Make a difference</h1>
				<br />
				<p>
					Indiana AID (Assistance to Immigrants in Detention) is a volunteer
					group that supports individuals detained by ICE in Indiana by bearing
					witness to their experiences through visits, offering information, and
					providing resources to them and their families. We have a group that
					travels to the Clay County jail once per month for spiritual care, as
					well as a virtual visitation program through which we offer to pair
					every immigrant who arrives there with a visitation partner. We also
					facilitate connections between immigrants and various service
					providers in our region, provide commissary support so that the people
					can buy food and medicine, and offer general updates to the public
					about developments in immigration detention in our state.
				</p>
			</div>
			<div className="volunteer-form w-[66vw] mx-auto flex flex-col items-center bg-blue rounded-2xl shadow-lg p-8 m-4 text-white">
				<h2 className="text-2xl font-semibold">Sign Up to Volunteer</h2>
				<p className="m-2 text-center">
					Please fill out the form below to express your interest in
					volunteering with Indiana AID. We will get back to you as soon as
					possible.
				</p>
				{/* name, email, phone (opt), areas of interest (multi picklist), Additional info (text area) */}
				<form className="w-full max-w-lg mt-4" onSubmit={handleSubmit}>
					<div className="form-group mb-4">
						<label htmlFor="name" className="block text-sm font-semibold mb-2">
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

					<div className="form-group mb-4">
						<label htmlFor="email" className="block text-sm font-semibold mb-2">
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

					<div className="form-group mb-4">
						<label htmlFor="phone" className="block text-sm font-semibold mb-2">
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
