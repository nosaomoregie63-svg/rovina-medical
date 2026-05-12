import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Loader, LogIn } from "lucide-react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      console.log("Attempting login with:", { email, password });
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      // Store token and user data in localStorage
      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminUser", JSON.stringify(response.data.user));

      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-800 to-primaryLight flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
            <span className="text-3xl font-bold text-primary">R</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-blue-100">Admin Login</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-6"
        >
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-12 w-full"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-12 w-full"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
          {/* Forgot Password Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Forgot your password?{" "}
              <a
                href="#"
                className="text-primary hover:underline font-semibold"
              >
                Reset here
              </a>
            </p>
          </div>
        </form>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-white hover:text-blue-100 transition font-semibold flex items-center justify-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 bg-white/10 backdrop-blur rounded-xl p-4 text-white text-sm text-center">
          <p className="font-semibold mb-2">Demo Credentials</p>
          <p className="text-blue-100 mb-2">
            Email: rovinamedicaldiagostic@gmail.com
            <br />
            Password: Admin@2024
          </p>
        </div>
      </div>
    </div>
  );
}


