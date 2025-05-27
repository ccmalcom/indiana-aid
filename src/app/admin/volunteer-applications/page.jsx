'use client';
import { fetchVolunteerApplications } from "./actions";
import { useEffect, useState } from "react";

export default function VolunteerApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function loadApplications() {
            try {
                const data = await fetchVolunteerApplications();
                setApplications(data);
            } catch (err) {
                setError("Failed to load applications.");
            } finally {
                setLoading(false);
            }
        }
        loadApplications();
    }, []);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    if (applications.length === 0) {
        return <p>No volunteer applications found.</p>;
    }

    return (
        <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Volunteer Applications</h1>
        {/* datatable */}
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Created At</th>
                </tr>
            </thead>
            <tbody>
                {applications.map((app) => (
                    <tr key={app.id}>
                        <td className="px-6 py-4 border-b border-gray-200">{app.name}</td>
                        <td className="px-6 py-4 border-b border-gray-200">{app.email}</td>
                        <td className="px-6 py-4 border-b border-gray-200">{app.status}</td>
                        <td className="px-6 py-4 border-b border-gray-200">{new Date(app.created_at).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
       
        </div>
    );
    }