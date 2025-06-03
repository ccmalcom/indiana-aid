import Image from 'next/image';
import VolunteerForm from './VolunteerForm';
import Link from 'next/link';
import VolunteerOpportunities from './VolunteerOpportunities';



export default function Volunteer() {
	
	

	return (
		<div className="viewport ">
			<div className="volunteer-info my-12 text-center px-4">
				<h2 className="text-4xl font-heading font-bold text-blue mb-2">
					Volunteer with Us!
				</h2>
				<p className="mb-6 font-body text-lg">
					If you are interested in volunteering with Indiana AID, please fill
					out our{' '}
					<a href="#volunteer-form" className="text-blue-700 underline">
						volunteer sign-up form
					</a>
					.
				</p>
			</div>
			{/* oppty icons */}
			<VolunteerOpportunities />
			{/* volunteer form */}

			<VolunteerForm />
		</div>
	);
}
