import Link from 'next/link';
import CollapsibleList from '@/app/ui/CollapsibleList';
import { getResourceList } from './actions';

// eventually fetch this from a database or API
// for now, hardcoded for simplicity
//? could we add 'location' so we can show on map
const resourceHeadings = await getResourceList();

export default async function ResourcesPage() {
	return (
		<main className="bg-white min-h-screen text-[#0a1744] px-6 py-12">
			<div className="max-w-5xl mx-auto">
				{/* Heading */}
				<div className="text-center mb-12">
					<h1 className="text-3xl font-bold mb-2">Indiana AID Resources</h1>
					<p className="italic mb-8 max-w-3xl mx-auto">
						Indiana AID is a volunteer group that is not associated with any
						government organization. We cannot provide professional legal advice
						and we do not sanction any kind of illegal activity.
					</p>
				</div>

				{/* Top Buttons */}
				<div className="flex flex-wrap gap-4 mb-10 justify-evenly">
					<Link
						href="/contact"
						className="bg-[#0a1744] text-white px-6 py-3 rounded font-semibold text-center hover:text-yellow w-60">
						Request Our Assistance
					</Link>
					<Link
						href="/resources/newsletter"
						className="bg-[#0a1744] text-white px-6 py-3 rounded font-semibold text-center hover:text-yellow w-60">
						Newsletter
					</Link>
					<Link
						href="/resources/volunteer"
						className="bg-[#0a1744] text-white px-6 py-3 rounded font-semibold text-center hover:text-yellow w-60">
						Volunteer Resources
					</Link>
				</div>

				{/* Collapsible Resources */}
				{/* collapsible heading */}
				<CollapsibleList resourceHeadings={resourceHeadings} />
			</div>
		</main>
	);
}
