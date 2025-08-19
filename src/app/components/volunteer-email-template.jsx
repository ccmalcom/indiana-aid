export default function VolunteerEmailTemplate(application) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-4">New Volunteer Form Submission</h1>
			<h2 className="text-xl font-semibold mb-2">Full Details Below - <a href="www.indianaaid.org/admin/volunteers/applications">View On Website</a></h2>
			<div className="modal-content grid grid-cols-2 gap-4">
				<p>
					<strong>Name:</strong> {application.name}
				</p>
				<p>
					<strong>Pronouns:</strong> {application.pronouns}
				</p>
				<p>
					<strong>Email:</strong> {application.email}
				</p>
				<p>
					<strong>Phone:</strong> {application.phone}
				</p>
				<p>
					<strong>Languages:</strong> {application.languages.join(', ')}
				</p>
				<p>
					<strong>Interest Areas:</strong>{' '}
					{application.interest_areas.join(', ')}
				</p>
				<p>
					<strong>Additional Info:</strong>{' '}
					{application.additional_info || 'N/A'}
				</p>
				<p>
					<strong>Signal Handle:</strong> {application.signal_handle}
				</p>
				<p>
					<strong>Social Media Handles:</strong> {application.social_media_handles}
				</p>
				<p className="">
					<strong>Bio:</strong> {application.bio ?? 'N/A'}
				</p>
				<p>
					<strong>Referrer:</strong> {application.referrer ?? 'N/A'}
				</p>
				<p className="">
					<strong>Previously worked with US Immigration Agency?</strong> {application.immigration_history}
				</p>
				<p>
					<strong>Currently Working with other groups?</strong> {application.currently_working}
				</p>
				<p className="">
					<strong>Currently Working – Explanation:</strong> {application.currently_working_explanation ?? 'N/A'}
				</p>
				<p className="">
					<strong>Relevant Skills:</strong> {application.relevant_skills}
				</p>
				<p className="">
					<strong>Other Skills:</strong> {application.other_skills ?? 'N/A'}
				</p>
			</div>
		</div>
	);
}
