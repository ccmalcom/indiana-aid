//logo on top left
//links + translate button on top right
// Links:
//   -Home
//   -About
//   -Volunteer
//   -Donate
//   -Resources (will have sublinks)
//   -Contact

export default function Nav() {
    return (
        <div>
            <nav className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono" role="navigation">
                <a href="/" className="pl-8">Logo</a>
                <div className="px-4 cursor-pointer md:hidden">Menu</div>
                <div className="pr-8 md:block hidden">
                    <a href="/" className="p-4">Home</a>
                    <a href="/about" className="p-4">About</a>
                    <a href="/volunteer" className="p-4">Volunteer</a>
                    <a href="/donate" className="p-4">Donate</a>
                    <a href="/resources" className="p-4">Resources</a>
                    <a href="/contact" className="p-4">Contact</a>
                    {/* translate button */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Translate</button>
                </div>
            </nav>

        </div>
    );
}