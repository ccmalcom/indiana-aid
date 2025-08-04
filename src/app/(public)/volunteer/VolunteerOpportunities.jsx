'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function VolunteerOpportunities({ content }) {
	const { volunteerOpportunities, volunteerOpportunitiesText } = content;


	const [open, setOpen] = useState(null);
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 mb-12 px-4 w-[70vw] mx-auto">
			{volunteerOpportunities.value_json.opportunities.map((item, idx) => (
				<div
					key={idx}
					className="text-center grid grid-cols-1 md:grid-rows-3 mb-8 lg:mb-0">
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
				<p>{volunteerOpportunitiesText.value}</p>
			</div>
		</div>
	);
}
