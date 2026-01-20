import Header from "../ui/Header";
import { getAllAdminUsers } from "./actions";
import UsersTable from "./UsersTable";
// will use to list all users (name, last login, roles, etc.)
// will use to create new users (send invite email from supabase)
// will use to edit user roles and permissions
// will use to delete users

export default async function Users() {

    const users = await getAllAdminUsers();


    return (
        <div className="viewport min-h-[66vh] text-center">
            <Header heading="Admin Users" />
            <p className="mb-6">Manage your admin users here.</p>
            <UsersTable users={users} />
        </div>
    );
}