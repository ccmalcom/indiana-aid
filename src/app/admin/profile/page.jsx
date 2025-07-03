import { getUserDetails } from '../actions';
import ProfileDataForm from './ProfileDataForm';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default async function Profile() {
	const user = await getUserDetails();

	return (
		<div className="viewport min-h-[66vh] text-center">
			<div className='header grid grid-cols-4'>
			{/* back button */}
				<Link href="/admin" className="text-blue hover:underline col-span-1 text-left p-4">
					<FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
				</Link>
			<h1 className="text-2xl font-semibold my-4 col-span-2">Profile</h1>
			</div>
			
			<ProfileDataForm data={user} />
			<div className="flex items-center mx-auto w-[50%] flex-col">
				<p>Created at: {new Date(user.created_at).toLocaleDateString()}</p>
				<p>Last updated at: {new Date(user.updated_at).toLocaleDateString()}</p>
			</div>
		</div>
	);
}
