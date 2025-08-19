'use server';
import { getVolunteers } from "./actions";
import VolunteerClient from "./VolunteerClient";
import Header from "../ui/Header";
import Link from "next/link";


export default async function VolunteersPage() {
    const volunteers = await getVolunteers();
    // console.log("Volunteers data:", JSON.stringify(volunteers, null, 2));
    return (
        <div className='viewport min-h-[66vh] p-6 text-center'>
            <Header heading="Volunteers" />
            <Link href="/admin/volunteers/applications" className="underline">
                (Manage Volunteer Applications)
            </Link>
            <VolunteerClient volunteers={volunteers} />
        </div>
    );
}