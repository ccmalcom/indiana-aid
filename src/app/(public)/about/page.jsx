'use server';

import Image from 'next/image';
import Link from 'next/link';

export default async function About() {
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
					{/* Right text */}
					<div className="w-full pl-4">
						<h2 className="text-3xl font-bold mb-4 text-blue">Our Story</h2>
						<p>
							Indiana AID was formed in 2019 when three individuals - a lawyer,
							a grad student, and a pastor - came together out of our mutual
							concern over the fact that there was no program in Indiana to
							support the immigrants who were detained by Immigration and
							Customs Enforcement (ICE) in our state. Although several
							coalitions were forming around that time to support immigration
							reform, there were no groups in Indiana that were directly
							connecting with people who experienced immigration detention. We
							believed that it was essential to connect immigrants themselves
							with the larger Indiana community that wanted to support them.
						</p>
						<br />
						<p>
							Fortunately, we knew about organizations in other states who had
							formed visitation programs like ours, and they helped us get our
							program started. Shalom Mennonite Church in Indianapolis allowed
							us to launch our program under its supervision, and we submitted a
							formal request to ICE to visit the facility in early 2020.
							Unfortunately, our plans were thwarted when the COVID-19 pandemic
							arrived and all in-person visitation was shut down. For the next
							year and a half, we gathered as much information as we could about
							the jail but we struggled to make any connections with the people
							who were frequently moved in and out of there.
						</p>
						<br />
						<p>
							We experienced a major breakthrough in 2021 when we learned from
							our out-of-state partners that the Clay County jail made a
							contract with a private company called Securus Technologies, which
							allowed detained immigrants to video conference with friends and
							family at exorbitant rates. Although we had reservations about
							providing financial support to this exploitative company, we took
							advantage of the pathway it created for us to reach detained
							immigrants. We raised the funds to pay for video calls on our end
							and started reaching out to the immigrants in the jail and
							offering to listen to their stories and offer support where
							possible. This generated significant interest, and we began
							establishing relationships in both of the cell blocks at the jail
							that held immigrants.
						</p>
						<br />
						<p>
							In 2022, the jail finally acknowledged the end of the COVID-19
							emergency and allowed us to come in through the Community
							Stakeholder request. We met the local sheriff, jail commander, ICE
							representative, and a few other staff members, and they gave us
							permission to begin an in-person Bible study program, which we
							offer on the first Saturday of every month. As we got to know the
							community better, we expanded our programming and our resources,
							and we now offer books, commissary funds, and a few other
							resources to all of the immigrants whom we encounter.
						</p>
						<br />
						<p>
							Finally, it’s important to acknowledge the shifts that have
							occurred since 2024. In 2024, the Clay County Council signed an
							agreement with the US government to expand their ICE detention
							wing, which went from having two cells and a maximum of about 60
							people to having 10 cells and a maximum of about 300 people (which
							it periodically exceeds). This was partially a response to the
							decision made by the state of Illinois to end ICE detention and
							the government’s perceived need to create more detention locations
							in the midwest. We celebrate this decision by the state of
							Illinois, but one of the unfortunate effects was that it led to
							one of our largest and closest partner organizations - the
							Interfaith Coalition for Detained Immigrants, based in Chicago -
							to end its visitation program. This means that we are now the only
							active visitation group in the Chicago immigration “circuit” and
							we have a much bigger responsibility than we did even a few years
							ago. In other words, we need your help!
						</p>
					</div>
				</div>

				{/* Looking Ahead */}
				<div className="w-full">
					<h2 className="text-3xl font-bold mb-4 text-blue">Looking Ahead</h2>
					<p>
						While our focus is on the immediate needs of our immigrant partners
						and their families, we don’t want to lose sight of our long-term
						goals to expand our reach. Below are some of our future dreams.
					</p>
					<ul className="list-disc list-inside space-y-2 mt-4">
						<li>
							A hotline available to detained immigrants for one hour per week
							in which we can talk to anyone who needs guidance/assistance.
						</li>
						<li>
							A second Bible study group so that we are visiting the jail 2x per
							month.
						</li>
						<li>A team for the Marion County jail in Indianapolis.</li>
						<li>
							Indiana AID local coordinators for each major city and town in
							Indiana whom we can contact as needs arise.
						</li>
						<li>
							Seeing an end to punitive detention for immigration in the state
							of Indiana.
						</li>
					</ul>
				</div>

				{/* Affiliations Section */}
				<div className="w-full">
					<h2 className="text-3xl font-bold mb-4 text-blue">Affiliations</h2>
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

				{/* Get Involved! use yellow bg to pop*/}
				<div className="w-[70%] mx-auto bg-yellow border border-yellow rounded-xl p-10 flex flex-col items-center text-blue">
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
