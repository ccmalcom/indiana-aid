import Header from "../../ui/Header";
import SubscriberTable from "./SubscriberTable";
import { getSubscribersInfo } from "../../actions";
import ExportButton from "./ExportButton";

export default async function NewslettersPage() {

    const data = await getSubscribersInfo();

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <Header heading="Subscribers" />
            <p className="mb-4 text-center">Manage all your newsletter subscribers here. You can view, edit, and delete existing subscribers, or create new ones.</p>
            {/* export data as spreadsheet */}
            <div className="flex justify-center mb-4">
                <ExportButton subscribers={data} />
            </div>
            
        <SubscriberTable subscribers={data} />
        </div>
    );
}