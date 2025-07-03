
import { getUserDetails } from '../../actions';
import Link from 'next/link';
import { sendPasswordReset } from '../actions';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResetLink from './ResetLink';

export default async function ChangePassword() {
	const user = await getUserDetails();
	const email = user?.email;


	return (
		// clicking the button will send reset password email from supabase
        
		<div className="viewport min-h-[66vh] text-center">
            <div className="header grid grid-cols-4">
				<Link
					href="/admin/profile"
					className="text-blue hover:underline col-span-1 text-left p-4">
					<FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
				</Link>
				<h1 className="text-2xl font-semibold my-4 col-span-2">Change Password</h1>
			</div>
			<p className="text-gray-600 mb-4">
				A password reset link will be sent to your email.
			</p>

			{/*  */}
			<div>
				<p>Current Email: {email}</p>
				<div className="flex items-center mx-auto flex-col w-64 mt-4">
					<Link
						href="/admin/profile"
						className="text-blue hover:bg-gray-300 bg-gray-200 rounded w-full py-2 px-4">
						Change Email
					</Link>
					<ResetLink data={user} />
				</div>
			</div>
		</div>
	);
}
