import Header from "../ui/Header";

export default async function Users() {
    return (
        <div className="viewport min-h-[66vh] text-center">
            <Header heading="Admin Users" />
            <p className="mb-6">Manage your admin users here.</p>
            <div className="bg-white shadow rounded-lg p-6">
                <p className="text-gray-600">This feature is under development.</p>
            </div>
        </div>
    );
}