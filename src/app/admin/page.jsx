// 'use client';

import Link from 'next/link';
import ProfileCard from './ui/Cards/ProfileCard';
import VolunteerCard from './ui/Cards/VolunteerCard';
import { getUserDetails, getPendingVolunteerApplications, getNewsletterInfo, getNewsletterSubscriberCount, getMailingListSubscribers } from './actions';
import NewsletterCard from './ui/Cards/NewsletterCard';
import EmailListCard from './ui/Cards/EmailListCard';

export default async function Admin() {

    const user = await getUserDetails();
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">You must be logged in to access the admin dashboard.</h1>
                <Link href="/auth/login" className="text-blue-500 hover:underline">
                    Log in
                </Link>
            </div>
        );
    }
    const applications = await getPendingVolunteerApplications();
    const newsletters = await getNewsletterInfo();
    const subscriberCount = await getNewsletterSubscriberCount();
    const subscribers = await getMailingListSubscribers();
   

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="flex flex-row align-items-center justify-evenly">
        <ProfileCard user={user} />
        <VolunteerCard applications={applications}/>
        <NewsletterCard newsletters={newsletters} subscriberCount={subscriberCount} />
        <EmailListCard subscribers={subscribers} />
      </div>
    </div>
  );
}