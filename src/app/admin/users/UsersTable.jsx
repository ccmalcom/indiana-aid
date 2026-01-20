'use client';

import { useEffect, useState } from 'react';

export default function UsersTable({ users }) {
    

    return (
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Last Login</th>
                    <th className="py-2 px-4 border-b">Roles</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="py-2 px-4 border-b">{user.name}</td>
                        <td className="py-2 px-4 border-b">{user.user_email}</td>
                        <td className="py-2 px-4 border-b">{new Date(user.last_login).toLocaleString()}</td>
                        <td className="py-2 px-4 border-b">{user.roles.join(', ')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}   