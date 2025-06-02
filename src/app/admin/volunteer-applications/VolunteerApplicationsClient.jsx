// src/app/admin/volunteer-applications/VolunteerApplicationsClient.jsx
'use client';
import { useState, useEffect } from 'react';

export default function VolunteerApplicationsClient({ applications: initialData }) {
  const [applications, setApplications] = useState(initialData);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Volunteer Applications</h1>
      {applications.length === 0 ? (
        <p>No volunteer applications found.</p>
      ) : (
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
      )}
    </div>
  );
}