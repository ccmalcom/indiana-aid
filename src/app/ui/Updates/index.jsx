
// https://www.facebook.com/IndianaAID1
// https://www.instagram.com/indianaaid/
  const mockUpdates = [
  {
    platform: 'facebook',
    url: 'https://facebook.com/yourpage/posts/1234567890',
    label: 'We hosted an amazing volunteer training!',
    date: '2024-06-01'
  },
  {
    platform: 'instagram',
    url: 'https://instagram.com/p/ABC123xyz',
    label: 'New donation dropoff hours!',
    date: '2024-05-28'
  }
];
export default function Updates() {
  const updates = mockUpdates; // eventually fetch this

  return (
    <div className="space-y-4">
      <ul className="list-disc pl-5">
        {updates.map((update, i) => (
          <li key={i}>
            <a href={update.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              [{update.platform}] {update.label} – <span className="text-sm text-gray-500">{update.date}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}