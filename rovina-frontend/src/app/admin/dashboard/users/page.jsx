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
  Layers,
  Search,
  Filter,
  UserPlus,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Eye,
  CheckCircle,
  XCircle,
  BarChart3,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";

export default function UsersManagement() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    verified: 0,
    newThisMonth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/admin/login");
      return;
    }

    setUser(JSON.parse(userData));
    fetchPatients();
    fetchStats();
  }, []);

  useEffect(() => {
    filterPatients();
  }, [patients, searchTerm, statusFilter]);

  const fetchPatients = async () => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/admin/patients`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPatients(response.data.data);
    } catch (error) {
      toast.error("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/admin/patients/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(response.data.data);
    } catch (error) {
      console.error("Failed to load stats");
    }
  };

  const filterPatients = () => {
    let filtered = patients;

    if (searchTerm) {
      filtered = filtered.filter(
        (patient) =>
          `${patient.firstName} ${patient.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.phone.includes(searchTerm),
      );
    }

    if (statusFilter === "active") {
      filtered = filtered.filter((patient) => patient.isActive);
    } else if (statusFilter === "inactive") {
      filtered = filtered.filter((patient) => !patient.isActive);
    } else if (statusFilter === "verified") {
      filtered = filtered.filter((patient) => patient.isEmailVerified);
    } else if (statusFilter === "unverified") {
      filtered = filtered.filter((patient) => !patient.isEmailVerified);
    }

    setFilteredPatients(filtered);
  };

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setShowViewModal(true);
  };

  const handleToggleStatus = async (patientId) => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("token");

      await axios.patch(
        `${API_URL}/admin/patients/${patientId}/toggle-status`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success("Patient status updated successfully");
      fetchPatients();
      fetchStats();
    } catch (error) {
      toast.error("Failed to update patient status");
    }
  };

  const handleDelete = async (patientId) => {
    if (
      !confirm(
        "Are you sure you want to delete this patient? This action cannot be undone.",
      )
    )
      return;

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/admin/patients/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Patient deleted successfully");
      fetchPatients();
      fetchStats();
    } catch (error) {
      toast.error("Failed to delete patient");
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
                User Management
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
                className="flex items-center space-x-3 px-4 py-3 bg-primary text-white rounded-lg"
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <p className="text-gray-600 text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-600 text-sm mb-1">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-600 text-sm mb-1">Verified Users</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.verified}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <UserPlus className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-gray-600 text-sm mb-1">New This Month</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.newThisMonth}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                  <option value="verified">Verified Only</option>
                  <option value="unverified">Unverified Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading users...</p>
              </div>
            ) : filteredPatients.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No users found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Verified
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Joined
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                      <tr key={patient._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">
                            {patient.firstName} {patient.lastName}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {patient.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {patient.phone}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleStatus(patient._id)}
                            className="flex items-center space-x-2"
                          >
                            {patient.isActive ? (
                              <>
                                <ToggleRight className="w-8 h-8 text-green-600" />
                                <span className="text-sm font-medium text-green-700">
                                  Active
                                </span>
                              </>
                            ) : (
                              <>
                                <ToggleLeft className="w-8 h-8 text-gray-400" />
                                <span className="text-sm font-medium text-gray-600">
                                  Inactive
                                </span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          {patient.isEmailVerified ? (
                            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-md text-xs font-medium border border-green-200">
                              Verified
                            </span>
                          ) : (
                            <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-md text-xs font-medium border border-yellow-200">
                              Unverified
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {format(new Date(patient.createdAt), "MMM dd, yyyy")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(patient)}
                              className="p-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(patient._id)}
                              className="p-2 border border-red-300 text-red-700 rounded hover:bg-red-50 transition"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
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

      {/* View Patient Modal */}
      {showViewModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Patient Details
              </h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Personal Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">First Name</p>
                    <p className="font-semibold text-gray-900">
                      {selectedPatient.firstName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Name</p>
                    <p className="font-semibold text-gray-900">
                      {selectedPatient.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">
                      {selectedPatient.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">
                      {selectedPatient.phone}
                    </p>
                  </div>
                  {selectedPatient.dateOfBirth && (
                    <div>
                      <p className="text-gray-600">Date of Birth</p>
                      <p className="font-semibold text-gray-900">
                        {format(
                          new Date(selectedPatient.dateOfBirth),
                          "MMM dd, yyyy",
                        )}
                      </p>
                    </div>
                  )}
                  {selectedPatient.gender && (
                    <div>
                      <p className="text-gray-600">Gender</p>
                      <p className="font-semibold text-gray-900 capitalize">
                        {selectedPatient.gender}
                      </p>
                    </div>
                  )}
                  {selectedPatient.bloodGroup && (
                    <div>
                      <p className="text-gray-600">Blood Group</p>
                      <p className="font-semibold text-gray-900">
                        {selectedPatient.bloodGroup}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Address */}
              {selectedPatient.address && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Address
                  </h4>
                  <p className="text-sm text-gray-700">
                    {selectedPatient.address}
                  </p>
                </div>
              )}

              {/* Emergency Contact */}
              {selectedPatient.emergencyContact?.name && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Emergency Contact
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-semibold text-gray-900">
                        {selectedPatient.emergencyContact.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">
                        {selectedPatient.emergencyContact.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Relationship</p>
                      <p className="font-semibold text-gray-900">
                        {selectedPatient.emergencyContact.relationship}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Status */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Account Status
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Account Status</p>
                    <p
                      className={`font-semibold ${selectedPatient.isActive ? "text-green-700" : "text-red-700"}`}
                    >
                      {selectedPatient.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email Verification</p>
                    <p
                      className={`font-semibold ${selectedPatient.isEmailVerified ? "text-green-700" : "text-yellow-700"}`}
                    >
                      {selectedPatient.isEmailVerified
                        ? "Verified"
                        : "Unverified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Joined</p>
                    <p className="font-semibold text-gray-900">
                      {format(
                        new Date(selectedPatient.createdAt),
                        "MMM dd, yyyy",
                      )}
                    </p>
                  </div>
                  {selectedPatient.lastLogin && (
                    <div>
                      <p className="text-gray-600">Last Login</p>
                      <p className="font-semibold text-gray-900">
                        {format(
                          new Date(selectedPatient.lastLogin),
                          "MMM dd, yyyy HH:mm",
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
