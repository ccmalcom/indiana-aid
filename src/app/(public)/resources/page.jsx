import Link from 'next/link';
import CollapsibleList from '@/app/ui/CollapsibleList';
import { text } from '@fortawesome/fontawesome-svg-core';

// eventually fetch this from a database or API
// for now, hardcoded for simplicity
//? could we add 'location' so we can show on map
const resourceHeadings = {
	'Community Resources': {
		'Community Resources Search in Indiana': [
			{
				text: 'FindHelp.org',
				url: 'https://www.findhelp.org/',
			},
			{
				text: '211 Indiana - Multi-Language (call 211)',
				url: 'https://www.in211.org/',
			},
		],
		'Community Resources Search in Indianapolis': [
			{
				text: 'Single Parent Connection, Inc.',
				url: 'https://www.singleparentconnection.org/resources',
			},
			{
				text: 'Handbook of Help - CHIP Indy - English',
				url: 'https://www.chipindy.org/wp-content/uploads/2025/02/CHIP-Handbook-of-Help-2025-GH-final.pdf',
			},
			{
				text: 'Manuel De Ayuda - CHIP Indy - Español',
				url: 'https://www.chipindy.org/wp-content/uploads/2023/10/chip_handbook_of_help_2023_final_spanish.pdf',
			},
			{
				text: 'Manyèl pou Èd - CHIP Indy - Haitian Creole',
				url: 'https://www.chipindy.org/wp-content/uploads/2024/05/CHIP-Handbook-of-Help-2023-Final_Haitian-Creole.pdf',
			},
			{
				text: 'Immigrant Welcome Center - Indianapolis',
				url: 'https://immigrantwelcomecenter.org/resources/',
			},
		],
		'Child Care / Child-focused Support Services': [
			{
				text: 'Child Care Answers',
				url: 'https://www.childcareanswers.com/',
			},
			{
				text: 'Child Care Finder - Helps you locate child care providers in Indiana',
				url: 'https://www.in.gov/fssa/childcarefinder/',
			},
			{
				text: 'Community Partners for Child Safety - Firefly Children & Family Alliance',
				url: 'https://fireflyin.org/programs-services/child-abuse-prevention/community-partners-for-child-safety/',
			},
      {
        text: 'Woman, Infants, and Children (WIC) - Indiana',
        url: 'https://marionhealth.org/wic/'
      }
		],
		'Household / Clothing / Child / Baby Items': [
      {
        text: 'St. Vincent de Paul - Household Basics Request Form',
        url: 'https://www.svdpindy.org/get-help/household-basics-request-form/'
      },
      {
        text: 'Indy Hygiene Hub - Personal Care Pantry',
        url: 'https://www.indyhygienehub.org/personal-care-pantry'
      },
      {
        text: 'Lambswear - Providing gently-used clothing and necessities to children in need. Free children’s clothing, size preemie to 14/16Y, to any family in Indianapolis and surrounding counties.',
        url: 'https://www.lambswear.org/',
      },
      {
        text: 'Indiana - Grassroots Project - Diapers, Children’s Clothes, Car Seat (when available)',
        url: 'https://www.grassrootprojects.org/indiana-1-595142-289764.html'
      },
      {
        text: 'Hub for Hope - St. Lukes (Washington Township) - Diapers & More',
        url: 'https://stlukesumc.com/hubforhope',
      },
      {
        text: 'Laundry & More - Wash clothes & bedding for free',
        url: 'https://laundryandmore.org/',
      },
      {
        text: 'Mommy to the Rescue | The Mom Cave - Baby essentials, safe sleep and travel items (Eligibility - Must be a resident of Indiana and have a photo ID. Can apply quarterly)',
        url: 'https://www.themomcaveco.org/mommy-to-the-rescue',
      },
    ],
		'Food Assistance': [
      {
        text: 'Community Compass',
        url: 'https://www.indyhunger.org/compass/'
      },
      {
        text: 'Find Food - Gleaners',
        url: 'https://www.gleaners.org/findhelp/'
      },
      {
        text: 'Food Banks - Recovery Cafe Indy',
        url: 'https://www.recoverycafeindy.org/food-banks.html'
      },
      {
        text: 'Events - Cafe Indy - Monthly food pantry',
        url: 'https://www.cafeindy.org/events'
      },
      {
        text: 'Get Help - SVdP Indy',
        url: 'https://www.svdpindy.org/get-help/'
      },
      {
        text: 'Mid-North Food Pantry',
        url: 'https://www.midnorthfoodpantry.org/',
      },
      {
        text: 'Indy Hunger Network - or text the word “hi” to 317-434-3758 to find assistance.',
        url: 'https://indyhunger.org/find-help/',
      },
      {
        text: 'Lyft Grocery Access Flyer - English ',
        url: 'https://docs.google.com/viewerng/viewer?url=https://files.elfsight.com/storage/7e2bd631-ad6f-4510-a965-36fc18fa339d/b898da54-331d-472d-a12b-bfba998add6d/Lyft-Grocery-Access-Flyer.pdf'
      }
    ],
		Employment: [
      {
        text: 'Project Azul',
        url: 'https://www.projectazul.org/',
      },
      {
        text: 'Morales Group',
        url: 'https://www.moralesgroup.net/',
      },
      {
        text: 'Indianapolis Urban League - Job and Career Seekers',
        url: 'https://indplsul.org/job-seekers/',
      }
    ],
		Medical: [
      {
        text: 'FREE Medical Clinics - Gennesaret',
        url: 'https://www.gennesaret.org/medical/',
      },
      {
        text: 'FREE Dental Clinics - Gennesaret',
        url: 'https://www.gennesaret.org/dental/',
      },
      {
        text: 'FREE Women’s Health Services - Gennesaret',
        url: 'https://www.gennesaret.org/whs/',
      },
      {
        text: 'Shalom Health Care Center',
        url: 'https://www.shalomhealthcenter.org/',
      },
      {
        text: 'Rophe Free Clinic',
        url: 'https://rophe.org/',
      },
      {
        text: 'Near West Free Clinic',
        url: 'http://www.nearwestfreeclinic.com/',
      },
      {
        text: 'Student Outreach Clinic | Indianapolis | IU School of Medicine',
        url: 'https://medicine.iu.edu/indianapolis/service-learning/outreach-clinic',
      },
      {
        text: 'Near West Free Clinic',
        url: 'https://goodnewsministries.com/health-clinic-2/',
      },
    ],
		'Legal Services': [
      {
        text: 'IndyBar - Indy Find a Lawyer',
        url: 'https://www.indybar.org/?pg=lawyer-referral',
      },
      {
        text: 'Indiana Legal Services',
        url: 'https://www.indianalegalservices.org/',
      },
      {
        text: 'National Immigration Legal Services Directory',
        url: 'https://www.immigrationadvocates.org/legaldirectory/',
      },
    ],
		'Cultural Organizations': [
      {
        text: 'La Plaza - Latino community',
        url: 'https://www.laplazaindy.org/',
      },
      {
        text: 'Hope For Tomorrow - Burmese, Chin, & American communities',
        url: 'https://www.hopefortomorrowusa.org/',
      },
      {
        text: 'Chin Community of Indiana',
        url: 'https://www.chincommunityin.org/',
      },
      {
        text: 'Burmese American Community Institute',
        url: 'https://thebaci.org/',
      },
      {
        text: 'Immigrant Welcome Center',
        url: 'https://immigrantwelcomecenter.org/',
      },
      {
        text: 'Patchwork Indy',
        url: 'https://www.patchworkindy.org/',
      },
      {
        text: 'Exodus Refugee Immigration',
        url: 'https://www.exodusrefugee.org/',
      },
      {
        text: 'Immigrant Services | Indianapolis Public Library',
        url: 'https://www.indypl.org/services/immigrant-services',
      },
      {
        text: 'Coalition for our Immigrant Neighbors (COIN)',
        url: 'https://coalitionforourimmigrantneighbors.org/',
      },
      {
        text: 'Jewish Federation of Greater Indianapolis',
        url: 'https://www.jewishindianapolis.org/',
      },
      {
        text: 'Indianapolis Muslim Community Association (IMCA)',
        url: 'https://imcaindy.org/',
      },
    ],
	},

	'Immigration Resources': {
		'Know Your Rights': [{}],
		'Legal & Court Resources': [{}],
		'General Resources': [{}],
		'Avoid Immigration Scams': [{}],
		'Asylum Information': [{}],
		'Detention & Deportation': [{}],
		'Family Preparedness': [{}],
		'Communities / Organizations / Rapid Response': [{}],
		'Immigration & School': [{}],
	},
	'Support Your Community': [
		'Donate',
		'Stay Informed',
		'Volunteer',
		'Advocate',
	],
};

