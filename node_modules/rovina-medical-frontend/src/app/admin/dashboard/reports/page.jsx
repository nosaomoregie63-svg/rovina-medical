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
  TrendingUp,
  BarChart3,
  Layers,
  UserPlus,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Reports() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [departmentStats, setDepartmentStats] = useState([]);
  const [doctorWorkload, setDoctorWorkload] = useState([]);
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

    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const token = localStorage.getItem("adminToken");

      const [deptResponse, doctorResponse] = await Promise.all([
        axios
          .get(`${API_URL}/appointments/reports/departments`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .catch(() => ({ data: { data: [] } })),
        axios
          .get(`${API_URL}/appointments/reports/doctors`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .catch(() => ({ data: { data: [] } })),
      ]);

      setDepartmentStats(deptResponse.data?.data || deptResponse.data || []);
      setDoctorWorkload(doctorResponse.data?.data || doctorResponse.data || []);
    } catch (error) {
      toast.error("Failed to load reports");
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
                Reports & Analytics
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
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
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
                className="flex items-center space-x-3 px-4 py-3 bg-primary text-white rounded-lg"
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
          <h2 className="text-3xl font-bold mb-8">Reports & Analytics</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading reports...</p>
            </div>
          ) : (
            <>
              {/* Department Statistics */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold">Popular Departments</h3>
                </div>

                {departmentStats.length === 0 ? (
                  <p className="text-gray-600">
                    No department data available yet
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                            Department
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                            Total
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                            Pending
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                            Approved
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                            Completed
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {departmentStats.map((dept, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-semibold text-gray-900">
                              {dept._id}
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                                {dept.total}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-warning/10 text-warning px-3 py-1 rounded-full font-semibold">
                                {dept.pending}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-success/10 text-success px-3 py-1 rounded-full font-semibold">
                                {dept.approved}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold">
                                {dept.completed}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Doctor Workload */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="w-6 h-6 text-secondary" />
                  <h3 className="text-2xl font-bold">Doctor Workload</h3>
                </div>

                {doctorWorkload.length === 0 ? (
                  <p className="text-gray-600">
                    No doctor workload data available yet
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                            Doctor
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                            Specialty
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                            Department
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                            Total
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                            Pending
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                            Completed
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {doctorWorkload.map((doctor, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-semibold text-gray-900">
                              Dr. {doctor.doctorName || "N/A"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {doctor.specialty || "N/A"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {doctor.department || "N/A"}
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                                {doctor.totalAppointments}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-warning/10 text-warning px-3 py-1 rounded-full font-semibold">
                                {doctor.pending}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-success/10 text-success px-3 py-1 rounded-full font-semibold">
                                {doctor.completed}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
