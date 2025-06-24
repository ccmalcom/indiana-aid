// work in progress page
'use client';

import { useEffect } from "react";

export default function VolunteerResources() {


    // Update the countdown timer every second

    // !todo: remove redirect timeout
    useEffect(() => {
 
        const timer = setTimeout(() => {
            window.location.href = '/resources';
        }, 5000); // Redirect after 5 seconds

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    return (
        // display 'work in progress' message
        <div className="px-4 py-12 max-w-6xl mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-4xl text-blue font-bold mb-2">
                    Volunteer Resources
                </h1>
                <p className="text-lg font-semibold mt-8">
                    This page is a work in progress. Please check back later for our new volunteer specific resources.
                </p>
                {/* redirecting countdown */}
                <p className="text-sm italic mt-2 max-w-2xl mx-auto text-gray-600">
                    You will be redirected to the main resources page in 5 seconds...
                </p>
                
            </div>
            </div>

    )
}