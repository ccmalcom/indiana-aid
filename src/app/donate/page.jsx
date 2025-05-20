import Link from "next/link";

export default function Donate() {
	return (
        // donation header
		<div className="px-4 py-12 max-w-6xl mx-auto">
			<div className="text-center mb-6">
				<h1 className="text-3xl font-bold mb-2">Donate</h1>
				<p className="text-lg font-semibold text-gray-800">
					Your donations go directly toward supporting the immigrants we serve
					in the Clay County Jail*
				</p>
				<p className="text-sm italic mt-2 max-w-2xl mx-auto text-gray-600">
					*Shalom Mennonite Church is our fiscal sponsor; none of the money
					donated to the <span className="italic">“Indiana AID”</span> fund goes
					into any other part of the church’s budget.
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Donate Online */}
				<div className="bg-blue text-white p-6 rounded shadow text-sm">
					<h2 className="text-lg font-bold text-orange-300 mb-2">
						Donate Online
					</h2>
					<ol className="list-decimal pl-5 space-y-1">
						<li>Click the “Donate” button below.</li>
						<li>Select your donation amount.</li>
						<li>
							Select the <strong>“Indiana AID”</strong> fund.
						</li>
					</ol>
					<div className="flex justify-start mt-4">
						<Link href="https://www.givelify.com/donate/shalom-mennonite-church-indianapolis-in-2j7wy5NTc3NDQ=/donation/amount" target="_blank" rel="noopener noreferrer">
                        <button className="bg-yellow text-white font-semibold px-4 py-2 rounded hover:bg-orange-500 transition">
							Donate
						</button>
                        </Link>
					</div>
					<div className="mt-4">
						<img
							src="/donationFundList.png"
							alt="Fund Selection"
							className="rounded-md"
						/>
					</div>
				</div>
        {/* Donate by check */}
				<div className="bg-blue text-white p-6 rounded shadow text-sm">
					<h2 className="text-lg font-bold text-orange-300 mb-2">
						Donate by Check
					</h2>
					<p>
						<strong>Pay to:</strong> Shalom Mennonite Church
						<br />
						<strong>Memo:</strong> Indiana AID
						<br />
						<strong>Mail to:</strong> 6100 E 32nd Street, Indianapolis, IN 46226
					</p>
					<div className="mt-4">
						<img
							src="/checkExample.png"
							alt="Check Example"
							className="rounded-md"
						/>
					</div>
				</div>
			</div>

            {/* where the money goes */}
			<div className="text-center mb-4">
				<h2 className="text-2xl font-bold">Where the Money Goes</h2>
			</div>

			<div className="grid md:grid-cols-3 gap-6 text-center text-white">
				<div className="bg-blue p-4 rounded shadow">
					<img
						src="/commissaryIcon.png"
						alt="Commissary"
						className="w-16 h-16 mx-auto mb-2"
					/>
					<h3 className="font-semibold text-lg mb-1">Commissary Support</h3>
					<p className="text-sm">
						Donations fund the purchase of food, medicine, & hygiene items
						through the jail’s commissary. These items are essential to our
						immigrant partners as these items are often lacking in the jail.
						View some commissary examples{' '}
						<a href="#" className="underline text-orange-200">
							here
						</a>
						.
					</p>
				</div>

				<div className="bg-blue p-4 rounded shadow">
					<img
						src="/visitIcon.png"
						alt="Virtual Visits"
						className="w-16 h-16 mx-auto mb-2"
					/>
					<h3 className="font-semibold text-lg mb-1">Virtual Visits</h3>
					<p className="text-sm">
						Donations support weekly virtual visits between our volunteers & our
						immigrant partners through the jail’s for-profit technology
						platform.
					</p>
				</div>

				<div className="bg-blue p-4 rounded shadow">
					<img
						src="/booksIcon.png"
						alt="Books & Puzzles"
						className="w-16 h-16 mx-auto mb-2"
					/>
					<h3 className="font-semibold text-lg mb-1">Books & Puzzles</h3>
					<p className="text-sm">
						Books & puzzles are purchased for our detained partners who have no
						access to programming or recreation. They provide a healthy source
						of escapism, personal development, & community building.
					</p>
				</div>
			</div>

			<p className="text-center text-sm text-gray-600 mt-6 max-w-2xl mx-auto">
				Your donations will be tax deductible and you will get a receipt of your
				donation from Shalom at the beginning of the next fiscal year.
			</p>
		</div>
	);
}
