import { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import RovinaBranding from "./components/RovinaBranding";

export default function TrackAppointments() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    setSearched(false);

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const encodedEmail = encodeURIComponent(email.toLowerCase());
      const response = await axios.get(
        `${API_URL}/appointments/track/${encodedEmail}`,
      );

      setAppointments(response.data.data || []);
      setSearched(true);

      if (response.data.data.length === 0) {
        toast.info("No appointments found for this email address");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments. Please try again.");
      setAppointments([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
        icon: <AlertCircle className="w-4 h-4" />,
        label: "PENDING APPROVAL",
      },
      approved: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
        icon: <CheckCircle className="w-4 h-4" />,
        label: "APPROVED",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
        icon: <XCircle className="w-4 h-4" />,
        label: "CANCELLED",
      },
      completed: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
        icon: <CheckCircle className="w-4 h-4" />,
        label: "COMPLETED",
      },
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold border ${config.bg} ${config.text} ${config.border}`}
      >
        {config.icon}
        <span>{config.label}</span>
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <RovinaBranding />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Search className="w-5 h-5 text-secondary" />
              <span className="text-sm font-semibold">Quick Access</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Track and Manage Your Appointments
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Enter your email to view all your appointments and their status
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Enter your email to find appointments
              </h2>

              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nosaomoregie31@gmail.com"
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-4 rounded-lg hover:bg-blue-800 transition font-bold text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Search Appointments</span>
                    </>
                  )}
                </button>
              </form>

              <p className="text-sm text-gray-500 text-center mt-4">
                Use the email address you provided when booking your appointment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {searched && (
        <section className="pb-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {appointments.length === 0 ? (
                // No Appointments Found
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No appointments found
                  </h3>
                  <p className="text-gray-600 mb-8">
                    No appointments found for this email address.
                  </p>
                  <Link
                    to="/book-appointment"
                    className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition font-bold"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book an Appointment</span>
                  </Link>
                </div>
              ) : (
                // Appointments List
                <>
                  <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {appointments.length} Appointment
                      {appointments.length !== 1 ? "s" : ""} Found
                    </h2>
                    <p className="text-gray-600">
                      Showing appointments for{" "}
                      <span className="font-bold text-primary">{email}</span>
                    </p>
                  </div>

                  <div className="space-y-6">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment._id}
                        className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                      >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-blue-800 text-white p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-blue-100 mb-1">
                                Appointment ID
                              </p>
                              <p className="text-xl font-mono font-bold">
                                APT-{appointment._id.slice(-8).toUpperCase()}
                              </p>
                            </div>
                            {getStatusBadge(appointment.status)}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <User className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">
                                  Patient Name
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                  {appointment.firstName} {appointment.lastName}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-6 h-6 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">
                                  Department
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                  {appointment.department}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-6 h-6 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">
                                  Date
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                  {formatDate(appointment.appointmentDate)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Clock className="w-6 h-6 text-orange-600" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">
                                  Time
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                  {appointment.appointmentTime}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Phone className="w-6 h-6 text-cyan-600" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">
                                  Phone
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                  {appointment.phone}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-pink-600" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">
                                  Booked On
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                  {new Date(
                                    appointment.createdAt,
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Status Message */}
                          {appointment.status === "pending" && (
                            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-sm text-yellow-800">
                                <strong>Pending Review:</strong> Your
                                appointment is awaiting approval. You'll receive
                                email and SMS confirmation once approved.
                              </p>
                            </div>
                          )}

                          {appointment.status === "approved" && (
                            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-sm text-green-800">
                                <strong>Confirmed:</strong> Your appointment is
                                approved. Please arrive 15 minutes early with
                                your ID.
                              </p>
                            </div>
                          )}

                          {appointment.status === "cancelled" && (
                            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                              <p className="text-sm text-red-800">
                                <strong>Cancelled:</strong> This appointment has
                                been cancelled. Contact us at 070 8698 6677 for
                                assistance.
                              </p>
                            </div>
                          )}

                          {appointment.status === "completed" && (
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <p className="text-sm text-blue-800">
                                <strong>Completed:</strong> Thank you for
                                visiting Rovina Medical. We hope to serve you
                                again!
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help?
            </h2>
            <p className="text-gray-600 mb-8">
              If you can't find your appointment or need to make changes,
              contact us directly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:07086986677"
                className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition font-semibold"
              >
                <Phone className="w-5 h-5" />
                <span>Call: 070 8698 6677</span>
              </a>
              <a
                href="https://wa.me/2347086986677?text=Hello%2C%20I%20need%20help%20with%20my%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


