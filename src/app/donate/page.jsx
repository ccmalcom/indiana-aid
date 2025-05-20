export default function Volunteer() {
	return (
		<div className="px-4 py-12 max-w-6xl mx-auto">
			<div className="mb-8 text-center">
				<h1 className="text-4xl font-bold mb-4">Volunteer</h1>
				<p className="text-lg max-w-2xl mx-auto">
					Volunteers are the heart of Indiana AID. We support detained
					immigrants by offering friendship, advocacy, and resources. There are
					many ways to get involved—online and in person!
				</p>
			</div>

			<div className="bg-orange-100 border-l-4 border-orange-400 text-orange-800 p-4 mb-10 rounded">
				<p>
					Indiana AID is a volunteer-led initiative. All volunteer activity is
					coordinated independently, and we work alongside our fiscal sponsor
					Shalom Mennonite Church to ensure transparency and support.
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-6 mb-12">
				<div className="bg-blue-900 text-white p-6 rounded shadow">
					<h2 className="text-xl font-semibold mb-2 text-orange-300">
						Volunteer Online
					</h2>
					<ul className="list-decimal pl-5 space-y-1">
						<li>Click the “Volunteer” button above.</li>
						<li>Fill out the sign-up form.</li>
						<li>We’ll follow up with next steps and orientation.</li>
					</ul>
				</div>

				<div className="bg-blue-900 text-white p-6 rounded shadow">
					<h2 className="text-xl font-semibold mb-2 text-orange-300">
						Volunteer In Person
					</h2>
					<p>
						Volunteers who live near the Clay County Jail may be eligible to
						participate in in-person visitation. We’ll provide full guidance and
						support if this is a good fit.
					</p>
				</div>
			</div>

			<h2 className="text-2xl font-bold text-center mb-4">How You Can Help</h2>
			<div className="grid md:grid-cols-3 gap-6 text-center">
				<div className="bg-blue-900 text-white p-4 rounded shadow">
					<img
						src="/commissaryIcon.png"
						alt="Commissary Icon"
						className="w-16 h-16 mx-auto mb-2"
					/>
					<h3 className="font-semibold text-lg mb-1">Commissary Support</h3>
					<p className="text-sm">
						Help coordinate supplies and fundraising for food, hygiene, and
						medicine.
					</p>
				</div>

				<div className="bg-blue-900 text-white p-4 rounded shadow">
					<img
						src="/visitIcon.png"
						alt="Virtual Visit Icon"
						className="w-16 h-16 mx-auto mb-2"
					/>
					<h3 className="font-semibold text-lg mb-1">Virtual Visits</h3>
					<p className="text-sm">
						Join regularly scheduled video calls with detained immigrants to
						offer companionship.
					</p>
				</div>

				<div className="bg-blue-900 text-white p-4 rounded shadow">
					<img
						src="/booksIcon.png"
						alt="Books Icon"
						className="w-16 h-16 mx-auto mb-2"
					/>
					<h3 className="font-semibold text-lg mb-1">Books & Puzzles</h3>
					<p className="text-sm">
						Coordinate donations and mailing of books, puzzles, and materials to
						build community inside.
					</p>
				</div>
			</div>
		</div>
	);
}
