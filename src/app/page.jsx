'use server';

import Hero from './ui/Hero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Calendar from './ui/Calendar';

export default async function Home() {
	const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
	const CALENDAR_ID = process.env.CALENDAR_ID;
	return (
		<div id="fullView" className="min-h-screen w-[90vw] md:w-[80vw] m-auto">
			<Hero />

			<div className="flex align-center justify-center ">
				<div
					id="newsletter-card"
					className={`w-1/3 h-1/3 bg-blue m-4 p-4 text-white text-center`}>
					<div className="card-header">
						<h1 className="text-2xl ">Monthly Newsletter</h1>
					</div>
					<div className="card-buttons flex flex-col items-center justify-center mb-4">
						<Link href="/resources/newsletter">
						<button className="bg-yellow hover:bg-yellow-dark text-black text-xl  py-2 px-4 my-4  rounded ">
							Read Latest Release
						</button>
						</Link>
						<Link
							href="/resources/newsletter"
							className="hover:text-yellow text-xl ">
							Subscribe
						</Link>
					</div>
				</div>
				
				<div
					id="knowledge-card"
					className={`w-1/3 h-1/3 bg-blue m-4 p-4 text-white text-center`}>
					<h1 className="text-2xl ">Quick Links</h1>
					<div className="flex flex-col items-center justify-center">
						<a
							href="https://www.immigrationadvocates.org/legaldirectory/"
							target="_blank"
							rel="noopener noreferrer">
							<button className="bg-red hover:bg-red-dark text-white text-xl  py-2 px-4 mt-4 mx-2 rounded ">
								Find Help
							</button>
						</a>
						<button className="bg-yellow hover:bg-yellow-dark text-black text-xl  py-2 px-4 mt-4 mx-2  rounded ">
							Know Your Rights
						</button>
					</div>
				</div>
				<div
					id="connect-card"
					className={`w-1/3 h-1/3 bg-blue m-4 p-4 text-white text-center`}>
					<div className="card-header">
						<h1 className="text-2xl ">Connect with Us</h1>
					</div>
					<div className="card-buttons flex flex-col items-center justify-center">
						<button className="bg-yellow hover:bg-yellow-dark text-black text-xl  py-2 px-4 my-4 mx-2  rounded ">
							Join Mailing List
						</button>
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

			<div className="grid grid-cols-2 grid-rows-1 gap-4">
				<div className=" bg-blue m-4 p-12 text-white row-span-2">
					<h1 className="text-3xl pb-8  text-center">At A Glance...</h1>
					<p className="text-lg ">
						Indiana AID (Assistance to Immigrants in Detention) is a volunteer
						group that supports individuals detained by ICE in Indiana by
						bearing witness to their experiences through visits, offering
						information, and providing resources to them and their families.
					</p>
					<br />

					<p className="text-lg ">
						We also facilitate connections between immigrants and various
						service providers in our region, provide commissary support so that
						the people can buy food and medicine, and offer general updates to
						the public about developments in immigration detention in our state.{' '}
					</p>
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
