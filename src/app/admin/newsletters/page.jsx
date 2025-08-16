// for admins to view, edit, delete, and upload newsletters
import { getNewsletterInfo } from './actions';
import NewsletterTable from './NewsletterTable';
import Header from '../ui/Header';

export default async function NewslettersPage() {

    const data = await getNewsletterInfo();
    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <Header heading="Newsletters" />
            <p className="mb-4 text-center">Manage all your newsletters here. You can view, edit, and delete existing issues, or create new ones.</p>
        <NewsletterTable newsletters={data} />
        </div>
    );
}
        