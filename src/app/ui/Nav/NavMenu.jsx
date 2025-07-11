'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function NavMenu({ isMenuOpen, setIsMenuOpen }) {
	const currentRoute = usePathname();
	const [showDropdown, setShowDropdown] = useState(false);
	const { language, changeLanguage, loaded } = useLanguage();

	const handleLanguageChange = (e) => {
		const selectedLang = e.target.value;
		console.log(`Switching to: ${selectedLang}`);
		changeLanguage(selectedLang);
		
	};

	return (
						
		<div
			className={`${
				isMenuOpen
					? 'fixed top-0 right-0 w-32 h-full z-50 bg-blue text-white flex flex-col pt-24 space-y-6 transition-transform transform translate-x-0'
					: 'hidden'
			} text-xl xx:block xx:relative xx:top-0 xx:right-0 xx:flex xx:flex-row xx:items-center xx:space-x-6 xx:pt-0`}>
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
				onMouseEnter={() => {
					// if mobile view, do not show dropdown
					if (window.innerWidth < 768) {
						return;
					}
					setShowDropdown(true);
				}}
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
			<div className="w-full min-w-32 flex p-4 xx:p-0 xx:pr-4 xx:mt-0 xx:justify-end">
				{loaded && (
				<select
					className="bg-white text-blue px-2 py-1 rounded text-sm"
					value={language}
					onChange={handleLanguageChange}>
					<option value="en">English</option>
					<option value="es">Español</option>
					<option value="ar">العربية</option>
					<option value="fr">Français</option>
				</select>)}
			</div>
		</div>
	);
}
