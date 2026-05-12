import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle, Loader, Home, FileText } from "lucide-react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function PaymentCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'failed'
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (reference) {
      verifyPayment();
    } else {
      setStatus("failed");
    }
  }, [reference]);

  const verifyPayment = async () => {
    try {
      setStatus("verifying");
      const response = await axios.get(
        `${API_URL}/payments/verify/${reference}`,
      );

      if (response.data.status === "success") {
        setPaymentData(response.data);
        setStatus("success");
        toast.success("Payment successful!");
      } else {
        setStatus("failed");
        toast.error("Payment verification failed");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setStatus("failed");
      toast.error("Payment verification error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {status === "verifying" ? (
          // Verifying State
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <Loader className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Payment
            </h2>
            <p className="text-lg text-gray-600">
              Please wait while we confirm your payment...
            </p>
          </div>
        ) : status === "success" ? (
          // Success State
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              <CheckCircle className="w-20 h-20 text-success mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Payment Successful!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your appointment has been secured. A confirmation email has been
                sent to you.
              </p>

              {paymentData && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Payment Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Amount Paid:</span>
                      <span className="font-semibold text-gray-900">
                        ₦{paymentData.amount?.toLocaleString() || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Reference ID:</span>
                      <span className="font-mono text-sm text-gray-900 break-all">
                        {reference}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Payment Status:</span>
                      <span className="inline-flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Link
                  to="/patient-portal"
                  className="btn-primary w-full inline-flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  View Appointment Details
                </Link>
                <Link
                  to="/"
                  className="btn-secondary w-full inline-flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Return to Home
                </Link>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                What's Next?
              </h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-primary">1</span>
                  <span>Check your email for appointment confirmation</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary">2</span>
                  <span>
                    Our team will contact you to confirm appointment details
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary">3</span>
                  <span>Arrive 15 minutes early on your appointment date</span>
                </li>
              </ol>
            </div>
          </div>
        ) : (
          // Failed State
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              <XCircle className="w-20 h-20 text-danger mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Payment Failed
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Unfortunately, your payment could not be processed. Please try
                again or contact our support team.
              </p>

              <div className="space-y-3">
                <button
                  onClick={verifyPayment}
                  className="btn-secondary w-full"
                >
                  Try Again
                </button>
                <Link
                  to="/"
                  className="btn-primary w-full inline-flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Return to Home
                </Link>
              </div>
            </div>

            {/* Support Contact */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                Need Assistance?
              </h3>
              <p className="text-gray-600 mb-4">
                Contact our support team for help with your payment:
              </p>
              <a
                href="tel:+2347012345678"
                className="text-primary hover:underline text-lg font-semibold"
              >
                +234 (701) 2345678
              </a>
              <p className="text-gray-600 mt-4 text-sm">
                Available 24/7 for your assistance
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


