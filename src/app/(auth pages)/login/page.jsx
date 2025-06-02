'use client';

import { useEffect, useState } from 'react';
import { login, getUser } from './actions';

export default function LoginPage() {
	const [user, setUser] = useState(null);

	// useEffect(() => {
	// 	async function checkUser() {
	// 		const u = await getUser();
	// 		if (u) {
	// 			setUser(u);
	// 			setTimeout(() => {
	// 				window.location.href = '/admin';
	// 			}, 2000);
	// 		}
	// 	}
	// 	checkUser();
	// }, []);

	if (user) {
		return <p>You are already logged in as {user.email}. Redirecting...</p>;
	}

	return (
		<form>
			<label htmlFor="email">Email:</label>
			<input id="email" name="email" type="email" required />
			<label htmlFor="password">Password:</label>
			<input id="password" name="password" type="password" required />
			<button formAction={login}>Log in</button>
		</form>
	);
}