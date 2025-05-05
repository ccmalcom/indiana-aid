import Image from 'next/image';
import Link from 'next/link';

export default function About() {
	return (
		<div className="viewport w-[80vw] mx-auto">
			<div className=" mx-auto flex flex-col space-y-16 py-12">
				{/* Hero Image */}
				<div className=" mx-auto">
					<Image
						src="/Dove_Chain_Image.jpg"
						alt="Indiana AID Dove Chain Logo"
						width={1200}
						height={200}
						className="mx-auto"
					/>
				</div>

				{/* We Are Indiana AID Section */}
				<div className="text-center flex flex-col items-center ">
					<h1 className="text-4xl font-bold mb-4">We Are Indiana Aid</h1>
					<p className="mb-8">
						Indiana AID (Assistance to Immigrants in Detention) is a volunteer
						group that supports individuals detained by ICE in Indiana by
						bearing witness to their experiences through visits, offering
						information, and providing resources to them and their families. We
						have a group that travels to the Clay County jail once per month for
						spiritual care, as well as a virtual visitation program through
						which we offer to pair every immigrant who arrives there with a
						visitation partner. We also facilitate connections between
						immigrants and various service providers in our region, provide
						commissary support so that the people can buy food and medicine, and
						offer general updates to the public about developments in
						immigration detention in our state.
					</p>
				</div>

				{/* Our Story Section */}
				<div className="flex flex-col md:flex-row items-start w-full gap-6">
					{/* Left image box */}
					<div className="w-full md:w-2/5 flex justify-center">
						<div className="w-[186px] h-[186px] bg-blue-900 flex items-center justify-center">
							<Image
								src="/globe.svg"
								height={100}
								width={100}
								alt="Globe Icon"
							/>
						</div>
					</div>

					{/* Right text */}
					<div className="w-full md:w-3/4 pl-4">
						<h2 className="text-3xl font-bold mb-4">Our Story</h2>
						<p>
							Indiana AID was formed in 2019 when three individuals - a lawyer,
							a pastor, and a grad student - came together out of their mutual
							concern over the fact that there was no program in Indiana to
							support the immigrants who were detained by Immigration and
							Customs Enforcement (ICE) in our state. We began communicating
							with ICE about our interest in visiting the facility in early
							2020, but our plans were canceled when the COVID-19 pandemic
							arrived and all in-person visitation was shut down. For the next
							two years, we slowed down our operations until a friend from the
							Interfaith Coalition of Detained Immigrants (ICDI) showed us how
							we could run a virtual visitation program at the jail, which did
							not require an in-person visit or even ICE permission. We set up
							such a virtual program at the end of 2021 and have been visiting
							with and assisting immigrants in the jail ever since. 
						</p>
					</div>
				</div>

				{/* Affiliations Section */}
				<div className="w-full">
					<h2 className="text-3xl font-bold mb-4">Affiliations</h2>
					<div className="bg-blue-100 border border-blue-300 rounded p-4 w-full max-w-[935px]">
						<ul className="list-disc list-inside space-y-2">
							<li>
								<Link
									href="https://mariposalegal.org/"
									target="_blank"
									className="text-blue-700 underline">
									Mariposa Legal
								</Link>
							</li>
							<li>
								<Link
									href="https://www.iuya.org/"
									target="_blank"
									className="text-blue-700 underline">
									Indiana Undocumented Youth Alliance (IUYA)
								</Link>
							</li>
							<li>
								<Link
									href="https://www.lahuelga.com/"
									target="_blank"
									className="text-blue-700 underline">
									Cosecha Indiana
								</Link>
							</li>
							<li>
								<Link
									href="https://immigrantjustice.org/"
									target="_blank"
									className="text-blue-700 underline">
									National Immigrant Justice Center
								</Link>
							</li>
							<li>
								<Link
									href="https://indyliberationcenter.org/"
									target="_blank"
									className="text-blue-700 underline">
									Indy Liberation Center
								</Link>
							</li>
							<li>
								<Link
									href="https://www.coalitionforourimmigrantneighbors.org/"
									target="_blank"
									className="text-blue-700 underline">
									Coalition for Our Immigrant Neighbors
								</Link>
							</li>
							<li>
								<Link
									href="https://www.freedomforimmigrants.org/"
									target="_blank"
									className="text-blue-700 underline">
									Freedom for Immigrants
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
