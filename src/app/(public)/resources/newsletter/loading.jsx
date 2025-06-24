export default function Loading() {
	return (
		<div className="flex flex-col justify-center items-center h-screen space-y-4">
			<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue border-opacity-75"></div>
			<p className="text-xl text-blue">Loading Newsletters...</p>
		</div>
	);
}