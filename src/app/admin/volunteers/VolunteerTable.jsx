'use client';
// import { useState } from "react";

export default function VolunteerTable({ volunteers, onView }) {
    return (
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Pronouns</th>
                    <th className="py-2 px-4 border-b">Language(s)</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Phone</th>
                    <th className="py-2 px-4 border-b bg-gray-100">Actions</th>
                </tr>
            </thead>
            <tbody>
                {volunteers.map(volunteer => (
                    <tr key={volunteer.id}>
                        <td className="py-2 px-4 border-b">{volunteer.name}</td>
                        <td className="py-2 px-4 border-b">{volunteer.pronouns}</td>
                        <td className="py-2 px-4 border-b">{volunteer.languages.join(", ")}</td>
                        <td className="py-2 px-4 border-b">{volunteer.email}</td>
                        <td className="py-2 px-4 border-b">{volunteer.phone}</td>
                        <td className="py-2 px-4 border-b bg-gray-100">
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={() => onView(volunteer)}
                            >
                                View
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}