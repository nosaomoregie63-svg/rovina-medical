"use client";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import axios from "axios";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setStatus("error");
      setMessage("Invalid verification link");
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.get(
        `${API_URL}/patients/verify-email/${token}`,
      );

      setStatus("success");
      setMessage(response.data.message);

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setStatus("error");
      setMessage(error.response?.data?.message || "Email verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {status === "verifying" && (
          <>
            <Loader className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold mb-2">Verifying Email...</h2>
            <p className="text-gray-600">
              Please wait while we verify your email address
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Email Verified!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">
              Redirecting to login page...
            </p>
            <Link to="/login" className="inline-block mt-4 btn-primary">
              Go to Login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <Link
                to="/resend-verification"
                className="block w-full btn-secondary"
              >
                Resend Verification Email
              </Link>
              <Link to="/" className="block w-full btn-outline">
                Back to Homepage
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
