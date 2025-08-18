export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Service & Privacy Policy</h1>
      <p className="mb-6">
        <strong>Effective Date:</strong>{' '}
        <span className="text-gray-500">August 18, 2025</span>
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">1. Who We Are</h2>
      <p className="mb-4">
        Indiana AID (Assistance to Immigrants in Detention) is a volunteer-led nonprofit
        that supports individuals detained by ICE in Indiana. Our website serves to share
        information, gather community support, and connect with volunteers.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">2. Your Use of This Website</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Use it for lawful purposes only</li>
        <li>Not attempt to hack, disrupt, or misuse the website</li>
        <li>Respect the rights of others, including their privacy and personal data</li>
      </ul>
      <p className="mb-4">
        We reserve the right to update, modify, or remove access to the site at any time.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">3. Data We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Your name and email (e.g., if you sign up for our mailing list or volunteer)</li>
        <li>Any information you choose to submit through forms</li>
        <li>Anonymous website usage data (e.g., browser type, pages visited)</li>
      </ul>
      <p className="mb-4">
        We do <strong>not</strong> sell, trade, or rent your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">4. How We Use Your Data</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Respond to your inquiries or applications</li>
        <li>Send occasional updates (e.g., newsletter, volunteer opportunities)</li>
        <li>Improve our website and community outreach</li>
      </ul>
      <p className="mb-4">
        We store your data securely and limit access to authorized team members only.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">5. Cookies & Analytics</h2>
      <p className="mb-4">
        Our website may use cookies or third-party analytics tools (like Google Analytics)
        to understand website usage. These tools do not collect personally identifying information.
        You can disable cookies in your browser if you’d prefer.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">6. Third-Party Services</h2>
      <p className="mb-4">
        We may use services like:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Supabase (to store and manage data)</li>
        <li>Google (for calendar integration)</li>
        <li>Vercel (for hosting)</li>
      </ul>
      <p className="mb-4">
        These providers have their own privacy policies, which we do not control.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">7. Data Retention</h2>
      <p className="mb-4">
        We retain data as long as necessary for our operations or legal requirements.
        You can request to view, update, or delete your data at any time by emailing us at{' '}
        <span className="text-gray-500">[insert contact email]</span>.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">8. Your Rights</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Access the data we have about you</li>
        <li>Correct or delete your data</li>
        <li>Withdraw consent for data use</li>
      </ul>
      <p className="mb-4">
        To exercise your rights, contact us at{' '}
        <span className="text-gray-500">indianaaidcontact@gmail.com</span>.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">9. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy from time to time. The latest version will always be
        posted on this page with the effective date noted at the top.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">10. Contact</h2>
      <p className="mb-2">
        If you have any questions or concerns about these terms or our data practices, please contact us:
      </p>
      <p>
        <strong>Email:</strong>{' '}
        <span className="text-gray-500">indianaaidcontact@gmail.com</span><br />
        
      </p>
    </main>
  );
}
