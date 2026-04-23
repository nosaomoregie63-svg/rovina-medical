import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Activity,
  Calendar,
  Users,
  BarChart3,
  LogOut,
  Home,
  Loader,
  UserPlus,
} from "lucide-react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminReports() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [departmentStats, setDepartmentStats] = useState([]);
  const [doctorStats, setDoctorStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchReports();
  }, [navigate]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      // Fetch department statistics
      const deptResponse = await axios.get(
        `${API_URL}/appointments/reports/departments`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setDepartmentStats(deptResponse.data);

      // Fetch doctor workload statistics
      const doctorResponse = await axios.get(
        `${API_URL}/appointments/reports/doctors`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setDoctorStats(doctorResponse.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      } else {
        toast.error("Failed to load reports");
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col fixed h-screen z-40 lg:relative`}
      >
        <div
          className={`${
            sidebarOpen ? "p-6" : "p-4"
          } border-b flex items-center justify-between`}
        >
          {sidebarOpen && (
            <h1 className="text-2xl font-bold text-primary">Rovina</h1>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            to="/admin/dashboard"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
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
            className="flex items-center space-x-3 px-4 py-3 bg-primary text-white rounded-lg"
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
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-8">Reports & Analytics</h2>

        {loading ? (
          <div className="text-center py-12">
            <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading reports...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Department Statistics Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-900">
                  Popular Departments
                </h3>
                <p className="text-gray-600 mt-1">
                  Department-wise appointment statistics
                </p>
              </div>

              {departmentStats.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No department data available</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-gray-900">
                          Department
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-900">
                          Total
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-900">
                          Pending
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-900">
                          Approved
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-900">
                          Completed
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentStats.map((dept, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {dept._id || "Unknown"}
                          </td>
                          <td className="px-6 py-4 text-lg font-bold text-primary">
                            {dept.total || 0}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-warning/10 text-warning">
                              {dept.pending || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success">
                              {dept.approved || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                              {dept.completed || 0}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Doctor Workload Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-900">
                  Doctor Workload
                </h3>
                <p className="text-gray-600 mt-1">Appointments per doctor</p>
              </div>

              {doctorStats.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No doctor data available</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-gray-900">
                          Doctor Name
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-900">
                          Specialty
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-900">
                          Department
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-900">
                          Total Appointments
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-900">
                          Pending
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-900">
                          Completed
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctorStats.map((doctor, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            Dr. {doctor.doctorName || "Unknown"}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {doctor.specialty || "N/A"}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {doctor.department || "N/A"}
                          </td>
                          <td className="px-6 py-4 text-lg font-bold text-primary">
                            {doctor.totalAppointments || 0}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-warning/10 text-warning">
                              {doctor.pending || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success">
                              {doctor.completed || 0}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary to-blue-800 rounded-xl p-6 text-white">
                <h4 className="text-lg font-bold mb-4">Total Statistics</h4>
                <div className="space-y-2">
                  <p>
                    Total Departments:{" "}
                    <span className="font-bold">{departmentStats.length}</span>
                  </p>
                  <p>
                    Total Doctors:{" "}
                    <span className="font-bold">{doctorStats.length}</span>
                  </p>
                  <p>
                    Total Appointments:{" "}
                    <span className="font-bold">
                      {departmentStats.reduce(
                        (sum, d) => sum + (d.total || 0),
                        0,
                      )}
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-secondary to-orange-600 rounded-xl p-6 text-white">
                <h4 className="text-lg font-bold mb-4">Quick Metrics</h4>
                <div className="space-y-2">
                  <p>
                    Pending:{" "}
                    <span className="font-bold">
                      {departmentStats.reduce(
                        (sum, d) => sum + (d.pending || 0),
                        0,
                      )}
                    </span>
                  </p>
                  <p>
                    Approved:{" "}
                    <span className="font-bold">
                      {departmentStats.reduce(
                        (sum, d) => sum + (d.approved || 0),
                        0,
                      )}
                    </span>
                  </p>
                  <p>
                    Completed:{" "}
                    <span className="font-bold">
                      {departmentStats.reduce(
                        (sum, d) => sum + (d.completed || 0),
                        0,
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
