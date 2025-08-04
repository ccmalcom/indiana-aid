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
import { useState, useEffect, useRef } from 'react';

export default function Nav({ navLabels }) {
	const [isOpen, setIsOpen] = useState(false);
	const navRef = useRef(null);

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

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (navRef.current && !navRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const labels = navLabels.navLabels.value_json;

	return (
		<nav
			ref={navRef}
			className='sticky top-0 z-50 bg-blue text-white text-xl flex justify-between items-center h-22 transition-shadow shadow-lg '
			role="navigation">
			<Link href="/" className="ml-4">
				<Image
					src="/logos/horizontal/tagline.png"
					alt="logo"
					width={200}
					height={200}
					className="mb-2 ml-12"
				/>
			</Link>
			<div className="flex items-center">
				{!isOpen && (
					<div
						className="px-4 cursor-pointer pr-8 xx:hidden"
						onClick={() => setIsOpen(!isOpen)}>
						<div className="space-y-1">
							<span className="block w-6 h-0.5 bg-white"></span>
							<span className="block w-6 h-0.5 bg-white"></span>
							<span className="block w-6 h-0.5 bg-white"></span>
						</div>
					</div>
				)}
			</div>
			<NavMenu isMenuOpen={isOpen} setIsMenuOpen={setIsOpen} labels={labels} />
		</nav>
	);
}
