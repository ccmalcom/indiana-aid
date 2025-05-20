import Hero from './ui/Hero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Updates from './ui/Updates';
import Link from 'next/link';

export default function Home() {
	return (
		<div id="fullView" className="min-h-screen w-[90vw] md:w-[80vw] m-auto">
			<Hero />

			<div className="flex align-center justify-center ">
				<div
					id="newsletter-card"
					className={`w-1/3 h-1/3 bg-blue m-4 p-4 text-white text-center`}>
					<div className="card-header">
						<h1 className="text-2xl font-heading">Monthly Newsletter</h1>
					</div>
					<div className="card-buttons flex flex-col items-center justify-center mb-4">
						<button className="bg-yellow hover:bg-yellow-dark text-black text-xl font-body py-2 px-4 my-4  rounded ">
							Read Latest Release
						</button>
						<Link
							href="/resources/newsletter"
							className="hover:text-yellow text-xl font-body">
							Subscribe
						</Link>
					</div>
				</div>
				
				<div
					id="knowledge-card"
					className={`w-1/3 h-1/3 bg-blue m-4 p-4 text-white text-center`}>
					<h1 className="text-2xl font-heading">Quick Links</h1>
					<div className="flex flex-col items-center justify-center">
						<a
							href="https://www.immigrationadvocates.org/legaldirectory/"
							target="_blank"
							rel="noopener noreferrer">
							<button className="bg-red hover:bg-red-dark text-white text-xl font-body py-2 px-4 mt-4 mx-2 rounded ">
								Find Help
							</button>
						</a>
						<button className="bg-yellow hover:bg-yellow-dark text-black text-xl font-body py-2 px-4 mt-4 mx-2  rounded ">
							Know Your Rights
						</button>
					</div>
				</div>
				<div
					id="connect-card"
					className={`w-1/3 h-1/3 bg-blue m-4 p-4 text-white text-center`}>
					<div className="card-header">
						<h1 className="text-2xl font-heading">Connect with Us</h1>
					</div>
					<div className="card-buttons flex flex-col items-center justify-center">
						<button className="bg-yellow hover:bg-yellow-dark text-black text-xl font-body py-2 px-4 my-4 mx-2  rounded ">
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

			<div className="grid grid-cols-2 gap-4">
				<div className=" bg-blue m-4 p-4 text-white text-center">
					<h1 className="text-3xl pb-4 font-heading">At A Glance</h1>
					<p className="text-lg font-body">
						Indiana AID (Assistance to Immigrants in Detention) is a volunteer
						group that supports individuals detained by ICE in Indiana by
						bearing witness to their experiences through visits, offering
						information, and providing resources to them and their families.
					</p>
					<br />

					<p className="text-lg font-body">
						We also facilitate connections between immigrants and various
						service providers in our region, provide commissary support so that
						the people can buy food and medicine, and offer general updates to
						the public about developments in immigration detention in our state.{' '}
					</p>
					<br />
					<p className="text-lg font-body">
						For more information, please click <Link href="/about">here</Link>
					</p>
				</div>

				<div className=" bg-blue m-4 p-4 text-white text-center">
					<h1 className="text-3xl mb-4 font-heading">Recent Updates</h1>
					{/* eventually, this will integrate with scraper to pull posts from instagram & facebook as links: title | date */}
					<Updates />
				</div>
			</div>
		</div>
	);
}
