import Link from 'next/link';


export default function Logout() {
    return (
        <div className="viewport min-h-[66vh] text-center">
            <h1 className="text-2xl font-semibold my-4">Logout</h1>
            <p className="text-lg mb-4">You have been logged out successfully.</p>
            <Link href="/admin" className="text-blue underline">
                Return to Admin Home
            </Link>
        </div>
    );
}