// 'use server';

import Link from 'next/link';
import CollapsibleList from '@/app/ui/CollapsibleList';
import { getResourcePageContent } from '@/app/actions';


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
