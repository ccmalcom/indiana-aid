import { getUserDetails } from '../actions';
import ProfileDataForm from './ProfileDataForm';
import Link from 'next/link';
import Header from '../ui/Header';

export default async function Profile() {
	const user = await getUserDetails();


	return (
		<div className="viewport min-h-[66vh] text-center">
			<Header heading="Profile" />
			<ProfileDataForm data={user} />
			<div className="mt-4">
			<Link className="bg-yellow text-black rounded-lg p-2 ml-2" href="/admin/profile/change-password">
				Change Password
			</Link>
			{/* <Link className="bg-red text-white rounded-lg p-2 ml-2" href="/admin/profile/delete-account">
				Delete Account
			</Link> */}
		</div>


		</div>
	);
}
