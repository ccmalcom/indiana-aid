// 'use client';
'use server';
import Link from 'next/link';
import { logoutUser } from '../../actions';

export default async function Nav() {

	return (
		<header className="bg-white shadow px-6 py-4 flex justify-between items-center">
			<h1 className="text-xl font-bold">Indiana AID Admin</h1>
			<nav className="space-x-4 text-sm">
				<Link href="/admin" className="hover:underline">
					Home
				</Link>
				<Link href="/admin/volunteer-applications" className="hover:underline">
					Volunteer Apps
				</Link>
                <Link href="/admin/newsletters" className="hover:underline">
                    Newsletters
                </Link>
				<Link href="/admin/profile" className="hover:underline">
					Profile
				</Link>
				<button onClick={logoutUser} className="hover:underline">
					Logout
				</button>
			</nav>
		</header>
	);
}
