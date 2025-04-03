export default function VolunteerEmailTemplate({
	name,
	email,
	phone,
	areasOfInterest,
	additionalInfo,
}) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-4">New Volunteer Form Submission</h1>
			<p className="text-gray-700 mb-2">
				<strong>Name:</strong> {name}
			</p>
			<p className="text-gray-700 mb-2">
				<strong>Email:</strong> {email}
			</p>
			<p className="text-gray-700 mb-2">
				<strong>Phone:</strong> {phone}
			</p>
			<p className="text-gray-700 mb-2">
				<strong>Areas of Interest:</strong> {areasOfInterest.join(', ')}
			</p>
			<p className="text-gray-700">
				<strong>Additional Information:</strong> {additionalInfo}
			</p>
		</div>
	);
}
