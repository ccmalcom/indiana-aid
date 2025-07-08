// 'use server';

import Hero from './ui/Hero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Calendar from './ui/Calendar';
import { getNewsletterCardInfo, getQuickLinksCardInfo, getConnectWithUsCardInfo, getAtAGlanceInfo } from './actions';

export const dynamic = 'force-static';

export default async function Home() {
	const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
	const CALENDAR_ID = process.env.CALENDAR_ID;

	const newsletterCardInfo = await getNewsletterCardInfo();
	const quickLinksCardInfo = await getQuickLinksCardInfo();
	const connectWithUsCardInfo = await getConnectWithUsCardInfo();
	const atAGlanceInfo = await getAtAGlanceInfo();

	return (
		<div id="fullView" className="min-h-screen w-[90vw] md:w-[80vw] m-auto">
			<Hero />

			<div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-4 m-4">
				<div
					id="newsletter-card"
					className=' bg-blue m-4 p-4 text-white text-center'>
					<div className="card-header">
						<h1 className="text-2xl ">{newsletterCardInfo.headerText}</h1>
					</div>
					<div className="card-buttons flex flex-col items-center justify-center mb-4">
						{newsletterCardInfo.buttons.map((button, index) => (
							<Link
								key={index}
								href={button.href}
								className={button.style}>
								{button.text}
							</Link>
						))}
					</div>
				</div>
				
				<div
					id="knowledge-card"
					className=' bg-blue m-4 p-4 text-white text-center'>
					<h1 className="text-2xl ">{quickLinksCardInfo.headerText}</h1>
					<div className="flex flex-col items-center justify-center">
						{quickLinksCardInfo.buttons.map((button, index) => (
							<Link
								key={index}
								href={button.href}
								className={button.style}>
								{button.text}
							</Link>
						))}
					</div>
				</div>
				<div
					id="connect-card"
					className=' bg-blue m-4 p-4 text-white text-center'>
					<div className="card-header">
						<h1 className="text-2xl ">{connectWithUsCardInfo.headerText}</h1>
					</div>
					<div className="card-buttons flex flex-col items-center justify-center">
						{connectWithUsCardInfo.buttons.map((button, index) => (
							<Link
								key={index}
								href={button.href}
								className={button.style}>
								{button.text}
							</Link>
						))}
						<div className="social-links flex flex-row mb-4">
							<a
								href="https://www.instagram.com/indianaaid/"
								target="_blank"
								rel="noopener noreferrer"
								className="mx-2 hover:text-yellow">
								<FontAwesomeIcon icon={faInstagram} />
							</a>
							<a
								href="https://www.facebook.com/indianaAID1"
								target="_blank"
								rel="noopener noreferrer"
								className="mx-2 hover:text-yellow">
								<FontAwesomeIcon icon={faFacebook} />
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-4">
				<div className=" bg-blue m-4 p-12 text-white row-span-1">
					<h1 className="text-3xl pb-8  text-center">{atAGlanceInfo.headerText}</h1>
					{/* paragraphs */}
					{atAGlanceInfo.text.map((paragraph, index) => (
						<p key={index} className="text-lg mb-4">
							{paragraph}
						</p>
					))}
					<br />
					<p className="text-lg ">
						For more information, please click <Link className='underline decoration-yellow' href="/about">here</Link>
					</p>
				</div>

				<div className=" bg-blue m-4 p-8 text-white text-center flex flex-col items-center justify-center row-span-1">
					<h1 className="text-3xl mb-8 ">Calendar</h1>
					<Calendar apiKey={GOOGLE_API_KEY} calendarId={CALENDAR_ID}/>
				</div>
			</div>
		</div>
	);
}
