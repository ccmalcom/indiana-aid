import Link from 'next/link';

export default function Hero() {
	return (
		<div className="hero relative grid grid-cols-3 w-[80vw] h-[40vh] md:h-[400] mx-auto my-8 bg-cover bg-center">
			{/* <div className="absolute bottom-0 right-0 w-[33%] h-full bg-yellow "></div> */}
			<div
				id="left-hero"
				className="relative col-span-2 flex flex-col items-center justify-center text-center md:mx-20 pl-10">
				<p className="text-3xl text-white font-heading">
					Providing resources, direct aid, and friendship to immigrants and their
					families impacted by ICE detention in Indiana.
				</p>
			</div>
			<div
				id="right-hero"
				className="relative col-span-1 flex flex-col items-center justify-center pr-10">
				<Link href="/donate">
					<button className="bg-blue hover:bg-blue-700 text-white font-heading py-2 px-4 my-4 rounded">
						Donate
					</button>
				</Link>
				<Link href="/volunteer">
					<button className="bg-blue hover:bg-blue-700 text-white font-heading py-2 px-4 my-4  rounded">
						Volunteer
					</button>
				</Link>
			</div>
		</div>
	);
}
