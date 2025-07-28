'use client';
import { editSubscriberEmail, deleteSubscriber } from '../../actions';

import Link from 'next/link';
import { useState } from 'react';

export default function SubscriberTable({ subscribers }) {
	const [editingSubscriber, setEditingSubscriber] = useState(null);
	const [newEmail, setNewEmail] = useState('');
    const [subscribersList, setSubscribersList] = useState(subscribers);
    const [searchQuery, setSearchQuery] = useState('');

	const handleEditClick = (subscriber) => {
		setEditingSubscriber(subscriber);
		setNewEmail(subscriber.email);
	};

	const handleSaveClick = async () => {
		console.log(
			`changing email from ${editingSubscriber.email} to ${newEmail}`
		);
        if(editingSubscriber.email === newEmail) {
            console.log('No change in email, not saving.');
            setEditingSubscriber(null);
            return;
        }
        const result = await editSubscriberEmail(editingSubscriber.id, newEmail);
        if (result.success) {
            console.log('Email updated successfully');
            //  update the local state to reflect the changes
            setSubscribersList((prev) =>
                prev.map((sub) =>
                    sub.id === editingSubscriber.id
                        ? { ...sub, email: newEmail }
                        : sub
                )
            );
            setEditingSubscriber(null);
            setNewEmail('');
        } else {
            alert(`Error updating email: ${result.error}`);
            console.error(`Error updating subscriber ${editingSubscriber.id}:`, result.error);
        }
	};

	const handleDeleteClick = async (subscriber) => {
        const subscriberId = subscriber.id;
		const confirmed = confirm(
			'Are you sure you want to delete this subscriber?' + subscriber.email
		);
		if (confirmed) {
			const result = await deleteSubscriber(subscriberId);
			if (result.success) {
				console.log('Subscriber deleted successfully');
				setSubscribersList((prev) =>
					prev.filter((sub) => sub.id !== subscriberId)
				);
			} else {
                alert(`Error deleting subscriber: ${result.error}`);
                console.error(`Error deleting subscriber ${subscriberId}:`, result.error);
            }
		}
	};

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setSubscribersList(subscribers);
        } else {
            const filteredSubscribers = subscribers.filter((subscriber) =>
                subscriber.email.toLowerCase().includes(query.toLowerCase())
            );
            setSubscribersList(filteredSubscribers);
        }
    }; 

	return (
        <div className="overflow-x-auto">
        {subscribersList.length === 0 ? (
            <p className="text-center text-gray-500">No subscribers found.</p>
        ) : 
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search subscribers..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                />
            </div>
			<table className="min-w-full divide-y divide-gray">
				<thead>
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
							Email
						</th>
						<th className="px-6 py-3 text-right text-xs font-medium text-gray uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray">
					{subscribersList.map((subscriber) => (
						<tr key={subscriber.id}>
							{editingSubscriber && editingSubscriber.id === subscriber.id ? (
								<td className="px-6 py-4 whitespace-nowrap">
									<input
										type="email"
										value={newEmail}
										onChange={(e) => setNewEmail(e.target.value)}
										placeholder="Enter new email"
										className="border border-gray-300 rounded-md p-2"
									/>
								</td>
							) : (
								<td className="px-6 py-4 whitespace-nowrap">
									{subscriber.email}
								</td>
							)}
							<td className="px-6 py-4 whitespace-nowrap text-right">
								{editingSubscriber && editingSubscriber.id === subscriber.id ? (
									<button
										onClick={() => handleSaveClick(subscriber.id)}
										className="text-blue hover:text-blue-dark">
										Save
									</button>
								) : (
									<button
										onClick={() => handleEditClick(subscriber)}
										className="text-blue hover:text-blue-dark">
										Edit
									</button>
								)}
								<button
									onClick={() => handleDeleteClick(subscriber)}
									className="ml-2 text-red hover:text-red">
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
        </div>
                }
                </div>
	);
}
