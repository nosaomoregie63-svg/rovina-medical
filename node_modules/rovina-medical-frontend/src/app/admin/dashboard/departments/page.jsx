"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Calendar,
  Users,
  Activity,
  LogOut,
  Menu,
  X,
  Plus,
  Trash,
  Layers,
  UserPlus,
} from "lucide-react";

export default function AdminDepartments() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
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

    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API_URL}/departments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const addDepartment = async (e) => {
    e.preventDefault();
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(
        `${API_URL}/departments`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setDepartments((prev) => [res.data.data, ...prev]);
      setName("");
      toast.success("Department added");
    } catch (err) {
      toast.error("Failed to add");
    }
  };

  const deleteDepartment = async (id) => {
    if (!confirm("Delete this department?")) return;
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/departments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments((prev) => prev.filter((d) => d._id !== id));
      toast.success("Deleted");
    } catch (err) {
      toast.error("Failed to delete");
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
              <h1 className="text-2xl font-bold text-primary">Departments</h1>
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
                className="flex items-center space-x-3 px-4 py-3 bg-primary text-white rounded-lg"
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Departments</h1>
            <form onSubmit={addDepartment} className="flex items-center gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New department"
                className="input-field"
              />
              <button className="btn-primary" type="submit">
                <Plus className="w-4 h-4 mr-2 inline" />
                Add
              </button>
            </form>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading departments...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {departments.map((d) => (
                <div
                  key={d._id}
                  className="p-4 bg-white rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{d.name}</h3>
                    <p className="text-sm text-gray-500">
                      {d.description || "—"}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => deleteDepartment(d._id)}
                      className="btn-danger"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


