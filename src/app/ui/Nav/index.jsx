//logo on top left
//links + translate button on top right
// Links:
//   -Home
//   -About
//   -Volunteer
//   -Donate
//   -Resources (will have sublinks)
//   -Contact
'use client';
import Image from 'next/image';
import NavMenu from './NavMenu';
import Link from 'next/link';
import { useState } from 'react';

export default  function Nav() {

	const [isOpen, setIsOpen] = useState(false);


	return (
		<nav
			className={`sticky top-0 z-50 bg-blue text-white text-xl flex justify-between items-center h-20 transition-shadow shadow-lg`}
			role="navigation"
		>
			<Link href="/" className="ml-4">
			<Image
				src="/logos/horizontal/Logo_white.png"
				alt="logo"
				width={200}
				height={200}
				className="ml-12"
			/>
			</Link>
			<div className="px-4 cursor-pointer pr-8 md:hidden" onClick={()=>setIsOpen(!isOpen)}>Menu</div>
			<NavMenu isMenuOpen={isOpen}/>
			
		</nav>
	);
}
