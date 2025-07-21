'use client';
import Link from 'next/link';
import NewIssueModal from './NewIssueModal';
import { useState } from 'react';

export default function NewsletterTable({ newsletters }) {
	const [selectedNewsletter, setSelectedNewsletter] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [statusFilter, setStatusFilter] = useState('All');
	const [languageFilter, setLanguageFilter] = useState('All');
	// const filteredNewsletters =
	// 	statusFilter === 'All'
	// 		? newsletters
	// 		: newsletters.filter((newsletter) => newsletter.published === statusFilter);

    const filterNewsletters = () =>{
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

	const openEditModal = (newsletter) => {
		return () => {
			setSelectedNewsletter(newsletter);
			setIsModalOpen(true);
			console.log('Opening modal for newsletter:', newsletter);
		};
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

	return (
		<div className="p-6 bg-white shadow rounded-lg">
			{/* modify below (taken from application table) 
                will need to have language filter(selector en or es), published filter (yes or no)
                */}
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
							className={`px-4 py-2 rounded ${
								statusFilter === status
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
			{filteredNewsletters.length === 0 ? (
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
					{filteredNewsletters.map((newsletter) => (
						<tbody key={newsletter.id} className="text-center">
							<tr>
								<td className="py-2 px-4 border-b">{newsletter.volume}</td>
								<td className="py-2 px-4 border-b">{newsletter.language}</td>
								<td className="py-2 px-4 border-b">
									{new Date(newsletter.date).toLocaleDateString()}
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
									{newsletter.published ? 'Yes' : 'No'}
								</td>
								<td className="py-2 px-4 border-b">
									<button
										className="text-blue hover:underline"
										onClick={openEditModal(newsletter)}>
										Edit
									</button>
									{' | '}
									<button className="text-red hover:underline">Delete</button>
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
