'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function VolunteerOpportunities({ content }) {
	const imageDescriptions = [
		{
			title: 'In-Person Visitation',
			src: '/solid-icons/Visitation_Icon.png',
			alt: 'In Person Visit',
			description:
				'Visit detainees to offer direct support, bear witness, and build human connection with those inside detention centers.',
		},
		{
			title: 'Virtual Visitation',
			src: '/solid-icons/Virtual_Visit_Icon.png',
			alt: 'Virtual Visit',
			description:
				'Virtual volunteers coordinate and conduct video visits with detainees, offering companionship and support.',
		},
		{
			title: 'Grant Writing',
			src: '/solid-icons/Grant_Icon.png',
			alt: 'Grant Writing',
			description:
				'Help us secure funding by researching and writing grant proposals for our programs and support efforts.',
		},
		{
			title: 'Translation',
			src: '/solid-icons/Translate_Icon.png',
			alt: 'Translation Icon',
			description:
				'Assist with translating documents and communication for non-English-speaking detainees and families.',
		},
		{
			title: 'Administrative Assistance',
			src: '/solid-icons/Admin_Icon.png',
			alt: 'Administration Icon',
			description:
				'Help with data entry, organization, and behind-the-scenes tasks that keep our work running.',
		},
		{
			title: 'Fundraising',
			src: '/solid-icons/Fundraising_Icon.png',
			alt: 'Fundraising Icon',
			description:
				'Plan events and campaigns to raise money for detainee support (e.g., books, commissary, puzzles).',
		},
	];

	const [open, setOpen] = useState(null);
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 mb-12 px-4 w-[70vw] mx-auto">
			{imageDescriptions.map((item, idx) => (
				<div
					key={idx}
					className="text-center grid grid-cols-1 md:grid-rows-3">
					<div className="row-span-2 flex items-center justify-center">
						<Image
							src={item.src}
							alt={item.alt}
							width={150}
							height={150}
							className=""
						/>
					</div>
					<div
						className={`flex items-center justify-center gap-2 font-semibold text-lg cursor-pointer `}
						onClick={() => setOpen(open === idx + 100 ? null : idx + 100)}>
						<span className='hover:underline decoration-yellow hover:decoration-2 transition-all duration-200 text-blue'>{item.title}</span>
						<span className="text-xl ">{open === idx + 100 ? '−' : '+'}</span>
					</div>
					{open === idx + 100 && (
						<div className="mt-2 text-md text-black font-body">
							<p>{item.description}</p>
						</div>
					)}
				</div>
			))}
			<div className="col-span-full text-center text-md font-body text-gray-700 mt-4">
				Don’t see your skill listed? We still welcome other talents like web
				development, art, organizing, and more!
			</div>
		</div>
	);
}
