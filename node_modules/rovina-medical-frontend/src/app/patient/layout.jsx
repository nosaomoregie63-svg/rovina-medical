"use client";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { toast } from "react-toastify";

export default function PatientLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [patient, setPatient] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("patientToken");
    const patientData = localStorage.getItem("patientData");

    if (!token || !patientData) {
      navigate("/login");
      return;
    }

    setPatient(JSON.parse(patientData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("patientToken");
    localStorage.removeItem("patientData");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  if (!patient) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
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
              <Link
                to="/patient/dashboard"
                className="flex items-center space-x-2"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primaryLight rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <span className="font-bold text-xl text-primary hidden sm:block">
                  Patient Portal
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-primary transition">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
              </button>
              <div className="hidden md:block">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-900">
                  {patient.firstName} {patient.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside
          className={`${sidebarOpen ? "block" : "hidden"} lg:block w-64 bg-white shadow-lg min-h-screen`}
        >
          <div className="p-6">
            <div className="mb-8 pb-6 border-b">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primaryLight rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-3xl">
                  {patient.firstName.charAt(0)}
                  {patient.lastName.charAt(0)}
                </span>
              </div>
              <h2 className="text-center font-bold text-gray-900">
                {patient.firstName} {patient.lastName}
              </h2>
              <p className="text-center text-sm text-gray-600">
                {patient.email}
              </p>
            </div>

            <nav className="space-y-2">
              <Link
                to="/patient/dashboard"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive("/patient/dashboard") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/patient/appointments"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive("/patient/appointments") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Calendar className="w-5 h-5" />
                <span>My Appointments</span>
              </Link>

              <Link
                to="/patient/profile"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive("/patient/profile") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>My Profile</span>
              </Link>

              <Link
                to="/patient/settings"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive("/patient/settings") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>

            <div className="mt-8 pt-6 border-t">
              <Link
                to="/book-appointment"
                className="block w-full btn-secondary text-center py-3"
              >
                Book New Appointment
              </Link>
              <Link
                to="/"
                className="block w-full mt-2 text-center text-primary hover:underline text-sm"
              >
                Visit Main Website
              </Link>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
