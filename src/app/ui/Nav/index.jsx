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
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Nav() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 0);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav
			className={`sticky top-0 z-50 bg-blue text-white text-xl flex justify-between items-center h-20 transition-shadow ${
				scrolled ? 'shadow-lg' : ''
			}`}
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
			<div className="pr-8 md:block hidden text-xl">
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
	);
}
