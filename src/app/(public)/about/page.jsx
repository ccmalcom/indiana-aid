'use server';

import Image from 'next/image';
import Link from 'next/link';
import { getOurStory, getHeaderText, getLookingAhead, getAffiliations } from './actions';

export default async function About() {
	const ourStory = await getOurStory();
	const headerText = await getHeaderText();
	const { lookingAheadText, lookingAheadItems } = await getLookingAhead();
	const affiliations = await getAffiliations();
	return (
		<div className="viewport w-[80vw] mx-auto">
			<div className=" mx-auto flex flex-col space-y-16 py-12">
				<div className="text-center flex flex-col items-center ">
					<h1 className="text-4xl font-bold mb-4 text-blue">
						We Are <span className="text-yellow">Indiana AID</span>
					</h1>
					{/* Hero Image */}
					<div className="my-4 mx-auto">
						<Image
							src="/Dove_Chains.png"
							alt="Indiana AID Dove Chain Logo"
							width={1200}
							height={200}
							className="mx-auto"
						/>
					</div>

					{/* We Are Indiana AID Section */}
					<p className="my-8">
						{headerText}
					</p>
				</div>

				{/* Our Story Section */}
				<div className="flex flex-col md:flex-row items-start w-full gap-6">
					{/* Right text */}
					<div className="w-full pl-4">
						<h2 className="text-3xl font-bold mb-4 text-blue">Our Story</h2>
						{ourStory.map((paragraph, index) => (
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
						{lookingAheadText}
					</p>
					<ul className="list-disc list-inside space-y-2 mt-4">
						{lookingAheadItems.map((item, index) => (
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
							{affiliations.map((affiliation, index) => (
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

				{/* Get Involved! use yellow bg to pop*/}
				<div className="w-[100%] lg:w-[70%] mx-auto bg-yellow border border-yellow rounded-xl p-10 flex flex-col items-center text-blue">
					<h2 className="text-3xl font-bold mb-4 text-center underline">Get Involved!</h2>
					<p className="text-xl my-4 text-center font-semibold w-[80%] mx-auto">
						We’re always looking to expand our team for a variety of needs including, but not limited to: Visitation (In-Person & Virtual),  Fundraising, Translation, Administrative Assistance, Special Events
					</p>
					<button className='mt-4 p-4 bg-blue text-white rounded-xl font-semibold'>Sign Up to Volunteer</button>
					</div>
			</div>
		</div>
	);
}
