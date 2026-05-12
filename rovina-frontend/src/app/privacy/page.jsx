import Link from "next/link";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">
              Your privacy is important to us
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
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Rovina Medical Diagnostic Services ("we," "our," or "us") is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you visit our website and use our services.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Information We Collect
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Personal Information
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Full name, date of birth, and gender</li>
                <li>
                  • Contact information (email address, phone number, physical
                  address)
                </li>
                <li>
                  • Medical information (health conditions, test results,
                  medical history)
                </li>
                <li>• Emergency contact details</li>
                <li>• Payment and billing information</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              How We Use Your Information
            </h2>
            <div className="space-y-4 mb-6">
              <p className="text-gray-700">
                We use the information we collect to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Provide, maintain, and improve our medical services</li>
                <li>• Process your appointments and medical tests</li>
                <li>• Send you appointment reminders and test results</li>
                <li>• Process payments for services rendered</li>
                <li>
                  • Respond to your inquiries and provide customer support
                </li>
                <li>• Comply with legal and regulatory requirements</li>
                <li>• Maintain medical records as required by law</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Information Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Encrypted data transmission using SSL/TLS protocols</li>
              <li>• Secure password-protected databases</li>
              <li>• Regular security audits and updates</li>
              <li>
                • Limited access to personal information on a need-to-know basis
              </li>
              <li>
                • Employee training on data protection and confidentiality
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Data Sharing and Disclosure
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• With healthcare providers involved in your care</li>
              <li>
                • With insurance companies for claims processing (with your
                consent)
              </li>
              <li>• When required by law or legal process</li>
              <li>
                • To protect the rights, property, or safety of Rovina Medical
                or others
              </li>
              <li>
                • With service providers who assist in our operations (under
                strict confidentiality agreements)
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under Nigerian data protection laws, you have the right to:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Access your personal information we hold about you</li>
              <li>
                • Request correction of inaccurate or incomplete information
              </li>
              <li>
                • Request deletion of your personal information (subject to
                legal requirements)
              </li>
              <li>
                • Object to or restrict certain processing of your information
              </li>
              <li>• Request a copy of your medical records</li>
              <li>• Withdraw consent for data processing (where applicable)</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Cookies and Tracking
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our website uses cookies and similar tracking technologies to
              enhance your browsing experience, analyze site traffic, and
              understand where our visitors are coming from. You can control
              cookies through your browser settings.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our services are not directed to individuals under the age of 18.
              We do not knowingly collect personal information from children
              without parental consent. If you are a parent or guardian and
              believe your child has provided us with personal information,
              please contact us.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last Updated" date.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Contact Us
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
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
            Have Questions About Your Privacy?
          </h2>
          <p className="text-gray-600 mb-8">
            Our team is here to help address your concerns
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

