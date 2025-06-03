//logo on top left
//links + translate button on top right
// Links:
//   -Home
//   -About
//   -Volunteer
//   -Donate
//   -Resources (will have sublinks)
//   -Contact
'use server';
import Image from 'next/image';
import NavMenu from './NavMenu';

export default async function Nav() {


	return (
		<nav
			className={`sticky top-0 z-50 bg-blue text-white text-xl flex justify-between items-center h-20 transition-shadow shadow-lg`}
			role="navigation"
		>
			<Image
				src="/logos/horizontal/Logo_white.png"
				alt="logo"
				width={200}
				height={200}
				className="ml-12"
			/>
			<div className="px-4 cursor-pointer md:hidden">Menu</div>
			<NavMenu />
			
		</nav>
	);
}
