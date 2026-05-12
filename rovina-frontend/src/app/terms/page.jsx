import Link from "next/link";
import { FileText, AlertCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-blue-100">
              Please read these terms carefully before using our services
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              By accessing and using the services provided by Rovina Medical
              Diagnostic Services, you accept and agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do
              not use our services.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Services Provided
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Rovina Medical Diagnostic Services provides:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Medical diagnostic and imaging services</li>
              <li>• Laboratory testing and analysis</li>
              <li>• Online appointment booking and management</li>
              <li>• Patient portal access for medical records</li>
              <li>• Health screening packages</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Patient Responsibilities
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As a patient, you agree to:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>
                • Provide accurate and complete information about your medical
                history
              </li>
              <li>• Arrive on time for scheduled appointments</li>
              <li>
                • Notify us at least 24 hours in advance if you need to cancel
                or reschedule
              </li>
              <li>
                • Follow pre-test instructions provided by our medical staff
              </li>
              <li>
                • Pay for services rendered in accordance with our payment terms
              </li>
              <li>• Treat our staff and other patients with respect</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Appointments and Cancellations
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-2">
                    <strong>Cancellation Policy:</strong> We require at least 24
                    hours notice for appointment cancellations or rescheduling.
                    Late cancellations or no-shows may be subject to a
                    cancellation fee.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Payment Terms
            </h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>
                • Payment is due at the time of service unless prior
                arrangements have been made
              </li>
              <li>• We accept cash, card payments, and bank transfers</li>
              <li>
                • For corporate accounts, payment terms will be specified in the
                service agreement
              </li>
              <li>• All fees are subject to change with prior notice</li>
              <li>• Refunds are processed according to our refund policy</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Medical Records and Confidentiality
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              All medical records and patient information are maintained in
              strict confidence in accordance with Nigerian medical privacy laws
              and our Privacy Policy. You have the right to access your medical
              records upon request.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              While we strive to provide accurate diagnostic services, medical
              diagnosis involves inherent uncertainties. Rovina Medical
              Diagnostic Services shall not be liable for indirect, incidental,
              special, or consequential damages arising from the use of our
              services, except as required by law.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              All content on our website, including text, graphics, logos, and
              software, is the property of Rovina Medical Diagnostic Services
              and is protected by copyright and intellectual property laws. You
              may not reproduce, distribute, or create derivative works without
              our written permission.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              These Terms of Service are governed by and construed in accordance
              with the laws of the Federal Republic of Nigeria. Any disputes
              arising from these terms shall be subject to the exclusive
              jurisdiction of Nigerian courts.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We reserve the right to modify these Terms of Service at any time.
              Changes will be effective immediately upon posting on our website.
              Continued use of our services after changes constitutes acceptance
              of the modified terms.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Contact Information
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> rovinamedicaldiagnostic@gmail.com
                </p>
                <p>
                  <strong>Phone:</strong> 070 8698 6677
                </p>
                <p>
                  <strong>Address:</strong> Roving House, 3 Mobil Road, Ile Epo
                  Bus Stop, Satellite Town, Lagos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8">Book your appointment today</p>
          <Link
            href="/book-appointment"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition font-semibold"
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}

