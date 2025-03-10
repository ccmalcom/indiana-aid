//graphic centered under nav bar for home screen
//contains text on left, links (buttons) to donate/volunteer on right

export default function Hero() {
    return (
        <div className="flex align-center justify-center w-[80vw] h-[20vh] border-2 border-blue mx-auto my-8">
            <div id='left-hero' className="flex flex-col items-center justify-center text-center w-[70%] h-[100%] border-2 border-white px-5">
                <p className="text-lg">Providing Advocacy, Resources, and Direct Aid to Immigrants and their families impacted by ICE detention in Indiana.</p>
            </div>
            <div id='right-hero' className="flex flex-col items-center justify-center w-[30%] h-[100%] border-2 border-white">
                <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Donate</button>
                <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Volunteer</button>
            </div>
        </div>
    );
}