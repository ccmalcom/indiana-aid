import { updateUserPassword } from "../../actions";

export default async function ResetPassword() {
    const handleSubmit = async (formData) => {
        "use server";
        const result = await updateUserPassword(formData);
        if (result.error) {
            console.error("Error updating password:", result.error);
            return;
        }
        // Handle success, e.g., show a success message or redirect
    };

    return (
        <div className="viewport min-h-[66vh] text-center">
            <h1 className="text-2xl font-semibold my-4">Reset Password</h1>
            <form action={handleSubmit} className="flex flex-col space-y-4">
                <input type="password" name="password" placeholder="New Password" required className="input" />
                <button type="submit" className="btn">Reset Password</button>
            </form>
        </div>
    );
}