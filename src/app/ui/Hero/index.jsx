const sampleBg = 'sampleBg.jpg'; // Placeholder for the background image

export default function Hero() {
    return (
        <div className="hero relative grid grid-cols-3 w-[80vw] h-[40vh] md:h-[400] mx-auto my-8 bg-cover bg-center">
            <div className="absolute bottom-0 right-0 w-[33%] h-full bg-yellow "></div>
            <div id='left-hero' className="relative z-10 col-span-2 flex flex-col items-center justify-center text-center md:mx-20">
                <p className="text-3xl text-white ">Providing Advocacy, Resources, and Direct Aid to Immigrants and their families impacted by ICE detention in Indiana.</p>
            </div>
            <div id='right-hero' className="relative z-10 col-span-1 flex flex-col items-center justify-center">
                <a href="/donate">
                <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded">Donate</button>
                </a>
                <a href="/volunteer">
                <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 my-4  rounded">Volunteer</button>
                </a>
            </div>
        </div>
    );
}