// Client component: handles interactivity and state management
// Child component: VolunteerTable.jsx
'use client';
import { useState } from 'react';
import VolunteerApplicationsTable from './VolunteerApplicationsTable';
import VolunteerApplicationModal from './VolunteerApplicationModal';

export default function VolunteerApplicationsClient({ applications }) {
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = (app) => {
        console.log("Viewing application:", app);
        setSelectedApplication(app);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedApplication(null);
    };

    return (
        <div className="p-6">
            <VolunteerApplicationsTable
                applications={applications}
                onView={handleView}
            />
            {isModalOpen && (
                <VolunteerApplicationModal
                    application={selectedApplication}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}