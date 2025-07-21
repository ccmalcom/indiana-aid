//show basic details for newsletters, link to newsletter management page
import Link from 'next/link';

// current_issue, total_issues, current_issue_date,  thumbnail
export default function NewsletterCard({ newsletters, subscriberCount }) {

    // console.log('NewsletterCard data:', JSON.stringify(newsletters, null, 2));
    
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Newsletters</h2>
            <p className="mb-4">
                Total Newsletters: <span className="font-bold">{newsletters.total_issues/2}</span>
            </p>
            <p className="mb-4">
                Current Issue: <span className="font-bold">{newsletters.current_issue}</span>
            </p>
            <p className="mb-4">
                Current Issue Date: <span className="font-bold">{new Date(newsletters.current_issue_date).toLocaleDateString()}</span>
            </p>
            <p className="mb-4">
                Subscribers: <span className="font-bold">{subscriberCount}</span>
            </p>
            <Link href='/admin/newsletters'>
                <button className='mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue-600'>Manage Newsletters</button>
            </Link>
        </div>
    );
}