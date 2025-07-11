// 'use server';

import Image from 'next/image';
import Link from 'next/link';
import { getDonatePageContent } from '@/app/actions';

export const dynamic = 'force-static'; 
export const revalidate = 3600; 

export default async function Donate() {
	const content = await getDonatePageContent();
	const{
		donateHeader,
		donateSubHeader,
		donateDisclaimer,
		whereTheMoneyGoes,
		donationTaxInfo,
		donateOnlineCard,
		donateByCheckCard
	} = await content;

	console.log('Donate Page Content:', JSON.stringify(content, null, 2));
	return (
		// donation header
		<div className="px-4 py-12 max-w-6xl mx-auto">
			<div className="text-center mb-6">
				<h1 className="text-4xl text-blue font-bold mb-2">{donateHeader.value}</h1>
				<p className="text-lg font-semibold text-gray-800">
					{donateSubHeader.value}
				</p>
				<p className="text-sm italic mt-2 max-w-2xl mx-auto text-gray-600">
					{donateDisclaimer.value}
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-6 mb-12">
				{/* Donate Online */}
				<div className="bg-blue text-white p-6 rounded shadow text-md">
					<h2 className="text-2xl font-bold text-yellow mb-2">
						{donateOnlineCard.value_json.header}
					</h2>
					<ol className="list-decimal pl-5 space-y-1">
						{donateOnlineCard.value_json.steps.map((step, index) => (
							<li key={index} className="font-semibold">
								{step}
							</li>
						))}
					</ol>
					<div className="flex justify-start mt-4">
						<Link
							href="https://www.givelify.com/donate/shalom-mennonite-church-indianapolis-in-2j7wy5NTc3NDQ=/donation/amount"
							target="_blank"
							rel="noopener noreferrer"
							className='bg-yellow text-black font-semibold px-4 py-2 rounded hover:bg-yellow-dark transition w-full text-center text-xl'>
							{donateOnlineCard.value_json.button}
						</Link>
					</div>
					<div className="mt-4">
						<Image
							src="/donationFundList.png"
							alt="Fund Selection"
							className="rounded-md"
							width={500}
							height={500}
						/>
					</div>
				</div>
				{/* Donate by check */}
				<div className="bg-blue text-white p-6 rounded shadow text-md">
					<h2 className="text-2xl font-bold text-yellow mb-2">
						{donateByCheckCard.value_json.header}
					</h2>
					<p>
						{donateByCheckCard.value_json.steps.map((step, index) => (
							<div key={index} className='mb-2'>
								<strong>{step.label}</strong> {step.value}
							</div>
						))}
					</p>
					<div className="mt-12">
						<Image
							src="/donate/Check.png"
							alt="Check Example"
							className="rounded-md"
							width={500}
							height={500}
						/>
					</div>
				</div>
			</div>

			{/* where the money goes */}
			<div className="text-center mb-4">
				<h2 className="text-3xl font-bold">{whereTheMoneyGoes.value_json.header}</h2>
			</div>

			<div className="bg-blue text-white p-6 rounded shadow grid  grid-cols-1 md:grid-cols-3  items-center justify-between gap-6 text-md text-center ">
				{whereTheMoneyGoes.value_json.cards.map((card, index) => (
					<div key={index} className="flex flex-col items-center col-span-1">
						<Image
							src={card.img.src}
							alt={card.img.alt}
							className="w-36 h-36 mb-3 rounded-full object-cover"
							width={96}
							height={96}
						/>
						<h3 className="font-semibold text-xl mb-1">{card.header}</h3>
						<p>{card.text}</p>
					</div>
				))}
			</div>

			<p className="text-center text-md text-gray-600 mt-6 max-w-2xl mx-auto">
				{donationTaxInfo.value}
			</p>
		</div>
	);
}
