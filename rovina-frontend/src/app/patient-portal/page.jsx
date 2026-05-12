"use client";
import { useState } from "react";
import {
  Mail,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Link from "next/link";

export default function PatientPortal() {
  const [email, setEmail] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const response = await axios.get(
        `${API_URL}/appointments/patient/${email}`,
      );

      setAppointments(response.data.data || []);
      setSearched(true);

      if ((response.data.data || []).length === 0) {
        toast.info("No appointments found for this email");
      }
    } catch (error) {
      toast.error("Failed to fetch appointments");
      setAppointments([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-danger" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-primary" />;
      default:
        return <Clock className="w-5 h-5 text-warning" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-warning/10 text-warning",
      approved: "bg-success/10 text-success",
      cancelled: "bg-danger/10 text-danger",
      completed: "bg-primary/10 text-primary",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    const styles = {
      paid: "bg-success/10 text-success",
      unpaid: "bg-warning/10 text-warning",
      refunded: "bg-gray-100 text-gray-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-700"}`}
      >
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "pending"}
      </span>
    );
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Patient Portal
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            View and manage your appointments
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Find Your Appointments
              </h2>

              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Enter Your Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                    placeholder="your@email.com"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter the email address you used when booking your
                    appointment
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-secondary text-lg py-4 flex items-center justify-center"
                >
                  {loading ? (
                    "Searching..."
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      View My Appointments
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Appointments List */}
      {searched && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold mb-6">
                Your Appointments ({appointments.length})
              </h3>

              {appointments.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-4">
                    No appointments found
                  </p>
                  <Link
                    href="/book-appointment"
                    className="btn-secondary inline-block"
                  >
                    Book Your First Appointment
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment._id}
                      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Left Section */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            {getStatusIcon(appointment.status)}
                            <h4 className="font-bold text-xl text-gray-900">
                              {appointment.department}
                            </h4>
                          </div>

                          <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span>
                                <strong>Date:</strong>{" "}
                                {format(
                                  new Date(appointment.preferredDate),
                                  "MMMM dd, yyyy",
                                )}
                              </span>
                            </div>

                            {appointment.doctor && (
                              <div className="flex items-center space-x-2">
                                <span>👨‍⚕️</span>
                                <span>
                                  <strong>Doctor:</strong> Dr.{" "}
                                  {appointment.doctor.firstName}{" "}
                                  {appointment.doctor.lastName}
                                </span>
                              </div>
                            )}

                            <div className="flex items-center space-x-2">
                              <span>📧</span>
                              <span>{appointment.email}</span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <span>📞</span>
                              <span>{appointment.phone}</span>
                            </div>

                            {appointment.message && (
                              <div className="mt-2 pt-2 border-t">
                                <p className="text-xs text-gray-600">
                                  <strong>Note:</strong> {appointment.message}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-col items-end space-y-3">
                          {getStatusBadge(appointment.status)}
                          {getPaymentBadge(appointment.paymentStatus)}

                          {appointment.paymentAmount > 0 && (
                            <div className="text-sm text-gray-700">
                              <strong>Amount:</strong> ₦
                              {appointment.paymentAmount.toLocaleString()}
                            </div>
                          )}

                          <div className="text-xs text-gray-500">
                            Booked:{" "}
                            {format(
                              new Date(appointment.createdAt),
                              "MMM dd, yyyy",
                            )}
                          </div>

                          {/* Pay Button */}
                          {appointment.status === "approved" &&
                            appointment.paymentStatus === "unpaid" && (
                              <Link
                                to={`/payment?appointment=${appointment._id}`}
                                className="bg-success text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                              >
                                Pay Now
                              </Link>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            Contact us for any questions about your appointments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:07086986677" className="btn-primary">
              Call: 07086986677
            </a>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


