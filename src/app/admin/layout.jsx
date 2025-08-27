import Nav from "./ui/Nav";
import { getUserDetails } from './actions';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
    const user = await getUserDetails();
    // console.log('AdminLayout user:', user);
    if (!user) return redirect('/login');

    return (
        <div className="antialiased  flex flex-col">
            <Nav />
            <main className="p-6">{children}</main>
        </div>
    );
}
