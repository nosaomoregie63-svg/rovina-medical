"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Users,
  Activity,
  LogOut,
  Menu,
  X,
  BarChart3,
  Layers,
  UserPlus,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    approvedAppointments: 0,
    todayAppointments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");

    if (
      !token ||
      !userData ||
      userData === "undefined" ||
      userData === "null"
    ) {
      router.push("/admin/login");
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Error parsing admin user data:", error);
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      router.push("/admin/login");
      return;
    }

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(`${API_URL}/appointments/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(response.data);
    } catch (error) {
      toast.error("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <h1 className="text-2xl font-bold text-primary">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700 hidden sm:block">
                Welcome, <strong>{user.name}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "block" : "hidden"} lg:block w-64 bg-white shadow-lg min-h-screen`}
        >
          <div className="p-6">
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primaryLight rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">R</span>
              </div>
              <h2 className="text-center font-bold text-gray-800">
                Rovina Medical
              </h2>
            </div>

            <nav className="space-y-2">
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-3 px-4 py-3 bg-primary text-white rounded-lg"
              >
                <Activity className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/admin/dashboard/appointments"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Calendar className="w-5 h-5" />
                <span>Appointments</span>
              </Link>

              <Link
                href="/admin/dashboard/doctors"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Users className="w-5 h-5" />
                <span>Doctors</span>
              </Link>

              <Link
                href="/admin/dashboard/departments"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Layers className="w-5 h-5" />
                <span>Departments</span>
              </Link>

              <Link
                href="/admin/dashboard/users"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <UserPlus className="w-5 h-5" />
                <span>Users</span>
              </Link>

              <Link
                href="/admin/dashboard/reports"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Reports</span>
              </Link>

              <Link
                href="/"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Users className="w-5 h-5" />
                <span>View Website</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">
                    Total Appointments
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {stats.totalAppointments}
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Pending</p>
                  <p className="text-3xl font-bold text-warning">
                    {stats.pendingAppointments}
                  </p>
                </div>
                <div className="bg-warning/10 p-3 rounded-full">
                  <Activity className="w-8 h-8 text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Approved</p>
                  <p className="text-3xl font-bold text-success">
                    {stats.approvedAppointments}
                  </p>
                </div>
                <div className="bg-success/10 p-3 rounded-full">
                  <Calendar className="w-8 h-8 text-success" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Today</p>
                  <p className="text-3xl font-bold text-secondary">
                    {stats.todayAppointments}
                  </p>
                </div>
                <div className="bg-secondary/10 p-3 rounded-full">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/dashboard/appointments"
                className="bg-primary text-white p-4 rounded-lg hover:bg-blue-900 transition text-center"
              >
                <Calendar className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Manage Appointments</p>
              </Link>

              <Link
                href="/admin/dashboard/appointments?filter=pending"
                className="bg-warning text-white p-4 rounded-lg hover:bg-yellow-600 transition text-center"
              >
                <Activity className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">View Pending</p>
              </Link>

              <Link
                href="/"
                className="bg-secondary text-white p-4 rounded-lg hover:bg-orange-600 transition text-center"
              >
                <Users className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">View Website</p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


