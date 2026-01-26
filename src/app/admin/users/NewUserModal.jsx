'use client';

import { useState } from "react";
import { inviteNewUser } from './actions';



export default function NewUserModal({ onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState([]);
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

    const handleNewUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name,
            email,
            roles,
        };
        try {
            const result = await inviteNewUser(data);

            if (result.error) {
                if (result.error.status === 429) {
                    setMessage('Email rate limit reached. Please wait a few minutes and try again.');
                    setMessageType('error');
                } else {
                    setMessage(`Error: ${result.error.message}`);
                    setMessageType('error');
                }
            } else {
                setMessage('User Invited Successfully! An invite link has been sent from "noreply@indianaaid.org".');
                setMessageType('success');
            }
        } catch (error) {
            setMessage('Error inviting user. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-center m-auto">Create New User</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-800"
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue"></div>
                    </div>
                ) : message ? (
                    <div className="text-center">
                        <p className={`text-lg mb-4 ${messageType === 'success' ? 'text-green' : 'text-red'}`}>{message}</p>
                        <button
                            className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                            onClick={handleClose}
                            type="button"
                        >
                            Close
                        </button>
                        <button
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                            onClick={resetForm}
                            type="button"
                        >
                            Create Another
                        </button>
                    </div>
                ) : (
                            <form onSubmit={handleNewUser}>
                                {/* Invite explanation */}
                                <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                                    <p>An invite link will be sent to the email address provided from "noreply@indianaaid.org". The user must click the link to set their password and activate their account.</p>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-2 border rounded"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Role(s)</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={roles}
                                        onChange={(e) => setRoles(Array.from(e.target.selectedOptions, option => option.value))}
                                        multiple
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="super-admin">Super Admin</option>
                                        <option value="volunteer-coordinator">Volunteer Coordinator</option>
                                        <option value="newsletter-admin">Newsletter Admin</option>
                                    </select>
                                    <div className="mt-2 text-xs text-gray-500 space-y-1">
                                        <p><span className="font-medium">Super Admin:</span> Full access, including user management</p>
                                        <p><span className="font-medium">Admin:</span> General access to most features</p>
                                        <p><span className="font-medium">Volunteer Coordinator:</span> Volunteer management only</p>
                                        <p><span className="font-medium">Newsletter Admin:</span> Newsletter management only</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 mr-4"
                                        onClick={onClose}
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Create User
                                    </button>
                                </div>
                            </form>
                )}
            </div>
        </div>
    );
}