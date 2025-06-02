// src/app/admin/volunteer-applications/page.jsx
import { getVolunteerApplications } from '@/app/admin/actions';
import VolunteerApplicationsClient from './VolunteerApplicationsClient';

export default async function VolunteerApplicationsPage() {
  const applications = await getVolunteerApplications();
  return <VolunteerApplicationsClient applications={applications} />;
}