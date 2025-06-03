import Link from 'next/link';

export default function ResourcesPage() {
  return (
    <main className="bg-white min-h-screen text-[#0a1744] px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-2">Indiana AID Resources</h1>
        <p className="italic mb-8 max-w-3xl">
          Indiana AID is a volunteer group that is not associated with any government organization. We cannot provide professional legal advice... we do not sanction any kind of illegal activity, etc etc.
        </p>

        {/* Top Buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          <Link href="/contact" className="bg-[#0a1744] text-white px-6 py-3 rounded font-semibold text-center w-60" >
            Request Our Assistance
          </Link>
          <Link href="/resources/newsletter" className="bg-[#0a1744] text-white px-6 py-3 rounded font-semibold text-center w-60" >
            Newsletter
          </Link>
          <Link href="/resources/community" className="bg-[#0a1744] text-white px-6 py-3 rounded font-semibold text-center w-60" >
            Community Resources
          </Link>
          <button className="bg-[#0a1744] text-white px-6 py-3 rounded font-semibold text-center w-60">???</button>
        </div>

        {/* Collapsible Resources */}
        <h2 className="text-2xl font-bold mb-4">Other Resources</h2>
        <ul className="space-y-2">
          {[
            'Legal Resources',
            'Immigrant Support Resources',
            'Know Your Rights',
            'Immigration & School',
            'Detention & Deportation'
          ].map((title) => (
            <li key={title}>
              <details className="group">
                <summary className="cursor-pointer font-semibold text-lg flex items-center">
                  <span className="mr-2 text-blue-900 group-open:rotate-45 transition-transform">+</span>
                  {title}
                </summary>
                <div className="pl-6 mt-2 text-base text-gray-700">
                  {/* Placeholder for collapsible content */}
                  Resource content goes here.
                </div>
              </details>
            </li>
          ))}
        </ul>

       
      </div>
    </main>
  );
}