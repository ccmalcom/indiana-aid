import Link from 'next/link';
import CollapsibleList from '@/app/ui/CollapsibleList';

// eventually fetch this from a database or API
// for now, hardcoded for simplicity
const resourceHeadings = {
	'Community Resources': [
		'Community Resources Search in Indiana',
		'Community Resources Search in Indianapolis',
		'Child Care / Child-focused Support Services',
		'Household / Clothing / Child / Baby Items',
		'Food Assistance',
		'Employment',
		'Medical',
		'Legal Services',
		'Cultural Organizations',
	],
	'Immigration Resources': [
		'Know Your Rights',
		'Legal & Court Resources',
		'General Resources',
		'Avoid Immigration Scams',
		'Asylum Information',
		'Detention & Deportation',
		'Family Preparedness',
		'Communities / Organizations / Rapid Response',
		'Immigration & School',
	],
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
        <CollapsibleList
          resourceHeadings={resourceHeadings}
        />
				
			</div>
		</main>
	);
}
