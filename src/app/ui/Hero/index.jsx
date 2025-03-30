const sampleBg = 'sampleBg.jpg'; // Placeholder for the background image

export default function Hero() {
    return (
        <div className="hero relative flex align-center justify-center w-[80vw] h-[40vh] md:h-[400] mx-auto my-8 bg-cover bg-center">
            <div className="absolute bottom-0 right-0 w-[66%] h-full bg-yellow clip-path-triangle"></div>
            <div id='left-hero' className="relative z-10 flex flex-col items-center justify-center text-center w-[70%] h-[100%] px-5">
                <div className="w-[60%]">

                <p className="text-2xl text-white ">Providing Advocacy, Resources, and Direct Aid to Immigrants and their families impacted by ICE detention in Indiana.</p>
                </div>
            </div>
            <div id='right-hero' className="relative z-10 flex flex-col items-center justify-center w-[30%] h-[100%]">
                <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded">Donate</button>
                <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 my-4  rounded">Volunteer</button>
            </div>
        </div>
    );
}