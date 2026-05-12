import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Loader,
  CalendarIcon,
  User,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function Payment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointment");

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(5000);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const splitName = (name) => {
      if (!name) return { firstName: "", lastName: "" };
      const parts = name.trim().split(" ").filter(Boolean);
      return {
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" ") || "",
      };
    };

    // First check if appointment details are in URL params
    const urlDetails = {
      _id: searchParams.get("id"),
      firstName: searchParams.get("firstName"),
      lastName: searchParams.get("lastName"),
      department: searchParams.get("department"),
      appointmentDate: searchParams.get("date"),
      appointmentTime: searchParams.get("time"),
      email: searchParams.get("email"),
      phone: searchParams.get("phone"),
      doctor: searchParams.get("doctor") || null,
      name: searchParams.get("name"),
    };

    if (!urlDetails.firstName && urlDetails.name) {
      const parsed = splitName(urlDetails.name);
      urlDetails.firstName = parsed.firstName;
      urlDetails.lastName = parsed.lastName;
    }

    if (
      urlDetails._id &&
      urlDetails.firstName &&
      urlDetails.email &&
      urlDetails.phone
    ) {
      // Use URL params data
      setAppointment(urlDetails);
      setLoading(false);
      return;
    }

    // If no URL params, try to fetch by appointment ID
    if (appointmentId) {
      fetchAppointment();
    } else {
      toast.error("No appointment selected");
      navigate("/patient-portal");
    }
  }, [appointmentId, navigate, searchParams]);

  const fetchAppointment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/appointments/${appointmentId}`,
      );
      setAppointment(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching appointment:", error);
      const errorMsg =
        error.response?.data?.message || "Failed to fetch appointment details";
      toast.error(errorMsg);
      navigate("/patient-portal");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    try {
      setProcessing(true);

      // Initialize payment with Paystack
      const response = await axios.post(`${API_URL}/payments/initialize`, {
        appointmentId,
        amount,
        email: appointment.email,
      });

      // Redirect to Paystack payment form
      if (response.data.authorization_url) {
        window.location.href = response.data.authorization_url;
      } else {
        toast.error("Failed to initialize payment");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      const errorMsg =
        error.response?.data?.message || "Failed to process payment";
      toast.error(errorMsg);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">
            Loading appointment details...
          </p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return null;
  }

  const patientName =
    appointment.firstName || appointment.lastName
      ? `${appointment.firstName || ""} ${appointment.lastName || ""}`.trim()
      : appointment.name ||
        (appointment.email ? appointment.email.split("@")[0] : "");

  const subtotal = amount;
  const tax = amount * 0.05;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-blue-900 font-semibold mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Complete Payment
          </h1>
          <p className="text-lg text-gray-600">
            Secure your appointment with Paystack
          </p>
        </div>

        {/* Payment Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Appointment Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Appointment Details
            </h2>

            <div className="space-y-6">
              {/* Patient Info */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                  Patient Name
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {patientName}
                </p>
              </div>

              {/* Department */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                  Department
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {appointment.department}
                </p>
              </div>

              {/* Doctor */}
              {appointment.doctor && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                    Doctor
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    Dr. {appointment.doctor.firstName}{" "}
                    {appointment.doctor.lastName}
                  </p>
                </div>
              )}

              {/* Appointment Date */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Appointment Date
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {(() => {
                    const dateValue =
                      appointment.appointmentDate ||
                      appointment.preferredDate ||
                      appointment.date;
                    // Handle simple date string format (YYYY-MM-DD)
                    const date = dateValue.includes("T")
                      ? new Date(dateValue)
                      : new Date(dateValue + "T00:00:00");
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  })()}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a
                    href={`mailto:${appointment.email}`}
                    className="text-primary hover:underline"
                  >
                    {appointment.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <a
                    href={`tel:${appointment.phone}`}
                    className="text-primary hover:underline"
                  >
                    {appointment.phone}
                  </a>
                </div>
              </div>

              {appointment.message && (
                <div className="pt-4 border-t">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Notes
                  </label>
                  <p className="text-gray-700">{appointment.message}</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>

            <form onSubmit={handlePayment} className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount (₦) *
                </label>
                <div className="relative">
                  <span className="absolute left-1 top-3.5 text-xl font-semibold text-gray-600">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmount(Math.max(0, parseInt(e.target.value) || 0))
                    }
                    className="input-field pl-16 w-full"
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%):</span>
                  <span className="font-semibold text-gray-900">
                    ₦{tax.toLocaleString()}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <span className="font-semibold text-lg text-gray-900">
                    Total:
                  </span>
                  <span className="font-bold text-lg text-primary">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-blue-50 border-l-4 border-primary p-4 rounded text-sm text-gray-700">
                <p className="font-semibold mb-1">🔒 Secure Payment</p>
                <p>
                  Powered by Paystack. Your payment information is encrypted and
                  secure.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Pay Now with Paystack"
                )}
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <p className="text-gray-600 mb-4">
            Questions about payment? Contact our support team:
          </p>
          <a
            href="tel:+2347012345678"
            className="text-primary hover:underline font-semibold"
          >
            +234 (701) 2345678
          </a>
        </div>
      </div>
    </div>
  );
}
