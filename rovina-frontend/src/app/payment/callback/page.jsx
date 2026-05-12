"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import axios from "axios";
import Link from "next/link";

export default function PaymentCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState("verifying");
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (reference) {
      verifyPayment();
    } else {
      setStatus("failed");
    }
  }, [reference]);

  const verifyPayment = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const response = await axios.get(
        `${API_URL}/payments/verify/${reference}`,
      );

      if (response.data.success) {
        setStatus("success");
        setPayment(response.data.data);
      } else {
        setStatus("failed");
      }
    } catch (error) {
      setStatus("failed");
    }
  };

  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold mb-2">Verifying Payment...</h2>
          <p className="text-gray-600">
            Please wait while we confirm your payment
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>

          <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your appointment has been confirmed and
            payment recorded.
          </p>

          {payment && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm mb-2">
                <strong>Amount Paid:</strong> ₦{payment.amount.toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>Reference:</strong> {payment.reference}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/patient-portal"
              className="block w-full btn-primary text-center"
            >
              View My Appointments
            </Link>
            <Link href="/" className="block w-full btn-outline text-center">
              Back to Homepage
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            A confirmation SMS and email has been sent to you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>

        <h2 className="text-3xl font-bold mb-4">Payment Failed</h2>
        <p className="text-gray-600 mb-6">
          We couldn't process your payment. Please try again or contact us for
          assistance.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => router.back()}
            className="w-full btn-secondary"
          >
            Try Again
          </button>
          <Link
            href="/contact"
            className="block w-full btn-outline text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}


