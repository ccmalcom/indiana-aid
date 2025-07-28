'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroSwitcher() {
	const [showEnglish, setShowEnglish] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setShowEnglish((prev) => !prev);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative w-full max-w-5xl mx-auto">
			{/* Grid container to stack images */}
			<div className="grid w-full items-center relative">
				{/* Main image */}
				<Image
					src="/switcher/Main_Element.png"
					alt="Indiana AID Main"
					width={1200}
					height={400}
					className="w-full h-auto col-start-1 row-start-1"
					priority
				/>

				{/* Flip card overlay */}
				<div className="absolute top-[38%] mb-6 left-[12%] transform w-1/4" style={{ perspective: '600px' }}>
					<div className={`relative w-full h-full [transform-style:preserve-3d] origin-center transition-transform duration-1000 ease-in-out ${showEnglish ? '' : '[transform:rotateY(180deg)]'}`}>
						<div className="absolute w-full h-full [backface-visibility:hidden]">
							<Image
								src="/switcher/WeAre.png"
								alt="We Are"
								width={280}
								height={100}
								className="w-full h-auto"
							/>
						</div>
						<div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
							<Image
								src="/switcher/Somos.png"
								alt="Somos"
								width={280}
								height={100}
								className="w-full h-auto"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}