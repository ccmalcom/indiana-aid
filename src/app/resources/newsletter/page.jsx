'use client';

import Link from 'next/link';
import { useState } from 'react';
import { subscribe } from './actions';

export default function Newsletter() {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);

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
        }
        catch (error) {
            console.error('Error subscribing:', error);
        }
		setSubmitted(true);
	};

	const newsletters = [
		{
			volume: 12,
			date: 'Jan 2025',
			url: '/pdfs/newsletter-vol12.pdf',
			image: '/images/vol12-thumbnail.jpg',
		},
		{
			volume: 11,
			date: 'Oct 2024',
			url: '/pdfs/newsletter-vol11.pdf',
			image: '/images/vol11-thumbnail.jpg',
		},
		// more items...
	];

	return (
		<div className="w-[80vw] h-full flex flex-col justify-center items-center px-4 md:px-12 my-12 mx-auto">
			<div className='SubscribeForm w-full'>
				<h1 className="text-4xl font-bold mb-4 text-blue ">Newsletter</h1>
				<h2 className="text-2xl mb-2">Get Updates to your Inbox</h2>
				<p className="text-lg mb-4 text- max-w-4xl">
					Subscribe to our newsletter to stay informed about changes in
					immigration policy and Indiana AID’s work, and to read stories
					submitted by the immigrants held in the Clay County jail.
				</p>
			<form onSubmit={handleSubmit} className="flex flex-row items-center mb-4">
                <label htmlFor="email">Enter your email:</label>
				<input
					type="email"
					placeholder="name@email.com"
					className="border rounded w-64 mx-2"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					type="submit"
					className="bg-blue text-white mx-4 p-1 rounded">
					Subscribe
				</button>
				{submitted && (
					<p className="text-green-600 mt-2">Thanks for subscribing!</p>
				)}
			</form>
            <p className="text-sm text-gray-600">
                We will never share your email with anyone else. Click <Link href='/resources/newsletter/unsubscribe' className='underline'>here</Link> to unsubscribe at any time.
            </p>
			</div>
            
            <div className='NewsletterList mx-auto w-full'>
            <h2 className="text-2xl text-center font-semibold mb-4">Past Newsletters</h2>

            
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{newsletters.map((n) => (
					<a
						key={n.volume}
						href={n.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-center">
						<img
							src={n.image}
							alt={`Volume ${n.volume}`}
							className="w-full h-auto rounded border"
						/>
						<p className="font-semibold mt-2">Volume {n.volume}</p>
						<p className="text-sm">{n.date}</p>
					</a>
				))}
			</div>
            </div>

			{/* TODO: Pagination */}
		</div>
	);
}
