import Header from "../ui/Header";
import { getAllAdminUsers } from "../actions";

// will use to create new users (send invite email from supabase)
// will use to list all users (name, last login, roles, etc.)
// will use to edit user roles and permissions
// will use to delete users

export default async function Users() {

    const users = await getAllAdminUsers();


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