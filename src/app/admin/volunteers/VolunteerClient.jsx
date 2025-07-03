'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function VolunteerClient({ applications, onView }) {

    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = (vol) => {
        console.log("Viewing volunteer:", vol);
        setSelectedVolunteer(vol);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVolunteer(null);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Volunteers</h2>
            <p className="mb-4">
                Total Pending Applications: <span className="font-bold">{pendingApplications.length}</span>
            </p>
            <Link href='/admin/volunteers/applications'>
                <button className='mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue-600'>Manage Applications</button>
            </Link>
        </div>
    );
}