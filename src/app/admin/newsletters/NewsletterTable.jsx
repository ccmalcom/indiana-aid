'use client';
import Link from 'next/link';
import NewIssueModal from './NewIssueModal';
import { useState, useEffect } from 'react';
import { updateNewsletterIssue, deleteNewsletterIssue } from './actions';


export default function NewsletterTable({ newsletters }) {
	const [selectedNewsletter, setSelectedNewsletter] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [statusFilter, setStatusFilter] = useState('All');
	const [languageFilter, setLanguageFilter] = useState('All');
	const [isEditing, setIsEditing] = useState(false);
	const [editedNewsletters, setEditedNewsletters] = useState([]);
	const [baselineNewsletters, setBaselineNewsletters] = useState([]);

		async function sendEmail(){
		const emailData = {
			issue: 16,
			message: 'This is the main content of the newsletter.',
			mensaje: 'Este es el contenido principal del boletín informativo.'
		};

		// Send the email using api route
		const response = await fetch('/api/send-newsletter-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(emailData),
		});

		if (response.ok) {
			console.log('Newsletter email sent successfully');
			console.log(await response.json());
		} else {
			console.error('Error sending newsletter email');
		}
		
	}

	const filterNewsletters = () => {
		// first, filter by language
		let filtered = languageFilter === 'All'
			? newsletters
			: newsletters.filter((newsletter) => newsletter.language === languageFilter);

		// then, filter by status
		filtered = statusFilter === 'All'
			? filtered
			: filtered.filter((newsletter) => newsletter.published === statusFilter);

		return filtered;
	}

	const filteredNewsletters = filterNewsletters();

	useEffect(() => {
		const clone = filteredNewsletters.map(nl => ({ ...nl }));
		setEditedNewsletters(clone);
		setBaselineNewsletters(filteredNewsletters.map(nl => ({ ...nl })));
	}, [filteredNewsletters]);

	const handleEdit = async () => {
		// If we're currently in edit mode, this click is "Save"
		if (isEditing) {
			try {
				// Build a quick lookup for baseline rows by id
				const baselineById = baselineNewsletters.reduce((acc, nl) => {
					acc[nl.id] = nl;
					return acc;
				}, {});

				// Determine which rows changed (compare only editable fields)
				const changed = editedNewsletters.filter(nl => {
					const base = baselineById[nl.id];
					if (!base) return false;
					const changedDate = base.date !== nl.date;
					const changedPublished = !!base.published !== !!nl.published;
					// Add more comparisons if you later make more fields editable
					return changedDate || changedPublished;
				});

				if (changed.length > 0) {
					await Promise.all(
						changed
							.filter(nl => nl.id !== undefined)
							.map(nl => updateNewsletterIssue(nl))
					);
					// console.log('Updated newsletters:', changed);
				} else {
					console.log('No changes detected; skipping update.');
				}

				// After saving, refresh the baseline to the latest edited values
				setBaselineNewsletters(editedNewsletters.map(nl => ({ ...nl })));
			} catch (error) {
				console.error('Error updating newsletters:', error);
			}
		}

		// Toggle edit mode (enter or exit)
		setIsEditing(prev => !prev);
	};

	const openNewIssueModal = () => {
		setSelectedNewsletter(null);
		setIsModalOpen(true);
		console.log('Opening modal for new issue');
	};

	const onClose = () => {
		setIsModalOpen(false);
		setSelectedNewsletter(null);
	};

	const handleInputChange = (id, field, value) => {
		// normalize date to first of month
		if (field === 'date') {
			const dt = new Date(value);
			const y = dt.getFullYear();
			const m = String(dt.getMonth() + 1).padStart(2, '0');
			const normalized = `${y}-${m}-01`;
			value = normalized;

		}
		setEditedNewsletters(prev =>
			prev.map(nl => (nl.id === id ? { ...nl, [field]: value } : nl))
		);
	};

	const handleDelete = async (id) => {
		// confirm
		if (window.confirm("Are you sure you want to delete this newsletter?")) {
			try {
				await deleteNewsletterIssue(id);
			} catch (error) {
				console.error("Error deleting newsletter:", error);
			}
		}

	};

	return (
		<div className="p-6 bg-white shadow rounded-lg">
			{/* modify below (taken from application table) 
                will need to have language filter(selector en or es), published filter (yes or no)
                */}
				 {/* placeholder */}
				<button onClick={sendEmail} className="mt-4 bg-green text-white px-4 py-2 rounded hover:bg-green-600">
					Send Newsletter Email
				</button>
			<span className="flex justify-end">
				<button
					className="mb-2 px-4 pb-2 text-blue rounded"
					onClick={openNewIssueModal}>
					+ New Issue
				</button>
			</span>
			<div className="mb-4 flex justify-between items-center">
				<div>
					{['All', 'Published', 'Unpublished'].map((status) => (
						<button
							key={status}
							onClick={() => setStatusFilter(
								status === 'All' ? 'All' : status === 'Published' ? true : false
							)}
							className={`px-4 py-2 rounded ${statusFilter === status
								? 'bg-blue text-white'
								: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
								}`}>
							{status}
						</button>
					))}
				</div>
				<div>
					<select
						value={languageFilter}
						onChange={(e) => setLanguageFilter(e.target.value)}
						className="px-4 py-2 rounded bg-gray-200 text-gray-700">
						<option value="All" defaultValue={true}>All Languages</option>
						<option value="en">English</option>
						<option value="es">Spanish</option>
					</select>
				</div>
			</div>
			{editedNewsletters.length === 0 ? (
				<p>No newsletters found.</p>
			) : (
				<table className="min-w-full bg-white">
					<thead>
						<tr>
							<th className="py-2 px-4 border-b">Volume</th>
							<th className="py-2 px-4 border-b">Language</th>
							<th className="py-2 px-4 border-b">Date</th>
							<th className="py-2 px-4 border-b">Thumbnail</th>
							<th className="py-2 px-4 border-b">Published?</th>
							<th className="py-2 px-4 border-b">Actions</th>
						</tr>
					</thead>
					{editedNewsletters.map((newsletter) => (
						<tbody key={newsletter.id} className="text-center">
							<tr>
								<td className="py-2 px-4 border-b">
									{/* cannot edit volume */}
									{newsletter.volume}
								</td>
								<td className="py-2 px-4 border-b">
									{/* cannot edit language - must delete and reupload */}
									{newsletter.language === 'en' ? 'English' : 'Spanish'}
								</td>
								<td className="py-2 px-4 border-b">
									{isEditing ? (
										<input
											type="date"
											value={newsletter.date}
											onChange={(e) => {
												const val = e.target.value; // yyyy-mm-dd
												handleInputChange(newsletter.id, 'date', val);
											}}
										/>
									) : (
										<span>
											{newsletter.date}
										</span>
									)}
								</td>
								<td className="py-2 px-4 border-b flex justify-center items-center">
									{newsletter.thumbnail ? (
										<img
											src={newsletter.thumbnail}
											alt={`Newsletter Volume ${newsletter.volume}`}
											className="w-16 h-16 object-cover"
										/>
									) : (
										<span className="text-gray-500">No Thumbnail</span>
									)}
								</td>
								<td className="py-2 px-4 border-b">
									{isEditing ? (
										<select
											value={newsletter.published ? 'Yes' : 'No'}
											onChange={(e) =>
												handleInputChange(
													newsletter.id,
													'published',
													e.target.value === 'Yes'
												)
											}
										>
											<option value="Yes">Yes</option>
											<option value="No">No</option>
										</select>
									) : (
										newsletter.published ? 'Yes' : 'No'
									)}
								</td>
								<td className="py-2 px-4 border-b">
									<button
										className="text-blue hover:underline"
										onClick={handleEdit}>
										{isEditing ? 'Save' : 'Edit'}
									</button>
									{' | '}
									<button className="text-red hover:underline" onClick={() => handleDelete(newsletter.id)}>Delete</button>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			)}
			{isModalOpen && !selectedNewsletter && (
				<NewIssueModal onClose={onClose} />
			)}
		</div>
	);
}
