import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Calendar,
  Users,
  UserPlus,
  BarChart3,
  LogOut,
  Home,
  Loader,
} from "lucide-react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function AdminAppointments() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchAppointments();
  }, [navigate]);

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchTerm, statusFilter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      } else {
        toast.error("Failed to load appointments");
      }
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = appointments;

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((apt) => apt.status === statusFilter);
    }

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (apt) =>
          apt.firstName.toLowerCase().includes(term) ||
          apt.lastName.toLowerCase().includes(term) ||
          apt.email.toLowerCase().includes(term) ||
          apt.phone.includes(term),
      );
    }

    setFilteredAppointments(filtered);
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      setUpdating(appointmentId);
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${API_URL}/appointments/${appointmentId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Update local state
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === appointmentId ? { ...apt, status: newStatus } : apt,
        ),
      );

      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-danger" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-primary" />;
      default:
        return <Clock className="w-5 h-5 text-warning" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-warning/10 text-warning",
      approved: "bg-success/10 text-success",
      cancelled: "bg-danger/10 text-danger",
      completed: "bg-primary/10 text-primary",
    };
    return styles[status] || styles.pending;
  };

  // Calculate stats
  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    approved: appointments.filter((a) => a.status === "approved").length,
    completed: appointments.filter((a) => a.status === "completed").length,
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
          {sidebarOpen ? (
            <h1 className="text-2xl font-bold text-primary">Rovina</h1>
          ) : null}
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
            className="flex items-center space-x-3 px-4 py-3 bg-primary text-white rounded-lg"
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
        <h2 className="text-3xl font-bold mb-8">Manage Appointments</h2>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-2" />
                Search by name, email, or phone
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field w-full"
                placeholder="Search..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                Filter by status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field w-full"
              >
                <option value="all">All Appointments</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-gray-600 text-sm">Total Appointments</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-2xl font-bold text-warning">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-gray-600 text-sm">Approved</p>
            <p className="text-2xl font-bold text-success">{stats.approved}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-2xl font-bold text-primary">{stats.completed}</p>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
              <p>Loading appointments...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "all"
                  ? "No appointments found matching your filters"
                  : "No appointments yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-900">
                      Patient Name
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-900">
                      Contact
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-900">
                      Department
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {appointment.firstName} {appointment.lastName}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-xs">
                        <div>{appointment.email}</div>
                        <div>+{appointment.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-semibold">
                        {appointment.department}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(appointment.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                            appointment.status,
                          )}`}
                        >
                          {getStatusIcon(appointment.status)}
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {appointment.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateAppointmentStatus(
                                    appointment._id,
                                    "approved",
                                  )
                                }
                                disabled={updating === appointment._id}
                                className="px-3 py-1 bg-success text-white rounded text-xs font-semibold hover:bg-green-700 transition disabled:opacity-50"
                              >
                                {updating === appointment._id
                                  ? "Updating..."
                                  : "Approve"}
                              </button>
                              <button
                                onClick={() =>
                                  updateAppointmentStatus(
                                    appointment._id,
                                    "cancelled",
                                  )
                                }
                                disabled={updating === appointment._id}
                                className="px-3 py-1 bg-danger text-white rounded text-xs font-semibold hover:bg-red-700 transition disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {appointment.status === "approved" && (
                            <button
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment._id,
                                  "completed",
                                )
                              }
                              disabled={updating === appointment._id}
                              className="px-3 py-1 bg-primary text-white rounded text-xs font-semibold hover:bg-blue-900 transition disabled:opacity-50"
                            >
                              {updating === appointment._id
                                ? "Updating..."
                                : "Complete"}
                            </button>
                          )}
                          {["pending", "approved"].includes(
                            appointment.status,
                          ) && (
                            <button
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment._id,
                                  "cancelled",
                                )
                              }
                              disabled={updating === appointment._id}
                              className="px-3 py-1 bg-danger text-white rounded text-xs font-semibold hover:bg-red-700 transition disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


