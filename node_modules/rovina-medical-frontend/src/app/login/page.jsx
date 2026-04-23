"use client";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import RovinaBranding from "../../components/RovinaBranding";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("registered") === "true") {
      toast.info(
        "Please check your email to verify your account before logging in.",
      );
    }
  }, [location.search]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.post(`${API_URL}/patients/login`, formData);

      localStorage.setItem("patientToken", response.data.token);
      localStorage.setItem(
        "patientData",
        JSON.stringify(response.data.patient),
      );

      toast.success("Login successful!");
      navigate("/patient/dashboard");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);

      if (errorMsg.includes("verify your email")) {
        toast.info(
          <div>
            <p>Need to verify your email?</p>
            <Link
              to="/resend-verification"
              className="text-secondary underline"
            >
              Resend verification email
            </Link>
          </div>,
          { autoClose: 8000 },
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <RovinaBranding />
      <div className="min-h-screen bg-gradient-to-br from-primary via-blue-800 to-primaryLight flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-primary font-bold text-3xl">R</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Patient Login
            </h1>
            <p className="text-blue-100">Access your Rovina Medical account</p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-1" /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-field pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-secondary text-lg py-4"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:underline font-semibold"
                >
                  Register here
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-center text-sm text-gray-600 mb-3">
                Want to book without an account?
              </p>
              <Link
                to="/book-appointment"
                className="block text-center text-primary hover:underline font-semibold"
              >
                Book as Guest
              </Link>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link to="/" className="text-white hover:text-secondary transition">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
