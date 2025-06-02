import Nav from "./ui/Nav";

export const metadata = {
    title: 'Admin Dashboard – Indiana AID',
    description: 'Admin area for managing Indiana AID resources and applications',
};

export default function AdminLayout({ children }) {
    return (
        <div className="antialiased  flex flex-col">
            <Nav />
            <main className="p-6">{children}</main>
        </div>
    );
}
