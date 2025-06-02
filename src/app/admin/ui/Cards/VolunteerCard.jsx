import Link from 'next/link';
export default function VolunteerCard({ applications }) {

    const applicationCount = applications ? applications.length : 0;

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Volunteer Applications</h2>
            <p className="mb-4">
                Total Pending Applications: <span className="font-bold">{applicationCount}</span>
            </p>
            <Link href='/admin/volunteer-applications'><button className='mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue-600'>Manage Applications</button></Link>
        </div>
    );
}