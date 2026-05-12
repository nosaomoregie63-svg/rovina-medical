"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function PatientSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const resendVerification = async () => {
    try {
      setLoading(true);
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const patientData = localStorage.getItem("patientData");

      if (
        !patientData ||
        patientData === "undefined" ||
        patientData === "null"
      ) {
        toast.error("Patient data not found. Please log in again.");
        navigate("/login");
        return;
      }

      let patient;
      try {
        patient = JSON.parse(patientData);
      } catch (error) {
        console.error("Error parsing patient data:", error);
        localStorage.removeItem("patientToken");
        localStorage.removeItem("patientData");
        toast.error("Session data corrupted. Please log in again.");
        navigate("/login");
        return;
      }

      await axios.post(`${API_URL}/patients/resend-verification`, {
        email: patient.email,
      });
      toast.success("Verification email resent");
    } catch (err) {
      toast.error("Failed to resend");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("patientToken");
    localStorage.removeItem("patientData");
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-4 max-w-xl">
        <div className="p-4 bg-white rounded-lg">
          <h3 className="font-semibold">Email Verification</h3>
          <p className="text-sm text-gray-600">
            Resend verification email if you did not receive it.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={resendVerification}
              className="btn-secondary"
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend Verification"}
            </button>
            <Link to="/resend-verification" className="text-sm text-primary">
              Open form
            </Link>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg">
          <h3 className="font-semibold">Account</h3>
          <p className="text-sm text-gray-600">Logout from your account.</p>
          <div className="mt-3">
            <button onClick={logout} className="btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


