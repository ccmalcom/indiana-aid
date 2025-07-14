// 'use server';

import Link from 'next/link';
import CollapsibleList from '@/app/ui/CollapsibleList';
import { getResourcePageContent } from '@/app/actions';

export const dynamic = 'force-static';
export const revalidate = 3600; // every hour

// eventually fetch this from a database or API
// for now, hardcoded for simplicity
//? could we add 'location' so we can show on map


export default async function ResourcesPage() {
	const content = await getResourcePageContent();
	const { resourceList, resourcesHeader, resourceButtons } = content;
	return (
		<main className="bg-white min-h-screen text-blue px-6 py-12">
			<div className="max-w-5xl mx-auto">
				{/* Heading */}
				<div className="text-center mb-12">
					<h1 className="text-3xl font-bold mb-2">{resourcesHeader.value_json.headerText}</h1>
					<p className="italic mb-8 max-w-3xl mx-auto">
						{resourcesHeader.value_json.headerDescription}
					</p>
				</div>

				{/* Top Buttons */}
				<div className="flex flex-wrap gap-4 mb-10 justify-evenly">
					{resourceButtons.value_json.map((button, index) => (
						<Link
							key={index}
							href={button.href}
							className={button.className}>
							{button.text}
						</Link>
					))}
				</div>

				{/* Collapsible Resources */}
				{/* collapsible heading */}
				<CollapsibleList resourceHeadings={resourceList.value_json} />
			</div>
		</main>
	);
}
