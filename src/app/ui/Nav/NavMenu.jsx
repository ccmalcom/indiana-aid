'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavMenu() {
    const currentRoute = usePathname();

    return (
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
    );
}