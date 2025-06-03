'use client';

import { unsubscribe } from '../actions';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Unsubscribe() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
            const { error } = await unsubscribe(email);
            if (error) {
                console.error('Error unsubscribing:', error);
            } else {
                setSubmitted(true);
                setEmail('');
                setTimeout(() => {
                    router.push('/resources/newsletter');
                }, 2000); // Redirect after 2 seconds
            }
        }
    catch (error) {
            console.error('Error unsubscribing:', error);
            return;
    }
    };

    return (
        <div className="w-[80vw] h-full flex flex-col justify-center items-center px-4 md:px-12 my-12 mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-blue">Unsubscribe</h1>
            <p className="text-lg mb-4 max-w-4xl">
                If you wish to unsubscribe from our newsletter, please enter your email
                address below.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="email"
                    placeholder="name@email.com"
                    className="border rounded w-64 mx-2 mb-4 p-2"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue text-white mx-4 p-2 rounded hover:bg-blue-700 transition">
                    Unsubscribe
                </button>
                {submitted && (
                    <p className="text-green-600 mt-2">
                        You have been unsubscribed successfully.
                    </p>
                )}
            </form>
            <p className="mt-4">
                If you change your mind, you can{' '}
                <Link href="/resources/newsletter" className="text-blue underline">
                    resubscribe here
                </Link>.
            </p>
        </div>
    );
}
         