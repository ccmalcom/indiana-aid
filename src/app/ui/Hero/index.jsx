//graphic centered under nav bar for home screen
//contains text on left, links (buttons) to donate/volunteer on right

export default function Hero() {
    return (
        <div className="flex items-center justify-center w-[80vw] h-[20vh] border-2 border-white m-auto">
            <div id='left-hero' className="flex flex-col items-center justify-center w-[50%] h-[100%] border-2 border-white">
                <p className="text-lg">Providing Advocacy, Resources, and Direct Aid to Immigrants and their families impacted by ICE detention in Indiana.</p>
            </div>
            <div id='right-hero' className="flex flex-col items-center justify-center w-[50%] h-[100%] border-2 border-white">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Donate</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Volunteer</button>
            </div>
        </div>
    );
}