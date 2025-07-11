// 'use server';

import Image from 'next/image';
import Link from 'next/link';
// actions get data from supabase website_content table
import { getAboutPageContent } from '@/app/actions';

export const dynamic = 'force-static';
export const revalidate = 3600; // every hour

export default async function About() {

	const content = await getAboutPageContent();
	const {
		headerText,
		lookingAheadText,
		lookingAheadItems,
		affiliations,
		ourStory,
		header
	} = content


	return (
		<div className="viewport w-[80vw] mx-auto">
			<div className=" mx-auto flex flex-col space-y-16 py-12">
				<div className="text-center flex flex-col items-center ">
					<div className="my-4 mx-auto">
						<Image
							src="/WeAreIndianaAID.png"
							alt="Indiana AID Dove Chain Logo"
							width={1200}
							height={200}
							className="mx-auto"
						/>
					</div>

					{/* We Are Indiana AID Section */}
					<p className="my-8">
						{headerText.value}
					</p>
				</div>

				{/* Our Story Section */}
				<div className="flex flex-col md:flex-row items-start w-full gap-6">
					{/* Right text */}
					<div className="w-full pl-4">
						<h2 className="text-3xl font-bold mb-4 text-blue">Our Story</h2>
						{ourStory.value_list.map((paragraph, index) => (
							<p key={index} className="mb-4">
								{paragraph}
							</p>
						))}
					</div>
				</div>

				{/* Looking Ahead */}
				<div className="w-full">
					<h2 className="text-3xl font-bold mb-4 text-blue">Looking Ahead</h2>
					<p>
						{lookingAheadText.value}
					</p>
					<ul className="list-disc list-inside space-y-2 mt-4">
						{lookingAheadItems.value_list.map((item, index) => (
							<li key={index} className="text-blue-700">
								{item}
							</li>
						))}
					</ul>
				</div>

				{/* Affiliations Section */}
				<div className="w-full">
					<h2 className="text-3xl font-bold mb-4 text-blue">Affiliations</h2>
					<div className="bg-blue-100 border border-blue-300 rounded p-4 w-full max-w-[935px]">
						<ul className="list-disc list-inside space-y-2">
							{affiliations.value_json.affiliations.map((affiliation, index) => (
								<li key={index} className="text-blue-700">
									{affiliation.url ? (
										<Link
											href={affiliation.url}
											className="text-blue hover:underline decoration-yellow hover:decoration-2"
											target="_blank"
											rel="noopener noreferrer"
										>
											{affiliation.text}
										</Link>
									) : (
										affiliation.text
									)}
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Get Involved! */}
				<div className="w-[100%] lg:w-[70%] mx-auto bg-yellow border border-yellow rounded-xl p-10 flex flex-col items-center text-blue">
					<h2 className="text-3xl font-bold mb-4 text-center underline">Get Involved!</h2>
					<p className="text-xl my-4 text-center font-semibold w-[100%] sm:w-[90%] md:w-[80%] mx-auto">
						We’re always looking to expand our team for a variety of needs including, but not limited to: 
					</p>
					<ul className="list-disc list-inside text-blue text-xl grid grid-cols-1  text-center md:text-left items-center font-semibold">
						<li className='mr-2'>Visitation - In-Person & Virtual</li>
						<li className='mr-2'>Fundraising</li>
						<li className='mr-2'>Translation</li>
						<li className='mr-2'>Administrative Assistance</li>
						<li className='mr-2'>Special Events</li>
					</ul>
					<Link href="/volunteer">
						<button className='mt-4 p-4 bg-blue text-white rounded-xl font-semibold'>Sign Up to Volunteer</button>
					</Link>
					</div>
			</div>
		</div>
	);
}
