import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function PatientPortal() {
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email");

  const [email, setEmail] = useState(emailParam || "");
  const [appointments, setAppointments] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/appointments/patient/${email}`,
      );
      setAppointments(response.data.data || []);
      setSearched(true);

      if ((response.data.data || []).length === 0) {
        toast.info("No appointments found for this email");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      const errorMsg =
        error.response?.data?.message || "Failed to fetch appointments";
      toast.error(errorMsg);
      setAppointments([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-6 h-6 text-success" />;
      case "cancelled":
        return <AlertCircle className="w-6 h-6 text-danger" />;
      case "completed":
        return <CheckCircle className="w-6 h-6 text-primary" />;
      default:
        return <Clock className="w-6 h-6 text-warning" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-warning/10 text-warning",
      approved: "bg-success/10 text-success",
      cancelled: "bg-danger/10 text-danger",
      completed: "bg-primary/10 text-primary",
    };
    return styles[status] || styles.pending;
  };

  const getPaymentBadge = (paymentStatus) => {
    const styles = {
      paid: "bg-success/10 text-success",
      unpaid: "bg-danger/10 text-danger",
      refunded: "bg-warning/10 text-warning",
    };
    return styles[paymentStatus] || styles.unpaid;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Patient Portal
          </h1>
          <p className="text-lg text-gray-600">
            Track and manage your appointments
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter your email to find appointments
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="input-field pl-12 w-full"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-8"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results */}
        {searched && appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No appointments found
            </h3>
            <p className="text-gray-600 mb-6">
              {email
                ? "No appointments found for this email address."
                : "Please enter your email to search for appointments."}
            </p>
            <Link to="/book-appointment" className="btn-primary inline-block">
              Book an Appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      {getStatusIcon(appointment.status)}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {appointment.firstName} {appointment.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">
                            {appointment.department}
                          </span>
                          {appointment.doctor &&
                            ` • Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(appointment.status)}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentBadge(appointment.paymentStatus || "unpaid")}`}
                      >
                        {(appointment.paymentStatus || "unpaid")
                          .charAt(0)
                          .toUpperCase() +
                          (appointment.paymentStatus || "unpaid").slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 py-4 border-t border-b">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">
                        Appointment Date
                      </label>
                      <p className="text-sm text-gray-900 font-semibold">
                        {new Date(appointment.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">
                        Email
                      </label>
                      <a
                        href={`mailto:${appointment.email}`}
                        className="text-sm text-primary hover:underline font-semibold flex items-center gap-1"
                      >
                        <Mail className="w-4 h-4" />
                        {appointment.email}
                      </a>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">
                        Phone
                      </label>
                      <a
                        href={`tel:${appointment.phone}`}
                        className="text-sm text-primary hover:underline font-semibold flex items-center gap-1"
                      >
                        <Phone className="w-4 h-4" />
                        {appointment.phone}
                      </a>
                    </div>
                  </div>

                  {appointment.message && (
                    <div className="mb-4">
                      <label className="text-xs font-semibold text-gray-500 uppercase">
                        Notes
                      </label>
                      <p className="text-sm text-gray-700 mt-1">
                        {appointment.message}
                      </p>
                    </div>
                  )}

                  {appointment.status === "approved" &&
                    appointment.paymentStatus !== "paid" && (
                      <Link
                        to={`/payment?appointment=${appointment._id}`}
                        className="mt-4 inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
                      >
                        Pay Now <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        {searched && appointments.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-primary to-blue-800 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-blue-100 mb-3">
                  Having issues with your appointment? Contact us:
                </p>
                <a
                  href="tel:+2347012345678"
                  className="flex items-center gap-2 text-white hover:text-blue-200 transition font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  +234 (701) 2345678
                </a>
              </div>
              <div>
                <p className="text-blue-100 mb-3">
                  Want to book another appointment?
                </p>
                <Link
                  to="/book-appointment"
                  className="flex items-center gap-2 text-white hover:text-blue-200 transition font-semibold"
                >
                  Book Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


