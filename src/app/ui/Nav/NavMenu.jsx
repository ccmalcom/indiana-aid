'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function NavMenu({isMenuOpen, setIsMenuOpen}) {
	const currentRoute = usePathname();
	const [showDropdown, setShowDropdown] = useState(false);

	return (
    <div className={`pr-6 text-xl ${isMenuOpen ? 'flex flex-col bg-blue absolute top-20 right-0 w-full text-right' : 'hidden'} md:block`}>
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
				className="relative inline-block"
				onMouseEnter={() => setShowDropdown(true)}
				onMouseLeave={() => setShowDropdown(false)}>
				<Link
					onClick={() => setIsMenuOpen(false)}
					href="/resources"
					className={`p-4 ${currentRoute.startsWith('/resources') ? 'text-yellow' : 'hover:text-yellow'}`}>
					Resources
				</Link>

				{showDropdown && (
					<div className="">
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
			<select
				className="ml-4 bg-white text-blue px-2 py-1 rounded text-sm"
				defaultValue="en"
				onChange={(e) => {
					const selectedLang = e.target.value;
					// You can replace this with your language-switching logic
					alert(`Switching to: ${selectedLang}`);
				}}>
				<option value="en">English</option>
				<option value="es">Español</option>
				<option value="ar">العربية</option>
				<option value="fr">Français</option>
			</select>
		</div>
	);
}
