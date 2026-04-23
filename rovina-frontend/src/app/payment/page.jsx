"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";

export default function Payment() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointment");

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [amount, setAmount] = useState(5000);

  useEffect(() => {
    if (appointmentId) {
      fetchAppointment();
    }
  }, [appointmentId]);

  const fetchAppointment = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.get(
        `${API_URL}/appointments/${appointmentId}`,
      );
      setAppointment(response.data.data);
    } catch (error) {
      toast.error("Failed to load appointment details");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";

      const response = await axios.post(`${API_URL}/payments/initialize`, {
        appointmentId: appointment._id,
        amount,
        email: appointment.email,
        phone: appointment.phone,
      });

      window.location.href = response.data.data.authorization_url;
    } catch (error) {
      toast.error("Failed to initialize payment. Please try again.");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Appointment Not Found</h2>
          <p className="text-gray-600">
            The appointment you're trying to pay for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <CreditCard className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Make Payment</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Secure payment for your appointment
          </p>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Appointment Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Appointment Details</h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Patient Name</p>
                    <p className="font-semibold">
                      {appointment.firstName} {appointment.lastName}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600">Department</p>
                    <p className="font-semibold">{appointment.department}</p>
                  </div>

                  {appointment.doctor && (
                    <div>
                      <p className="text-gray-600">Doctor</p>
                      <p className="font-semibold">
                        Dr. {appointment.doctor.firstName}{" "}
                        {appointment.doctor.lastName}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-gray-600">Appointment Date</p>
                    <p className="font-semibold">
                      {format(
                        new Date(appointment.preferredDate),
                        "MMMM dd, yyyy",
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-semibold">{appointment.email}</p>
                  </div>

                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-semibold">{appointment.phone}</p>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Payment Information</h3>

                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Amount to Pay (₦)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      required
                      min="100"
                      className="input-field"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Standard consultation fee: ₦5,000
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">
                        ₦{amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-lg text-primary">
                        ₦{amount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full btn-secondary text-lg py-4"
                  >
                    {processing ? "Processing..." : "Proceed to Payment"}
                  </button>

                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      🔒 Secured by Paystack
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-bold mb-2 flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                Secure Payment
              </h4>
              <p className="text-sm text-gray-700">
                Your payment is processed securely through Paystack. We accept
                all major cards including Visa, Mastercard, and Verve. You can
                also pay using bank transfer or USSD.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
