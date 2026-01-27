'use client';

import { useState } from "react";
import { updateUser } from './actions';
// modal to mimick NewUserModal.jsx but for editing existing user

export default function EditUserModal({ user, onClose }) {
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.user_email || '');
    const [roles, setRoles] = useState(user.roles || []);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const resetForm = () => {
        setName('');
        setEmail('');
        setRoles([]);
        setMessage('');
        setMessageType('');
    };

    const handleClose = () => {
        resetForm();
        onClose();
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            id: user.id,
            name,
            email,
            roles,
        };
        try {
            const result = await updateUser(data);
            if (result.error) {
                setMessage(`Error: ${result.error.message}`);
                setMessageType('error');
            } else {
                setMessage('User Updated Successfully!');
                setMessageType('success');
            }
        } catch (error) {
            setMessage('Error updating user. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl mb-4">Edit User</h2>
                <form onSubmit={handleUpdateUser}>
                    <div className="mb-4">
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Roles</label>
                        <select
                            className="w-full border border-gray-300 p-2 rounded"
                            value={roles}
                            onChange={(e) => setRoles(Array.from(e.target.selectedOptions, option => option.value))}
                            multiple
                            required
                        >
                            <option value="admin">Admin</option>
                            <option value="super-admin">Super Admin</option>
                        </select>
                    </div>
                    {message && (


