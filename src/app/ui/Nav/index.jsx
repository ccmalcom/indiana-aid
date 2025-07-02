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
import { useState, useEffect } from 'react';

export default function Nav() {
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsOpen(false);
			}
		};
		window.addEventListener('resize', handleResize);
	}, [isOpen]);



	return (
		<nav
			className={`sticky top-0 z-50 bg-blue text-white text-xl flex justify-between items-center h-20 transition-shadow shadow-lg`}
			role="navigation">
			<Link href="/" className="ml-4">
				<Image
					src="/logos/horizontal/Logo_white.png"
					alt="logo"
					width={200}
					height={200}
					className="ml-12"
				/>
			</Link>
			<div
				className="px-4 cursor-pointer pr-8 md:hidden"
				onClick={() => setIsOpen(!isOpen)}>
				<div className="space-y-1">
					<span className="block w-6 h-0.5 bg-white"></span>
					<span className="block w-6 h-0.5 bg-white"></span>
					<span className="block w-6 h-0.5 bg-white"></span>
				</div>
			</div>
			<NavMenu isMenuOpen={isOpen} setIsMenuOpen={setIsOpen} />
		</nav>
	);
}
