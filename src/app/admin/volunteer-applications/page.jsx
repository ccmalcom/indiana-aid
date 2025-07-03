'use server';
import { getVolunteerApplications } from '@/app/admin/actions';
import VolunteerApplicationsClient from './VolunteerApplicationsClient';
import Header from '../ui/Header';

export default async function VolunteerApplicationsPage() {
  const applications = await getVolunteerApplications();
  return (
    <div className='viewport min-h-[66vh] p-6'>
      <Header heading="Volunteer Applications" />
      <VolunteerApplicationsClient applications={applications} />
    </div>
  );
}   
