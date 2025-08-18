'use client';

import { useState } from 'react';
import { subscribe } from './actions';
import Link from 'next/link';

export default function NewsletterSubscription() {
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const subscriberData ={
			first_name: firstName,
			last_name: lastName,
			email: email
		}
		try {
			const response = await subscribe(subscriberData);
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

	return (
		<div className="SubscribeForm w-full">
			<h1 className="text-4xl font-bold mb-4 text-blue ">Newsletter</h1>
			<h2 className="text-2xl mb-2">Get Updates to your Inbox</h2>
			<p className="text-lg mb-4 text- max-w-4xl">
				Subscribe to our newsletter to stay informed about changes in
				immigration policy and Indiana AID’s work, and to read stories submitted
				by the immigrants held in the Clay County jail.
			</p>
			<form onSubmit={handleSubmit} className="flex flex-col items-start mb-4 gap-1">
				<div className='flex flex-row gap-2'>
					<div className='flex flex-col'>
						<label htmlFor="firstName">First Name:</label>
						<input
							type="text"
							placeholder="John"
							className="border rounded w-32"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div className='flex flex-col'>
						<label htmlFor="lastName">Last Name:</label>
						<input
							type="text"
							placeholder="Doe"
							className="border rounded w-32"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>

					</div>
				</div>
				<div className='flex flex-row'>
					<div className='flex flex-col'>

						<label htmlFor="email">Enter your email:</label>
						<input
							type="email"
							placeholder="name@email.com"
							className="border rounded w-64 "
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>
				<button type="submit" className="bg-blue text-white p-1 w-48 rounded">
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
	);
}
