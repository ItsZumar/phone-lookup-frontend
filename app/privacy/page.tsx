import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> December 16, 2024
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                PhoneGuard ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our phone number reporting
                and lookup service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-600 mb-4">When you create an account, we collect:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Name and email address</li>
                <li>Password (encrypted)</li>
                <li>Account preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Report Information</h3>
              <p className="text-gray-600 mb-4">When you submit reports, we collect:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Phone numbers being reported</li>
                <li>Category of the report (scam, spam, etc.)</li>
                <li>Detailed descriptions of incidents</li>
                <li>Date and time of submissions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Information</h3>
              <p className="text-gray-600 mb-4">We automatically collect:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>IP addresses and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Search queries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Provide and maintain our service</li>
                <li>Verify and moderate user reports</li>
                <li>Enable phone number lookups</li>
                <li>Communicate with you about your account</li>
                <li>Improve our service and user experience</li>
                <li>Prevent fraud and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or rent your personal information. We may share information in the following
                circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>
                  <strong>Public Reports:</strong> Verified phone number reports are made publicly searchable (without
                  personal identifiers)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Service Providers:</strong> With trusted third parties who assist in operating our service
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with mergers or acquisitions
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication systems</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Secure data centers and infrastructure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Export your data</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-600 mb-4">
                We retain your information for as long as necessary to provide our services and comply with legal
                obligations. Specifically:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Account information: Until account deletion</li>
                <li>Report data: Indefinitely for community protection (anonymized)</li>
                <li>Usage logs: 12 months</li>
                <li>Communication records: 3 years</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze site usage and performance</li>
                <li>Provide personalized experiences</li>
              </ul>
              <p className="text-gray-600 mb-4">You can control cookie settings through your browser preferences.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our service is not intended for children under 13. We do not knowingly collect personal information from
                children under 13. If we become aware that we have collected such information, we will delete it
                promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Users</h2>
              <p className="text-gray-600 mb-4">
                If you are accessing our service from outside the United States, please be aware that your information
                may be transferred to, stored, and processed in the United States where our servers are located.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Email: privacy@phoneguard.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Security Street, Safety City, SC 12345</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
