
export default function Admin() {
    return (
        <div className="viewport w-[80vw] mx-auto">
            <div className="mx-auto flex flex-col space-y-16 py-12">
                {/* Hero Image */}
                <div className="mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-blue">Admin Page</h1>
                    <p className="mb-8">This is the admin page for Indiana AID.</p>
                </div>

                {/* Admin Content */}
                <div className="text-center flex flex-col items-center">
                    <p>Admin functionalities will be implemented here.</p>
                </div>
            </div>
        </div>
    );
}