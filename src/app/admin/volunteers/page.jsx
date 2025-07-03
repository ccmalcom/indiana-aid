'use server';
import { getVolunteers } from "../actions";


export default async function VolunteersPage() {
    const volunteers = await getVolunteers();
    console.log("Volunteers data:", JSON.stringify(volunteers, null, 2));
    return (
        <div>
            <h1>Volunteers</h1>
            <ul>
                {volunteers.map(volunteer => (
                    <li key={volunteer.id}>{volunteer.name}</li>
                ))}
            </ul>
        </div>
    );
}