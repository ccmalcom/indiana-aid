export default function NewIssueModal({ onClose }) {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-2xl">
				<h2 className="text-2xl font-bold mb-4 text-center">New Newsletter Issue</h2>
				<form>
                    {/* todo: default value to 1 after current issue */}
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2">Volume</label>
						<input type="text" className="w-full p-2 border rounded" />
					</div>
                    {/* todo: selector, en or es */}
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2">Language</label>
						<select className="w-full p-2 border rounded">
							<option value="en">English</option>
							<option value="es">Spanish</option>
						</select>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2">Date</label>
						<input type="date" className="w-full p-2 border rounded" defaultValue={new Date().toISOString().split('T')[0]} />
					</div>
                    {/* todo: thumbnail image upload */}
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2">Thumbnail Image</label>
                        <input type="file" accept="image/*" className="w-full p-2 border rounded" />
					</div>
                    {/* todo: pdf upload */}
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2">
							PDF Upload
						</label>
						<input type="file" accept="application/pdf" className="w-full p-2 border rounded" />
					</div>
                    {/* todo: publish checkbox */}
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Publish this issue (if not checked, it will be saved as a draft)
                        </label>
                    </div>
					<div className="flex justify-end">
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 mx-4" onClick={onClose} type="button">
                            Cancel
                        </button>
						<button
							type="submit"
							className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600">
							Upload New Issue
						</button>
					</div>
				</form>
			</div>
			
		</div>
	);
}
