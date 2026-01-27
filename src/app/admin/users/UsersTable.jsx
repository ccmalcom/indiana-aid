'use client';

import { useState } from 'react';
import NewUserModal from './NewUserModal';

export default function UsersTable({ users }) {

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // refresh page
        window.location.reload();
    };


    return (
        <div>
            <span className="flex justify-center">
                <button
                    className="mb-2 bg-blue text-white rounded-xl p-4"
                    onClick={handleOpenModal}>
                   Create New User
                </button>
            </span>
            

            
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Created At</th>
                        <th className="py-2 px-4 border-b">Last Login</th>
                        <th className="py-2 px-4 border-b">Roles</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b">{user.name || ''}</td>
                            <td className="py-2 px-4 border-b">{user.user_email || ''}</td>
                            <td className="py-2 px-4 border-b">{new Date(user.created_at).toLocaleString() || ''}</td>
                            <td className="py-2 px-4 border-b">{user.last_login ? new Date(user.last_login).toLocaleString() : 'never'}</td>
                            <td className="py-2 px-4 border-b">{user.roles.join(', ') || ''}</td>
                            <td className="py-2 px-4 border-b">
                                {/* Add action buttons here */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && <NewUserModal onClose={handleCloseModal} />}
        </div>
    );
}   