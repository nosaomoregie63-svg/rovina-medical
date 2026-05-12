import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Activity,
  Calendar,
  Users,
  BarChart3,
  Menu,
  X,
  LogOut,
  Home,
  UserPlus,
} from "lucide-react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    approvedAppointments: 0,
    todayAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      navigate("/admin/login");
      return;
    }

    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_URL}/appointments/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(response.data);
    } catch (error) {
      const status = error.response?.status;

      if (status === 404) {
        try {
          const token = localStorage.getItem("adminToken");
          const response = await axios.get(`${API_URL}/appointments`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const allAppointments = response.data.data || [];
          const todayString = new Date().toDateString();
          const todayAppointments = allAppointments.filter((appointment) => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate.toDateString() === todayString;
          }).length;

          setStats({
            totalAppointments: allAppointments.length,
            pendingAppointments: allAppointments.filter(
              (apt) => apt.status === "pending",
            ).length,
            approvedAppointments: allAppointments.filter(
              (apt) => apt.status === "approved",
            ).length,
            todayAppointments,
          });
        } catch (fallbackError) {
          console.error("Error fetching appointments fallback:", fallbackError);
          setStats({
            totalAppointments: 0,
            pendingAppointments: 0,
            approvedAppointments: 0,
            todayAppointments: 0,
          });
        }
      } else {
        console.error("Error fetching stats:", error);

        if (status === 401) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          navigate("/admin/login");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const user = JSON.parse(localStorage.getItem("adminUser") || "{}");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col fixed h-screen z-40 lg:relative`}
      >
        {/* Logo */}
        <div
          className={`${
            sidebarOpen ? "p-6" : "p-4"
          } border-b flex items-center justify-between`}
        >
          {sidebarOpen ? (
            <>
              <h1 className="text-2xl font-bold text-primary">Rovina</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded mx-auto"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            to="/admin/dashboard"
            className="flex items-center space-x-3 px-4 py-3 bg-primary text-white rounded-lg"
          >
            <Activity className="w-5 h-5" />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link
            to="/admin/dashboard/appointments"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <Calendar className="w-5 h-5" />
            {sidebarOpen && <span>Appointments</span>}
          </Link>

          <Link
            to="/admin/dashboard/doctors"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <Users className="w-5 h-5" />
            {sidebarOpen && <span>Doctors</span>}
          </Link>

          <Link
            to="/admin/dashboard/users"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <UserPlus className="w-5 h-5" />
            {sidebarOpen && <span>Users</span>}
          </Link>

          <Link
            to="/admin/dashboard/reports"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <BarChart3 className="w-5 h-5" />
            {sidebarOpen && <span>Reports</span>}
          </Link>

          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <Home className="w-5 h-5" />
            {sidebarOpen && <span>View Website</span>}
          </Link>
        </nav>

        {/* Logout */}
        {sidebarOpen && (
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-0 lg:ml-0">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome, {user.name || "Admin"}
            </h1>
            <p className="text-gray-600 mt-1">Here's your dashboard overview</p>
          </div>
          <button
            onClick={handleLogout}
            className="hidden lg:flex items-center gap-2 btn-outline"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading statistics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Appointments */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-semibold">
                  Total Appointments
                </h3>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalAppointments}
              </p>
              <p className="text-sm text-gray-500 mt-2">All time</p>
            </div>

            {/* Pending Appointments */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-semibold">Pending</h3>
                <div className="bg-warning/10 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-warning" />
                </div>
              </div>
              <p className="text-3xl font-bold text-warning">
                {stats.pendingAppointments}
              </p>
              <p className="text-sm text-gray-500 mt-2">Awaiting approval</p>
            </div>

            {/* Approved Appointments */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-semibold">Approved</h3>
                <div className="bg-success/10 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-success" />
                </div>
              </div>
              <p className="text-3xl font-bold text-success">
                {stats.approvedAppointments}
              </p>
              <p className="text-sm text-gray-500 mt-2">Confirmed</p>
            </div>

            {/* Today's Appointments */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-semibold">Today</h3>
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-secondary">
                {stats.todayAppointments}
              </p>
              <p className="text-sm text-gray-500 mt-2">Scheduled for today</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/dashboard/appointments"
              className="btn-primary text-center font-semibold py-3 rounded-lg hover:shadow-lg transition"
            >
              Manage Appointments
            </Link>
            <Link
              to="/admin/dashboard/doctors"
              className="btn-primary text-center font-semibold py-3 rounded-lg hover:shadow-lg transition"
            >
              Manage Doctors
            </Link>
            <Link
              to="/admin/dashboard/reports"
              className="btn-primary text-center font-semibold py-3 rounded-lg hover:shadow-lg transition"
            >
              View Reports
            </Link>
            <Link
              to="/"
              className="btn-secondary text-center font-semibold py-3 rounded-lg hover:shadow-lg transition"
            >
              View Website
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}


