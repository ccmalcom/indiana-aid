'use client';

import { useState } from 'react';

export default function NewsletterGrid({ initialNewsletters }) {

	const [language, setLanguage] = useState('en');
	const [currentPage, setCurrentPage] = useState(1);

	const newsletters = initialNewsletters
	  .filter(n => n.language === language)
	  .sort((a, b) => b.volume - a.volume);
	const itemsPerPage = 6;

    const indexOfLast = currentPage * itemsPerPage;
	const indexOfFirst = indexOfLast - itemsPerPage;
	const currentNewsletters = newsletters.slice(indexOfFirst, indexOfLast);
	const totalPages = Math.ceil(newsletters.length / itemsPerPage);

	return (
		<div className="NewsletterList mx-auto w-full">
			<h2 className="text-2xl text-center font-semibold mt-8 mb-4">
				Past Newsletters
			</h2>

			<div className="my-4 flex justify-end w-full">
				<label htmlFor="language" className="mr-2 font-medium">
					{language == 'en' ? 'Language:' : 'Lengua:'}
				</label>
				<select
					id="language"
					value={language}
					onChange={(e) => {
						setLanguage(e.target.value);
						setCurrentPage(1);
					}}
					className="border px-2 py-1 rounded">
					<option value="en">English</option>
					<option value="es">Español</option>
				</select>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{currentNewsletters.map((n) => (
					<a
						key={n.id}
						href={n.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-center">
						<img
							src={n.image}
							alt={`Volume ${n.volume}`}
							className="w-full h-auto rounded border"
						/>
						<p className="font-semibold mt-2">
							{language == 'en' ? 'Volume ' : 'Volumen'} {n.volume}
						</p>
						<p className="text-sm">{n.date}</p>
					</a>
				))}
			</div>

			<div className="flex justify-center mt-6 space-x-2">
				<button
					onClick={() => setCurrentPage(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-3 py-1 border rounded disabled:opacity-50">
					&lt;
				</button>
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						key={i}
						onClick={() => setCurrentPage(i + 1)}
						className={`px-3 py-1 border rounded ${
							currentPage === i + 1 ? 'bg-blue text-white' : 'bg-white'
						}`}>
						{i + 1}
					</button>
				))}
				<button
					onClick={() => setCurrentPage(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="px-3 py-1 border rounded disabled:opacity-50">
					&gt;
				</button>
			</div>
		</div>
	);
}
