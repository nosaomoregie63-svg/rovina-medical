import Link from "next/link";
import { Home, Search, Phone, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-800 to-blue-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            What can you do?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/"
              className="group border border-gray-200 rounded-lg p-6 hover:border-primary transition"
            >
              <Home className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition" />
              <p className="font-semibold text-gray-900 mb-1">Go Home</p>
              <p className="text-sm text-gray-600">Return to homepage</p>
            </Link>

            <Link
              href="/services"
              className="group border border-gray-200 rounded-lg p-6 hover:border-primary transition"
            >
              <Search className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition" />
              <p className="font-semibold text-gray-900 mb-1">Our Services</p>
              <p className="text-sm text-gray-600">Browse our services</p>
            </Link>

            <Link
              href="/contact"
              className="group border border-gray-200 rounded-lg p-6 hover:border-primary transition"
            >
              <Phone className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition" />
              <p className="font-semibold text-gray-900 mb-1">Contact Us</p>
              <p className="text-sm text-gray-600">Get in touch</p>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center space-x-2 bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>

          <Link
            href="/"
            className="flex items-center justify-center space-x-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="mt-12 text-blue-100">
          <p className="mb-2">Need immediate assistance?</p>
          <a
            href="tel:07086986677"
            className="text-2xl font-bold text-white hover:text-secondary transition"
          >
            070 8698 6677
          </a>
        </div>
      </div>
    </div>
  );
}

