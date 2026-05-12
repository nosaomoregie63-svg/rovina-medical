"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function PatientProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const p = localStorage.getItem("patientData");
    if (!p || p === "undefined" || p === "null") {
      navigate("/login");
      return;
    }

    try {
      setProfile(JSON.parse(p));
    } catch (error) {
      console.error("Error parsing patient data:", error);
      localStorage.removeItem("patientToken");
      localStorage.removeItem("patientData");
      navigate("/login");
      return;
    }
    setLoading(false);
  }, [navigate]);

  const handleChange = (e) =>
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const token = localStorage.getItem("patientToken");
      const res = await axios.put(`${API_URL}/patients/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = res.data?.data || profile;
      localStorage.setItem("patientData", JSON.stringify(updated));
      toast.success("Profile updated");
    } catch (err) {
      if (err.response?.status === 404) {
        localStorage.setItem("patientData", JSON.stringify(profile));
        toast.success("Profile saved locally");
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile)
    return <div className="py-12 text-center">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <form onSubmit={saveProfile} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium mb-1">First name</label>
          <input
            name="firstName"
            value={profile.firstName || ""}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last name</label>
          <input
            name="lastName"
            value={profile.lastName || ""}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            name="phone"
            value={profile.phone || ""}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
