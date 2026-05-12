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
  Search,
  Filter,
  Check,
  XCircle,
  BarChart3,
  Layers,
  UserPlus,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";

export default function AppointmentsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchTerm, statusFilter]);

  const fetchAppointments = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(`${API_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppointments(response.data.data || response.data || []);
    } catch (error) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = appointments;

    if (searchTerm) {
      filtered = filtered.filter(
        (apt) =>
          apt.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.phone.includes(searchTerm),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((apt) => apt.status === statusFilter);
    }

    setFilteredAppointments(filtered);
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    if (
      !confirm(
        `Are you sure you want to ${newStatus} this appointment? The patient will be notified via email and SMS.`,
      )
    ) {
      return;
    }

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const token = localStorage.getItem("adminToken");

      await axios.patch(
        `${API_URL}/appointments/${appointmentId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(
        `Appointment ${newStatus} successfully! Patient has been notified.`,
      );
      fetchAppointments();
    } catch (error) {
      toast.error("Failed to update appointment status");
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-warning/10 text-warning",
      approved: "bg-success/10 text-success",
      cancelled: "bg-danger/10 text-danger",
      completed: "bg-primary/10 text-primary",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
              <h1 className="text-2xl font-bold text-primary">Appointments</h1>
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
                className="flex items-center space-x-3 px-4 py-3 bg-primary text-white rounded-lg"
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
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="relative">
                <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading appointments...</p>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No appointments found</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Patient
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Department
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {appointment.firstName} {appointment.lastName}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="text-gray-900">{appointment.phone}</p>
                            <p className="text-gray-500">{appointment.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">
                            {appointment.department}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">
                            {format(
                              new Date(appointment.preferredDate),
                              "MMM dd, yyyy",
                            )}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(appointment.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            {appointment.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(
                                      appointment._id,
                                      "approved",
                                    )
                                  }
                                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-xs font-semibold"
                                >
                                  ✓ Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(
                                      appointment._id,
                                      "cancelled",
                                    )
                                  }
                                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-xs font-semibold"
                                >
                                  ✗ Reject
                                </button>
                              </>
                            )}
                            {appointment.status === "approved" && (
                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    appointment._id,
                                    "completed",
                                  )
                                }
                                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs font-semibold"
                              >
                                ✓ Complete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 bg-white rounded-xl shadow-md p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p className="text-2xl font-bold text-primary">
                  {filteredAppointments.length}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-warning">
                  {
                    filteredAppointments.filter((a) => a.status === "pending")
                      .length
                  }
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-2xl font-bold text-success">
                  {
                    filteredAppointments.filter((a) => a.status === "approved")
                      .length
                  }
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-primary">
                  {
                    filteredAppointments.filter((a) => a.status === "completed")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
