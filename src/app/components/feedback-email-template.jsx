export default function FeedbackEmailTemplate({ message }) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-4">New Feedback Form Submission</h1>
			<p className="text-gray-700">
				<strong>Message:</strong> {message}
			</p>
		</div>
	);
}
