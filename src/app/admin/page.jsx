'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex flex-col space-y-4">
        <Link
          href="/admin/profile"
          className="text-blue-600 hover:underline text-lg"
        >
          View Profile
        </Link>
        <Link
          href="/admin/volunteer-signups"
          className="text-blue-600 hover:underline text-lg"
        >
          Manage Volunteer Signups
        </Link>
      </div>
    </div>
  );
}
