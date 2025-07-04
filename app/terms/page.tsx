import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> December 16, 2024
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using PhoneGuard ("the Service"), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-600 mb-4">PhoneGuard is a community-driven platform that allows users to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Report suspicious phone numbers</li>
                <li>Search for information about phone numbers</li>
                <li>Access community-verified data about potential scams and spam</li>
                <li>Contribute to community safety through collaborative reporting</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
              <p className="text-gray-600 mb-4">
                To use certain features of the Service, you must create an account. You agree to provide accurate,
                current, and complete information during the registration process.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Security</h3>
              <p className="text-gray-600 mb-4">
                You are responsible for safeguarding your account credentials and for all activities that occur under
                your account. You must notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Conduct</h2>
              <p className="text-gray-600 mb-4">You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Submit false, misleading, or malicious reports</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Spam or flood the Service with excessive reports</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Content and Reports</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Generated Content</h3>
              <p className="text-gray-600 mb-4">
                You retain ownership of the content you submit, but you grant us a worldwide, royalty-free license to
                use, modify, and display your content in connection with the Service.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Standards</h3>
              <p className="text-gray-600 mb-4">All reports and content must be:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Truthful and accurate to the best of your knowledge</li>
                <li>Based on actual experiences</li>
                <li>Free from defamatory or libelous statements</li>
                <li>Respectful and appropriate</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Moderation</h3>
              <p className="text-gray-600 mb-4">
                We reserve the right to review, moderate, and remove any content that violates these terms or our
                community guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy</h2>
              <p className="text-gray-600 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                Service, to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimers</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h3>
              <p className="text-gray-600 mb-4">
                We strive to maintain the Service, but we cannot guarantee uninterrupted or error-free operation. The
                Service is provided "as is" without warranties of any kind.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information Accuracy</h3>
              <p className="text-gray-600 mb-4">
                While we moderate content, we cannot guarantee the accuracy of all user-submitted reports. Users should
                exercise their own judgment when using information from the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                To the maximum extent permitted by law, PhoneGuard shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                directly or indirectly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
              <p className="text-gray-600 mb-4">
                You agree to indemnify and hold harmless PhoneGuard from any claims, damages, or expenses arising from
                your use of the Service or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your account and access to the Service at our sole discretion, without prior
                notice, for conduct that we believe violates these terms or is harmful to other users or the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any changes by posting
                the new terms on this page. Your continued use of the Service after changes constitutes acceptance of
                the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These terms shall be governed by and construed in accordance with the laws of the United States, without
                regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Email: legal@phoneguard.com</li>
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
