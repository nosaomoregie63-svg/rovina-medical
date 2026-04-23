"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const getPaymentBadge = (paymentStatus) => {
  if (!paymentStatus) return null;
  const styles = {
    paid: "bg-success/10 text-success border border-success/20",
    unpaid: "bg-danger/10 text-danger border border-danger/20",
    refunded: "bg-warning/10 text-warning border border-warning/20",
  };
  return (
    <span
      className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${styles[paymentStatus]}`}
    >
      {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
    </span>
  );
};

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      // include email in path rather than relying on token
      const stored = localStorage.getItem("patientData");
      const email = stored ? JSON.parse(stored).email : "";
      const res = await axios.get(
        `${API_URL}/appointments/patient/${encodeURIComponent(email)}`,
      );
      setAppointments(res.data.data || []);
    } catch (err) {
      toast.error("Unable to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    if (!confirm("Cancel this appointment?")) return;
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("patientToken");
      await axios.put(
        `${API_URL}/appointments/cancel/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Appointment cancelled");
      fetchAppointments();
    } catch (err) {
      toast.error("Failed to cancel");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Appointments</h1>
        <Link to="/book-appointment" className="btn-secondary">
          Book New
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No appointments found.</p>
          <Link to="/book-appointment" className="btn-secondary">
            Book an appointment
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((a) => (
            <div
              key={a._id}
              className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold">
                  {a.department}{" "}
                  {a.doctor
                    ? `- Dr. ${a.doctor.firstName} ${a.doctor.lastName}`
                    : ""}
                </h3>
                <p className="text-sm text-gray-600">
                  {format(new Date(a.preferredDate), "PPP")}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Status: <span className="font-medium">{a.status}</span>
                  {getPaymentBadge(a.paymentStatus)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {a.status !== "cancelled" && a.status !== "completed" && (
                  <button
                    onClick={() => cancelAppointment(a._id)}
                    className="btn-outline text-sm"
                  >
                    Cancel
                  </button>
                )}
                <Link
                  to={`/patient/appointments/${a._id}`}
                  className="text-primary text-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
