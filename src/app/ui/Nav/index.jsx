//logo on top left
//links + translate button on top right
// Links:
//   -Home
//   -About
//   -Volunteer
//   -Donate
//   -Resources (will have sublinks)
//   -Contact

import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
	return (
		<div>
			<nav
				className="flex justify-between items-center h-20 bg-blue text-white text-xl relative shadow-sm font-mono"
				role="navigation">
				{/* logo png */}
				<Image
					src="/logo_white.png"
					alt="logo"
					width={150}
					height={150}
					className="ml-12"
				/>
				<div className="px-4 cursor-pointer md:hidden">Menu</div>
				<div className="pr-8 md:block hidden text-2xl font-body">
					<Link href="/" className="p-4">
						Home
					</Link>
					<Link href="/about" className="p-4">
						About
					</Link>
					<Link href="/volunteer" className="p-4">
						Volunteer
					</Link>
					<Link href="/donate" className="p-4">
						Donate
					</Link>
					<Link href="/resources" className="p-4">
						Resources
					</Link>
					<Link href="/contact" className="p-4">
						Contact
					</Link>

					<button className="bg-yellow hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Translate
					</button>
				</div>
			</nav>
		</div>
	);
}
