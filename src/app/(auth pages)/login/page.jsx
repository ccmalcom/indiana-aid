
import { login, getUser } from './actions';

export default async function LoginPage() {
	// const [user, setUser] = useState(null);

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
	const user = await getUser();

	if (!user) {
	return (
		<form className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
			<h2 className="text-2xl font-bold text-center">Admin Login</h2>

			<div className="flex flex-col">
				<label htmlFor="email" className="mb-1 font-medium">Email:</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue"
				/>
			</div>

			<div className="flex flex-col">
				<label htmlFor="password" className="mb-1 font-medium">Password:</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue"
				/>
			</div>

			<button
				formAction={login}
				className="w-full bg-blue text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
			>
				Log In
			</button>
		</form>
	);
		
	}
	else {
		// If user is already logged in, redirect to admin page
		return (
			<div>
				<p>Welcome back, {user.email}!</p>
				<p>You will be redirected to the admin page shortly.</p>
			</div>
		);
	}

}