// Presentational: renders list view, gets props
// input: applications, onView 
// applications: array of volunteer applications (supabase table)
// onView: pass selected application to parent component for viewing details
'use client';
import { useState } from 'react';

export default function VolunteerApplicationsClient({
	applications,
	onView,
}) {
	// const [applications, setApplications] = useState(initialData);
	const [statusFilter, setStatusFilter] = useState('Pending');

	const filteredApps = statusFilter === 'All'
  ? applications
  : applications.filter((app) => app.status === statusFilter);

	return (
		<div className="p-6">
			<div className="mb-4 flex space-x-4">
				{[ 'Pending', 'Approved', 'Rejected', 'All'].map((status) => (
					<button
						key={status}
						onClick={() => setStatusFilter(status)}
						className={`px-4 py-2 rounded ${
							statusFilter === status
								? 'bg-blue text-white'
								: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
						}`}>
						{status}
					</button>
				))}
			</div>

			{filteredApps.length === 0 ? (
				<p>No volunteer applications found with status: {statusFilter}.</p>
			) : (
        <div className="overflow-x-auto overflow-y-auto h-[60vh]">
				<table className="table-fixed w-full bg-white border border-gray-200">
					<thead>
						<tr>
							<th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 bg-gray-100 sticky top-0">
								Name
							</th>
							<th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 bg-gray-100 sticky top-0">
								Email
							</th>
							<th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 sticky top-0 bg-gray-100">
								Phone
							</th>
							<th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 sticky top-0 bg-gray-100">
								Languages
							</th>
							{/* interest areas */}
							<th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 sticky top-0 bg-gray-100 ">
								Interest Areas
							</th>
							{/* additional info */}
							{/* <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 sticky top-0 bg-gray-100">
								Additional Info
							</th> */}
							<th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 sticky top-0 bg-gray-100">
								Status
							</th>
							<th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 sticky top-0 bg-gray-100">
								Created At
							</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 sticky top-0 bg-gray-100">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredApps.map((app) => (
							<tr key={app.id}>
								<td className="px-6 py-4 border-b border-gray-200">
									{app.name}
								</td>
								<td className="px-6 py-4 border-b border-gray-200">
									{app.email}
								</td>
								<td className="px-6 py-4 border-b border-gray-200">
									{app.phone}
								</td>
								<td className="px-6 py-4 border-b border-gray-200">
									{app.languages ? app.languages.join(', ') : 'N/A'}
								</td>
								<td className="px-6 py-4 border-b border-gray-200">
									{app.interest_areas ? app.interest_areas.join(', ') : 'N/A'}
								</td>
								{/* <td className="px-6 py-4 border-b border-gray-200">
									{app.additional_info ? app.additional_info : 'N/A'}
								</td> */}
								<td className="px-6 py-4 border-b border-gray-200">
									{app.status}
								</td>
								<td className="px-6 py-4 border-b border-gray-200">
									{new Date(app.created_at).toLocaleDateString()}
								</td>
                <td className="px-6 py-4 border-b border-gray-200 text-blue-600 hover:underline cursor-pointer" onClick={() => onView(app)}>View</td>
							</tr>
						))}
					</tbody>
				</table>
        </div>
			)}
		</div>
	);
}
