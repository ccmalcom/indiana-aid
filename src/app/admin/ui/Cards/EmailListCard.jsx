import Link from "next/link";

export default function EmailListCard({ subscribers }) {
    const subscriberCount = subscribers ? subscribers.length : 0;

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Email List Subscribers</h2>
            <p className="mb-4">
                Total Subscribers: <span className="font-bold">{subscriberCount}</span>
            </p>
            <Link href="/admin/email-list">
                <button className="mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Subscribers
                </button>
            </Link>
        </div>
    );

}