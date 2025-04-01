//logo on top left
//links + translate button on top right
// Links:
//   -Home
//   -About
//   -Volunteer
//   -Donate
//   -Resources (will have sublinks)
//   -Contact

import Image from 'next/image'

export default function Nav() {
    return (
        <div>
            <nav className="flex justify-between items-center h-20 bg-blue text-white text-lg relative shadow-sm font-mono" role="navigation">
                {/* logo png */}
                <Image src="/logo_white.png" alt="logo" width={150} height={150} className='ml-12'/>
                <div className="px-4 cursor-pointer md:hidden">Menu</div>
                <div className="pr-8 md:block hidden">
                    <a href="/" className="p-4">Home</a>
                    <a href="/about" className="p-4">About</a>
                    <a href="/volunteer" className="p-4">Volunteer</a>
                    <a href="/donate" className="p-4">Donate</a>
                    <a href="/resources" className="p-4">Resources</a>
                    <a href="/contact" className="p-4">Contact</a>
                    {/* translate button */}
                    <button className="bg-yellow hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Translate</button>
                </div>
            </nav>

        </div>
    );
}