import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const location = useLocation();
  const pathname = location.pathname;
  const isInPortal =
    pathname === "/patient" ||
    pathname.startsWith("/patient/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (isInPortal) return null;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">ROVINA MEDICAL</h3>
            <p className="text-gray-400 text-sm">
              Quality medical diagnostic services with cutting-edge technology
              and compassionate care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-secondary"
                >
                  Patient Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-secondary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-secondary"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-secondary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="text-gray-400 hover:text-secondary"
                >
                  Staff Login
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-secondary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-secondary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Medical Ultrasound</li>
              <li>• Echocardiography</li>
              <li>• Laboratory Services</li>
              <li>• ECG Services</li>
              <li>• Cancer Screening</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Roving House, 3 Mobil Road, Satellite Town</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>07086986677</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>rovinamedicaldiagnostic@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">24/7 Emergency</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Rovina Medical Diagnostic Services. All
            rights reserved.
          </p>
          <div className="mt-3 space-x-4">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-secondary transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-secondary transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
