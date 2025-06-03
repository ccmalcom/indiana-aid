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
import { usePathname } from 'next/navigation';

export default function Nav() {
	// const [scrolled, setScrolled] = useState(false);
	const currentRoute = usePathname();
	// console.log('Current Route:', currentRoute);


	// useEffect(() => {

	// 	const handleScroll = () => {
	// 		setScrolled(window.scrollY > 0);
	// 	};
	// 	window.addEventListener('scroll', handleScroll);
	// 	return () => window.removeEventListener('scroll', handleScroll);
	// }, []);

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
			<div className="pr-8 md:block hidden text-xl">
				<Link href="/" className={`p-4 ${currentRoute === '/' ? 'text-yellow' : ''}`}>
					Home
				</Link>
				<Link href="/about" className={`p-4 ${currentRoute === '/about' ? 'text-yellow' : ''}`}>
					About
				</Link>
				<Link href="/volunteer" className={`p-4 ${currentRoute === '/volunteer' ? 'text-yellow' : ''}`}>
					Volunteer
				</Link>
				<Link href="/donate" className={`p-4 ${currentRoute === '/donate' ? 'text-yellow' : ''}`}>
					Donate
				</Link>
				<Link href="/resources" className={`p-4 ${currentRoute.startsWith('/resources') ? 'text-yellow' : ''}`}>
					Resources
				</Link>
				<Link href="/contact" className={`p-4 ${currentRoute === '/contact' ? 'text-yellow' : ''}`}>
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
					}}
				>
					<option value="en">English</option>
					<option value="es">Español</option>
					<option value="ar">العربية</option>
					<option value="fr">Français</option>
				</select>
			</div>
		</nav>
	);
}
