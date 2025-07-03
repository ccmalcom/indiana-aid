'use client';

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function DeleteAccount() {
    const handleDeleteAccount = async () => {
        // Logic to delete the account
        console.log('Account deletion logic goes here');
    };

    return (
        <div className="viewport min-h-[66vh] text-center">
            <div className="header grid grid-cols-4">
				<Link
					href="/admin/profile"
					className="text-blue hover:underline col-span-1 text-left p-4">
					<FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
				</Link>
				<h1 className="text-2xl font-semibold my-4 col-span-2">
					Delete Account
				</h1>
			</div>
            <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>

            {/* verify password */}
            <div className="mb-4">
                <label htmlFor="password" className="block mb-2">Confirm Password</label>
                <input
                    type="password"
                    id="password"
                    className="border rounded-lg p-2 "
                    placeholder="Enter your password"
                />
            </div>
            <button
                onClick={handleDeleteAccount}
                className="bg-red text-white rounded-lg p-2">
                Delete Account
            </button>
        </div>
    );
}