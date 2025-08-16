// 'use server';

import Image from 'next/image';
import Link from 'next/link';
import HeroSwitcher from '@/app/ui/HeroSwitcher/page';
// actions get data from supabase website_content table
import { getAboutPageContent } from '@/app/actions';


export default async function About() {

	const content = await getAboutPageContent();
	const {
		headerText,
		lookingAheadText,
		lookingAheadItems,
		affiliations,
		ourStory,
		getInvolvedCard
	} = content


	return (
		<div className="viewport w-[80vw] mx-auto">
			<div className=" mx-auto flex flex-col space-y-16 py-12">
				<div className="text-center flex flex-col items-center ">
					<div className="my-4 mx-auto">
						<HeroSwitcher />
					</div>

					{/* We Are Indiana AID Section */}
					<p className="my-8">
						{headerText.value}
					</p>
				</div>

				{/* Our Story Section */}
				<div className="flex flex-col md:flex-row items-start w-full gap-6">
					{/* Right text */}
					<div className="w-full">
						<h2 className="text-3xl font-bold mb-4 text-blue">{ourStory.value}</h2>
						{ourStory.value_list.map((paragraph, index) => (
							<p key={index} className="mb-4">
								{paragraph}
							</p>
						))}
					</div>
				</div>

				{/* Looking Ahead */}
				<div className="w-full">
					<h2 className="text-3xl font-bold mb-4 text-blue">{lookingAheadText.value_json.header}</h2>
					<p>
						{lookingAheadText.value_json.text}
					</p>
					<ul className="list-disc list-inside space-y-2 mt-4">
						{lookingAheadItems.value_list.map((item, index) => (
							<li key={index} className=" -indent-6 pl-6">
								{item}
							</li>
						))}
					</ul>
				</div>

				{/* Affiliations Section */}
				<div className="w-full">
					<h2 className="text-3xl font-bold mb-4 text-blue">{affiliations.value}</h2>
					<div className="w-full max-w-[935px]">
						<ul className="list-disc list-inside space-y-2">
							{affiliations.value_json.affiliations.map((affiliation, index) => (
								<li key={index} className=" -indent-6 pl-6">
									{affiliation.url ? (
										<Link
											href={affiliation.url}
											className=" hover:underline decoration-yellow hover:decoration-2"
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
					<h2 className="text-3xl font-bold mb-4 text-center underline">{getInvolvedCard.value_json.heading}</h2>
					<p className="text-xl my-4 text-center font-semibold w-[100%] sm:w-[90%] md:w-[80%] mx-auto">
						{getInvolvedCard.value_json.body} 
					</p>
					<ul className="list-disc list-inside text-blue text-xl grid grid-cols-1  text-left md:text-left items-center font-semibold">
						{getInvolvedCard.value_json.list.map((item, index) => (
							<li key={index} className=" -indent-6 pl-6">
								{item}
							</li>
						))}
					</ul>
					<Link href="/volunteer">
						<button className='mt-4 p-4 bg-blue text-white rounded-xl font-semibold'>{getInvolvedCard.value_json.button}</button>
					</Link>
					</div>
			</div>
		</div>
	);
}
