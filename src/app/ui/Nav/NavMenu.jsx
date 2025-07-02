'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function NavMenu({ isMenuOpen, setIsMenuOpen }) {
	const currentRoute = usePathname();
	const [showDropdown, setShowDropdown] = useState(false);

	return (
						
		<div
			className={`${
				isMenuOpen
					? 'fixed top-0 right-0 w-32 h-full z-50 bg-blue text-white flex flex-col pt-24 space-y-6 transition-transform transform translate-x-0'
					: 'hidden'
			} text-xl lg:block lg:relative lg:top-0 lg:right-0 lg:flex lg:flex-row lg:items-center lg:space-x-6 lg:pt-0`}>
			<Link
				onClick={() => setIsMenuOpen(false)}
				href="/"
				className={`p-4 ${currentRoute === '/' ? 'text-yellow' : 'hover:text-yellow'}`}>
				Home
			</Link>
			<Link
				onClick={() => setIsMenuOpen(false)}
				href="/about"
				className={`p-4 ${currentRoute === '/about' ? 'text-yellow' : 'hover:text-yellow'}`}>
				About
			</Link>
			<Link
				onClick={() => setIsMenuOpen(false)}
				href="/volunteer"
				className={`p-4 ${currentRoute === '/volunteer' ? 'text-yellow' : 'hover:text-yellow'}`}>
				Volunteer
			</Link>
			<Link
				onClick={() => setIsMenuOpen(false)}
				href="/donate"
				className={`p-4 ${currentRoute === '/donate' ? 'text-yellow' : 'hover:text-yellow'}`}>
				Donate
			</Link>
			<div
				className="relative inline-block p-4"
				onMouseEnter={() => setShowDropdown(true)}
				onMouseLeave={() => setShowDropdown(false)}>
				<Link
					onClick={() => setIsMenuOpen(false)}
					href="/resources"
					className={` ${currentRoute.startsWith('/resources') ? 'text-yellow' : 'hover:text-yellow'}`}>
					Resources
				</Link>

				{showDropdown && (
					<div className="absolute bg-blue text-white mt-1 right-0 shadow-lg rounded z-50">
						<Link
							onClick={() => setIsMenuOpen(false)}
							href="/resources/newsletter"
							className="block px-4 py-2 hover:text-yellow">
							Newsletter
						</Link>
						<Link
							onClick={() => setIsMenuOpen(false)}
							href="/resources/volunteer"
							className="block px-4 py-2 hover:text-yellow">
							Volunteer Resources
						</Link>
					</div>
				)}
			</div>
			<Link
				onClick={() => setIsMenuOpen(false)}
				href="/contact"
				className={`p-4 ${currentRoute === '/contact' ? 'text-yellow' : 'hover:text-yellow'}`}>
				Contact
			</Link>
			{/* translate dropdown */}
			<div className="w-full flex p-4 md:p-0 md:pr-4 md:mt-0 md:justify-end">
				<select
					className="bg-white text-blue px-2 py-1 rounded text-sm"
					defaultValue="en"
					onChange={(e) => {
						const selectedLang = e.target.value;
						alert(`Switching to: ${selectedLang}`);
					}}>
					<option value="en">English</option>
					<option value="es">Español</option>
					<option value="ar">العربية</option>
					<option value="fr">Français</option>
				</select>
			</div>
		</div>
	);
}
