"use client";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Clock, User, LogIn } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const isInPortal =
    pathname === "/patient" ||
    pathname.startsWith("/patient/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  useEffect(() => {
    const token = localStorage.getItem("patientToken");
    setIsPatientLoggedIn(!!token);
  }, [location.pathname]);

  if (isInPortal) return null;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <a
                href="tel:07086986677"
                className="flex items-center hover:text-secondary transition"
              >
                <Phone className="w-4 h-4 mr-2" />
                070 8698 6677
              </a>
              <a
                href="mailto:rovinamedicaldiagnostic@gmail.com"
                className="flex items-center hover:text-secondary transition"
              >
                <Mail className="w-4 h-4 mr-2" />
                rovinamedicaldiagnostic@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Mon-Sat: 8AM - 6PM
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primaryLight rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">R</span>
            </div>
            <div>
              <span className="font-bold text-xl text-primary block leading-tight">
                ROVINA MEDICAL
              </span>
              <span className="text-xs text-secondary font-semibold">
                DIAGNOSTIC SERVICES
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              Services
            </Link>
            <Link
              to="/doctors"
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              Doctors
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              Contact
            </Link>
            <Link
              to="/track-appointments"
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              Track Appointments
            </Link>

            {/* Portal Buttons */}
            <div className="flex items-center space-x-3">
              {isPatientLoggedIn ? (
                <>
                  <Link
                    to="/patient/dashboard"
                    className="flex items-center space-x-2 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition font-medium"
                  >
                    <User className="w-4 h-4" />
                    <span>My Portal</span>
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("patientToken");
                      localStorage.removeItem("patientData");
                      setIsPatientLoggedIn(false);
                      navigate("/");
                    }}
                    className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition font-medium"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Patient Login</span>
                </Link>
              )}

              <Link
                to="/book-appointment"
                className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 pt-4">
            <Link
              to="/"
              className="block py-3 text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-3 text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block py-3 text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/doctors"
              className="block py-3 text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Doctors
            </Link>
            <Link
              to="/contact"
              className="block py-3 text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/track-appointments"
              className="block py-3 text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Track Appointments
            </Link>

            <div className="mt-4 space-y-3">
              {isPatientLoggedIn ? (
                <>
                  <Link
                    to="/patient/dashboard"
                    className="block w-full text-center border border-primary text-primary px-4 py-3 rounded-lg hover:bg-primary hover:text-white transition font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    My Portal
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("patientToken");
                      localStorage.removeItem("patientData");
                      setIsPatientLoggedIn(false);
                      setIsOpen(false);
                      navigate("/");
                    }}
                    className="block w-full text-center bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center border border-primary text-primary px-4 py-3 rounded-lg hover:bg-primary hover:text-white transition font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Patient Login
                </Link>
              )}

              <Link
                to="/book-appointment"
                className="block w-full text-center bg-secondary text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
