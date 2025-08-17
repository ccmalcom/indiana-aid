import VolunteerForm from './VolunteerForm';
import VolunteerOpportunities from './VolunteerOpportunities';
import { getVolunteerPageContent } from '@/app/actions';

export const dynamic = 'force-static';
export const revalidate = 3600; // every hour



export default async function Volunteer() {


	const content = await getVolunteerPageContent();

	const {
		volunteerHeaderText,
		volunteerSubHeadingText,
		formEmailLabel,
		formFirstNameLabel,
		formLastNameLabel,
		formPhoneLabel,
		formLanguagesLabel,
		formAreasOfInterestValues,
		formAreasOfInterestLabel,
		formAreasOfInterestInstruction,
		formLanguagesValues,
		formAdditionalInfoLabel,
		formAdditionalInfoPlaceholder,
		formLanguagesInstructions,
		formSubmitButtonText,
		volunteerFormHeaderText,
		volunteerFormInstructionsText,
		volunteerOpportunitiesText,
		successHeader,
		successMessage,
		contactUsLink,
		errorHeader,
		errorMessage,
		volunteerOpportunities,
		volunteerForm
	} = content;

	return (
		<div className="viewport ">
			<div className="volunteer-info my-12 text-center px-4">
				<h2 className={volunteerHeaderText.style}>
					{volunteerHeaderText.value}
				</h2>
				<p className={volunteerSubHeadingText.style}>
					{volunteerSubHeadingText.value}
				</p>
			</div>
			{/* oppty icons */}
			<VolunteerOpportunities content={content} />
			{/* volunteer form */}

			<VolunteerForm content={content} />
		</div>
	);
}
