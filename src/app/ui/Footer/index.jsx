import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-blue text-white py-4 mt-auto ">
            <div className="container mx-auto text-center">
                <p>&copy; 2025 Indiana AID. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <Link href="/privacy" className="text-white hover:text-yellow">Privacy Policy</Link>
                    <Link href="/terms" className="text-white hover:text-yellow">Terms of Service</Link>
                    <Link href="/admin" className="text-white hover:text-yellow">Admin</Link>
                    {/* <a href="https://www.flaticon.com/free-icons/" title="icon attribution">Icons created by Freepik - Flaticon</a> */}
                </div>
            </div>
        </footer>
    );
}