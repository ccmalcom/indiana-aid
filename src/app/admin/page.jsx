// 'use client';

import Link from 'next/link';
import ProfileCard from './ui/Cards/ProfileCard';
import VolunteerCard from './ui/Cards/VolunteerCard';
import { getUserDetails, getPendingVolunteerApplications, getNewsletterInfo, getNewsletterSubscriberCount, getMailingListSubscribers } from './actions';
import NewsletterCard from './ui/Cards/NewsletterCard';
import EmailListCard from './ui/Cards/EmailListCard';
//next/navigation is used for client-side navigation
import { redirect } from 'next/navigation';

export default async function Admin() {

    const user = await getUserDetails();
    if (!user) {
       //redirect to login page if user is not logged in
        redirect('/login');
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