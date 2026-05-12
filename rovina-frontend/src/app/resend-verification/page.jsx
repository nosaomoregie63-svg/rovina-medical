"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Send } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResendVerification() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const response = await axios.post(
        `${API_URL}/patients/resend-verification`,
        { email },
      );

      toast.success(response.data.message);
      setSent(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send verification email",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-800 to-primaryLight flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mail className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Resend Verification
          </h1>
          <p className="text-blue-100">
            We'll send you a new verification link
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-secondary text-lg py-4 flex items-center justify-center"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Verification Email
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Sent!</h3>
              <p className="text-gray-600 mb-6">
                Please check your email and click the verification link.
              </p>
              <Link to="/login" className="btn-primary inline-block">
                Go to Login
              </Link>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-primary hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


