

export default function Newsletter() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">Newsletter</h1>
            <p className="text-lg mb-8">Sign up for our newsletter to stay updated!</p>
            <form className="flex flex-col items-center">
                <input type="email" placeholder="Enter your email" className="mb-4 p-2 border rounded" required />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Subscribe</button>
            </form>
        </div>
    );
}