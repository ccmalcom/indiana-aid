import Link from 'next/link';
export default function ProfileCard({ user }) {
	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="text-xl font-semibold mb-4">Profile</h2>
			<div className="space-y-2">
				<p>
					<strong>Name:</strong> {user.name || 'User Name'}
				</p>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
				<p>
					<strong>Role:</strong> {user.role || 'User'}
				</p>
				<p>
					<strong>Joined:</strong>{' '}
					{new Date(user.created_at).toLocaleDateString()}
				</p>
			</div>
			<div className="flex flex-col items-center">
				<Link href="/admin/profile">
					<button className="mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue-600">
						Update Profile
					</button>
				</Link>
				<Link href="/admin/users">
					<button className="mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue-600">
						Manage Admin Users
					</button>
				</Link>
			</div>
		</div>
	);
}
