import Link from 'next/link';
import { getHeroText, getHeroButtons } from './actions';

export const dynamic = 'force-static';


export default async function Hero() {
	const { heroText } = await getHeroText();
	const { heroButtons } = await getHeroButtons();

	return (
		<div className="hero mx-auto grid grid-cols-1 lg:grid-cols-3 w-[80vw] h-[40vh] md:h-[400] py-8 sm:p-10 lg:p-0 my-8 bg-cover bg-center">
			<div
				id="left-hero"
				className=" col-span-1 lg:col-span-2 flex flex-col items-center justify-center text-center mx-10 lg:mx-20 ">
				<p className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white">
					{heroText}
				</p>
			</div>
			<div
				id="right-hero"
				className=" col-span-1 flex lg:flex-col items-center justify-evenly lg:justify-center lg:pr-10">
					{heroButtons.map((button, index) => (
						<Link
							key={index}
							href={button.url}
							className="bg-blue  hover:text-yellow text-white py-2 px-4 my-2 lg:my-4 text-2xl rounded">
							{button.text}
						</Link>
					))}	
			</div>
		</div>
	);
}
