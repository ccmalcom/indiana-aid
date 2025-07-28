import Link from 'next/link';
export default function VolunteerCard({ applications }) {

    const pendingApplications = applications ? applications.filter(app => app.status.toLowerCase() === 'pending') : [];

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Volunteers</h2>
            <p className="mb-4">
                Total Pending Applications: <span className="font-bold">{pendingApplications.length}</span>
            </p>
            <p className="mb-4">
                Total Approved Volunteers: <span className="font-bold">{applications ? applications.filter(app => app.status.toLowerCase() === 'approved').length : 0}</span>
            </p>
            <div className='card-actions flex flex-col items-center'>

            <Link href='/admin/volunteers/applications'><button className='mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue-600'>Manage Applications</button></Link>
            <Link href='/admin/volunteers'><button className='mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue-600'>Manage Volunteers</button></Link>
            </div>
        </div>
    );
}