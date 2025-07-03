'use server';
import { getVolunteers } from "../actions";
import VolunteerClient from "./VolunteerClient";
import Header from "../ui/Header";


export default async function VolunteersPage() {
    const volunteers = await getVolunteers();
    console.log("Volunteers data:", JSON.stringify(volunteers, null, 2));
    return (
        <div className='viewport min-h-[66vh] p-6'>
            <Header heading="Volunteers" />
            <VolunteerClient volunteers={volunteers} />
        </div>
    );
}