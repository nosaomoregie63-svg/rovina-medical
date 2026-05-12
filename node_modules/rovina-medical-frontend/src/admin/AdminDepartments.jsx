import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Activity,
  Calendar,
  Users,
  LogOut,
  Menu,
  X,
  Plus,
  Trash,
  Layers,
  UserPlus,
  Home,
} from "lucide-react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function AdminDepartments() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");

    if (!token || !userData) {
      navigate("/admin/login");
      return;
    }

    setUser(JSON.parse(userData));
    fetchDepartments();
  }, [navigate]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API_URL}/departments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(res.data.data || []);
    } catch (err) {
      console.error("Failed to load departments", err);
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const addDepartment = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Department name is required");
      return;
    }

    try {
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
      console.error("Failed to add department", err);
      toast.error("Failed to add department");
    }
  };

  const deleteDepartment = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/departments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments((prev) => prev.filter((d) => d._id !== id));
      toast.success("Deleted");
    } catch (err) {
      console.error("Failed to delete department", err);
      toast.error("Failed to delete department");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  if (!user) return null;

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
            to="/admin/dashboard/departments"
            className="flex items-center space-x-3 px-4 py-3 bg-primary text-white rounded-lg"
          >
            <Layers className="w-5 h-5" />
            {sidebarOpen && <span>Departments</span>}
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
                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-800"
                  >
                    <Trash className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


