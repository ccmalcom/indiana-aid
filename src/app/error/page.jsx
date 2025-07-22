

export default async function ErrorPage({ searchParams }) {
    const { message } = await searchParams;
    return (
        <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow text-center">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className="mb-4">An error occurred: {message || 'Unknown error'}</p>
            <a href="/" className="text-white bg-blue rounded p-2">Go back to home</a>
        </div>
    );
}