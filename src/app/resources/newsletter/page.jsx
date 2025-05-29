'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { subscribe, getNewsletters } from './actions';

export default function Newsletter() {
	const bucketUrl = process.env.NEXT_PUBLIC_NEWSLETTER_BASE_URL;
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [newsletters, setNewsletters] = useState([]);
	const [language, setLanguage] = useState('en');
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const itemsPerPage = 6;

	const handleSubmit = async (e) => {
		e.preventDefault();
		// TODO: Send `email` to Supabase (via API or client SDK)
		try {
			const response = await subscribe(email);
			if (response.error) {
				console.error('Error subscribing:', response.error);
			} else {
				setSubmitted(true);
				setEmail('');
			}
		} catch (error) {
			console.error('Error subscribing:', error);
		}
		setSubmitted(true);
	};

	useEffect(() => {
		setCurrentPage(1);
		setLoading(true);
		const fetchNewsletters = async () => {
			try {
				const issues = await getNewsletters();
				if (issues) {
					const filtered = issues
						.filter((issue) => issue.language === language)
						.sort((a, b) => b.volume - a.volume);
					setNewsletters(filtered);
				}
			} catch (error) {
				console.error('Error fetching newsletters:', error);
			}
			setLoading(false);
		};
		fetchNewsletters();
	}, [language]);

	const indexOfLast = currentPage * itemsPerPage;
	const indexOfFirst = indexOfLast - itemsPerPage;
	const currentNewsletters = newsletters.slice(indexOfFirst, indexOfLast);
	const totalPages = Math.ceil(newsletters.length / itemsPerPage);

	return (
		<div className="w-[80vw] h-full flex flex-col justify-center items-center px-4 md:px-12 my-12 mx-auto">
			<div className="SubscribeForm w-full">
				<h1 className="text-4xl font-bold mb-4 text-blue ">Newsletter</h1>
				<h2 className="text-2xl mb-2">Get Updates to your Inbox</h2>
				<p className="text-lg mb-4 text- max-w-4xl">
					Subscribe to our newsletter to stay informed about changes in
					immigration policy and Indiana AID’s work, and to read stories
					submitted by the immigrants held in the Clay County jail.
				</p>
				<form
					onSubmit={handleSubmit}
					className="flex flex-row items-center mb-4">
					<label htmlFor="email">Enter your email:</label>
					<input
						type="email"
						placeholder="name@email.com"
						className="border rounded w-64 mx-2"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button type="submit" className="bg-blue text-white mx-4 p-1 rounded">
						Subscribe
					</button>
					{submitted && (
						<p className="text-green-600 mt-2">Thanks for subscribing!</p>
					)}
				</form>
				<p className="text-sm text-gray-600">
					We will never share your email with anyone else. Click{' '}
					<Link href="/resources/newsletter/unsubscribe" className="underline">
						here
					</Link>{' '}
					to unsubscribe at any time.
				</p>
			</div>

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
						onChange={(e) => setLanguage(e.target.value)}
						className="border px-2 py-1 rounded">
						<option value="en">English</option>
						<option value="es">Español</option>
					</select>
				</div>

				{loading ? (
					<div className="text-center text-gray-600 py-12">Loading newsletters...</div>
				) : (
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
				)}
				<div className="flex justify-center mt-6 space-x-2">
					<button
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
						onClick={() =>
							setCurrentPage((prev) => Math.min(prev + 1, totalPages))
						}
						disabled={currentPage === totalPages}
						className="px-3 py-1 border rounded disabled:opacity-50">
						&gt;
					</button>
				</div>
			</div>
		</div>
	);
}
