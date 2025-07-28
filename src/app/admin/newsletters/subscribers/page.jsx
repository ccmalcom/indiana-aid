import Header from "../../ui/Header";
import SubscriberTable from "./SubscriberTable";
import { getSubscribersInfo } from "../../actions";

export default async function NewslettersPage() {



    const data = await getSubscribersInfo();
    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <Header heading="Subscribers" />
            <p className="mb-4 text-center">Manage all your newsletter subscribers here. You can view, edit, and delete existing subscribers, or create new ones.</p>
        <SubscriberTable subscribers={data} />
        </div>
    );
}