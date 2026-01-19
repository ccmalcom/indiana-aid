// will use env variable to show a maintenance banner
// at the top of the site when enabled
// e.g., MAINTENANCE_MODE=true
// possible parameters: message, start time, end time

'use client';

import { useEffect, useState } from 'react';

export default function MaintenanceBanner({ startTime, endTime }) {
    const [message, setMessage] = useState('The site is currently under maintenance. Some features may be unavailable.');

    useEffect(() => {
        if (startTime && endTime) {
            let start = new Date(startTime);
            let end = new Date(endTime);
            setMessage(`The site is under maintenance from ${start.toLocaleString()} to ${end.toLocaleString()}. Some features may be unavailable.`);
        } else if (startTime) {
            let start = new Date(startTime);
            setMessage(`The site is under maintenance starting from ${start.toLocaleString()}. Some features may be unavailable.`);
        } else if (endTime) {
            let end = new Date(endTime);
            setMessage(`The site is under maintenance until ${end.toLocaleString()}. Some features may be unavailable.`);
        }
    }, [startTime, endTime]);

    return (
        <header className="bg-yellow text-black text-center py-2 border-b-2 border-black">
            <p className="font-bold">
                {message}
            </p>
        </header>
    );
}