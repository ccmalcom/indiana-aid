'use client';
import Link from 'next/link';
import { useState } from 'react';
import VolunteerModal from './VolunteerModal';
import VolunteerTable from './VolunteerTable';

export default function VolunteerClient({ volunteers, onView }) {

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
       <div className="p-6">
            <VolunteerTable
                volunteers={volunteers}
                onView={handleView}
            />
            {isModalOpen && (
                <VolunteerModal
                    volunteer={selectedVolunteer}
                    onClose={handleCloseModal}
                />
            )}
            </div>
    );
}