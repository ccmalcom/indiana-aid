export default function ContactEmailTemplate({ name, email, message }) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-4">New Contact Form Submission</h1>
			<p className="text-gray-700 mb-2">
				<strong>Name:</strong> {name}
			</p>
			<p className="text-gray-700 mb-2">
				<strong>Email:</strong> {email}
			</p>
			<p className="text-gray-700">
				<strong>Message:</strong> {message}
			</p>
		</div>
	);
}