export default async function ResourcesPage() {
	return (
		<main className="bg-white min-h-screen text-[#0a1744] px-6 py-12">
			<div className="max-w-5xl mx-auto">
				{/* Heading */}
				<h1 className="text-3xl font-bold mb-2">Indiana AID Resources</h1>
				<p className="italic mb-8 max-w-3xl">
					Indiana AID is a volunteer group that is not associated with any
					government organization. We cannot provide professional legal
					advice... we do not sanction any kind of illegal activity, etc etc.
				</p>

				{/* Top Buttons */}
				<div className="flex flex-wrap gap-4 mb-10">
					<Link
						href="/contact"
						className="bg-[#0a1744] text-white px-6 py-3 rounded font-semibold text-center w-60">
						Request Our Assistance
					</Link>
					<Link
						href="/resources/newsletter"
						className="bg-[#0a1744] text-white px-6 py-3 rounded font-semibold text-center w-60">
						Newsletter
					</Link>
					<Link
						href="/resources/community"
						className="bg-[#0a1744] text-white px-6 py-3 rounded font-semibold text-center w-60">
						Community Resources
					</Link>
					<button className="bg-[#0a1744] text-white px-6 py-3 rounded font-semibold text-center w-60">
						???
					</button>
				</div>

				{/* Collapsible Resources */}
				{/* collapsible heading */}
				<CollapsibleList resourceHeadings={resourceHeadings} />
			</div>
		</main>
	);
}
