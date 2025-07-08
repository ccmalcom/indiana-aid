import Link from 'next/link';

export default function Hero() {
	return (
		<div className="hero mx-auto grid grid-cols-1 lg:grid-cols-3 w-[80vw] h-[40vh] md:h-[400] py-8 sm:p-10 lg:p-0 my-8 bg-cover bg-center">
			<div
				id="left-hero"
				className=" col-span-1 lg:col-span-2 flex flex-col items-center justify-center text-center mx-10 lg:mx-20 ">
				<p className="text-xl font-semibold  md:text-3xl lg:text-4xl text-white">
					Providing resources, direct aid, and support to immigrants and
					their families impacted by ICE detention in Indiana.
				</p>
			</div>
			<div
				id="right-hero"
				className=" col-span-1 flex lg:flex-col items-center justify-evenly lg:justify-center lg:pr-10">
				<Link href="/donate">
					<button className="bg-blue  hover:text-yellow text-white py-2 px-4 my-2 lg:my-4 text-2xl rounded">
						Donate
					</button>
				</Link>
				<Link href="/volunteer">
					<button className="bg-blue hover:text-yellow text-white py-2 px-4 my-2 lg:my-4 text-2xl  rounded">
						Volunteer
					</button>
				</Link>
			</div>
		</div>
	);
}
