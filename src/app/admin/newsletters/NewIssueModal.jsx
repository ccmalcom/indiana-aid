'use client';
import { useState } from 'react';
import { createNewsletterIssue } from './actions';

export default function NewIssueModal({ onClose }) {
	const [volume, setVolume] = useState('');
	const [language, setLanguage] = useState('en');
	const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
	const [thumbnail, setThumbnail] = useState(null);
	const [pdf, setPdf] = useState(null);
	const [published, setPublished] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

    const resetForm = () => {
        setVolume('');
        setLanguage('en');
        setDate(new Date().toISOString().split('T')[0]);
        setThumbnail(null);
        setPdf(null);
        setPublished(false);
        setMessage('');
    };

const handleSetPdf = (file) => {
	if (file && file.type !== 'application/pdf') {
		alert('Please upload a valid PDF file.');
		return;
	}

	if (file.name.includes(' ')) {
		const renamedFile = new File([file], file.name.replace(/ /g, '_'), {
			type: file.type,
			lastModified: file.lastModified,
		});
		setPdf(renamedFile);
	} else {
		setPdf(file);
	}
};


	const handleNewIssue = async (e) => {
		e.preventDefault();
		setLoading(true);
		// handle the new issue creation logic here
		const data = {
			volume,
			language,
			date,
			thumbnail,
			pdf,
			published,
		};
		let newIssue;
		// validate inputs
		if (!volume || !language || !date || !thumbnail || !pdf) {
			alert('Please fill in all fields and upload both thumbnail and PDF.');
            setLoading(false);
			return;
		}

		createNewsletterIssue(data)
			.then((issue) => {
				newIssue = issue;
				// console.log('New issue created:', JSON.stringify(newIssue, null, 2));
				setMessage('New issue created successfully!');
			})
			.catch((error) => {
				console.error('Error creating new issue:', error);
				setMessage('Error creating new issue. Please try again or share this error with the admin: ' + error.message);
			})
			.finally(() => {
				setLoading(false);
			});

		// onClose();
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-2xl">
				<h2 className="text-2xl font-bold mb-4 text-center">
					New Newsletter Issue
				</h2>
				{/* on submit, show loading spinner, then message. Keep height/width same */}
				<div className="mb-4">
					{loading ? (
						<div className="flex justify-center items-center h-32">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue"></div>
						</div>
					) : message ? (
						<div>
							<p className="text-green text-lg text-center">{message}</p>
                            <button
                                className="mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={onClose}>
                                Close
                            </button>
                            <button
                                className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                                onClick={resetForm}>
                                Upload Another Issue
                            </button>
						</div>
					) : (
						<form onSubmit={handleNewIssue}>
							{/* todo: default value to 1 after current issue */}
							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">Volume</label>
								<input
									type="text"
									className="w-full p-2 border rounded"
									value={volume}
									onChange={(e) => setVolume(e.target.value)}
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">
									Language
								</label>
								<select
									className="w-full p-2 border rounded"
									value={language}
									onChange={(e) => setLanguage(e.target.value)}>
									<option value="en">English</option>
									<option value="es">Spanish</option>
								</select>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">Date</label>
								<input
									type="date"
									className="w-full p-2 border rounded"
									value={date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</div>
							{/* todo: thumbnail image upload */}
							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">
									Thumbnail Image
								</label>
								<input
									type="file"
									accept="image/*"
									className="w-full p-2 border rounded"
									onChange={(e) => setThumbnail(e.target.files[0])}
								/>
							</div>
							{/* todo: pdf upload */}
							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">
									PDF Upload
								</label>
								<input
									type="file"
									accept="application/pdf"
									className="w-full p-2 border rounded"
									onChange={(e) => handleSetPdf(e.target.files[0])}
								/>
							</div>
							{/* todo: publish checkbox */}
							<div className="mb-4">
								<label className="flex items-center">
									<input
										type="checkbox"
										className="mr-2"
										checked={published}
										onChange={(e) => setPublished(e.target.checked)}
									/>
									Publish this issue (if not checked, it will be saved as a
									draft)
								</label>
							</div>
							<div className="flex justify-end">
								<button
									className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 mx-4"
									onClick={onClose}
									type="button">
									Cancel
								</button>
								<button
									type="submit"
									className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600">
									Upload New Issue
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
	``;
}
