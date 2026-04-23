"use client";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Heart,
  Activity,
  TrendingUp,
  FileText,
  Phone,
  MapPin,
  CreditCard,
  Bell,
  Award,
  Stethoscope,
  DollarSign,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  format,
  isToday,
  isTomorrow,
  isPast,
  differenceInDays,
} from "date-fns";

export default function PatientDashboard() {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    upcoming: 0,
    completed: 0,
    cancelled: 0,
    totalVisits: 0,
  });
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const patientData = localStorage.getItem("patientData");
    if (patientData) {
      setPatient(JSON.parse(patientData));
    }
    fetchDashboardData();
    setGreetingMessage();
  }, []);

  const setGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  };

  const fetchDashboardData = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("patientToken");

      // fetch appointments using patient email since mock lacks my-appointments
      const stored = localStorage.getItem("patientData");
      const email = stored ? JSON.parse(stored).email : "";
      const response = await axios.get(
        `${API_URL}/appointments/patient/${encodeURIComponent(email)}`,
      );

      const allAppointments = response.data.data || [];

      // Calculate comprehensive stats
      const now = new Date();
      const upcoming = allAppointments.filter(
        (apt) =>
          ["pending", "approved"].includes(apt.status) &&
          new Date(apt.preferredDate) >= now,
      );
      const completed = allAppointments.filter(
        (apt) => apt.status === "completed",
      );
      const cancelled = allAppointments.filter(
        (apt) => apt.status === "cancelled",
      );

      setStats({
        upcoming: upcoming.length,
        completed: completed.length,
        cancelled: cancelled.length,
        totalVisits: allAppointments.length,
      });

      // Get next 3 upcoming appointments
      const upcomingAppointments = upcoming
        .sort((a, b) => new Date(a.preferredDate) - new Date(b.preferredDate))
        .slice(0, 3);

      setAppointments(upcomingAppointments);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
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
      pending: "bg-warning/10 text-warning border border-warning/20",
      approved: "bg-success/10 text-success border border-success/20",
      cancelled: "bg-danger/10 text-danger border border-danger/20",
      completed: "bg-primary/10 text-primary border border-primary/20",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentBadge = (paymentStatus) => {
    if (!paymentStatus) return null;
    const styles = {
      paid: "bg-success/10 text-success border border-success/20",
      unpaid: "bg-danger/10 text-danger border border-danger/20",
      refunded: "bg-warning/10 text-warning border border-warning/20",
    };
    return (
      <span
        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${styles[paymentStatus]}`}
      >
        {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
      </span>
    );
  };

  const getDateLabel = (date) => {
    const appointmentDate = new Date(date);
    if (isToday(appointmentDate)) return "Today";
    if (isTomorrow(appointmentDate)) return "Tomorrow";
    const daysUntil = differenceInDays(appointmentDate, new Date());
    if (daysUntil > 0 && daysUntil <= 7) return `In ${daysUntil} days`;
    return format(appointmentDate, "MMM dd, yyyy");
  };

  const healthTips = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Stay Hydrated",
      tip: "Drink at least 8 glasses of water daily for optimal health.",
    },
    {
      icon: <Activity className="w-6 h-6 text-green-500" />,
      title: "Regular Exercise",
      tip: "30 minutes of physical activity daily keeps you healthy.",
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-blue-500" />,
      title: "Regular Checkups",
      tip: "Schedule annual health screenings for early detection.",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary via-blue-700 to-primaryLight rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-lg mb-2">{greeting},</p>
            <h1 className="text-4xl font-bold mb-2">
              {patient?.firstName} {patient?.lastName}
            </h1>
            <p className="text-blue-100">Welcome to your health dashboard</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <Calendar className="w-16 h-16 text-white mb-2" />
              <p className="text-sm text-blue-100">
                {format(new Date(), "EEEE")}
              </p>
              <p className="text-2xl font-bold">
                {format(new Date(), "MMM dd")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-warning hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-warning/10 p-3 rounded-lg">
              <Clock className="w-8 h-8 text-warning" />
            </div>
            <TrendingUp className="w-5 h-5 text-warning" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Upcoming</p>
          <p className="text-3xl font-bold text-gray-900">{stats.upcoming}</p>
          <p className="text-xs text-gray-500 mt-2">Scheduled visits</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-success hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-success/10 p-3 rounded-lg">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <Award className="w-5 h-5 text-success" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Completed</p>
          <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
          <p className="text-xs text-gray-500 mt-2">Total visits completed</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Visits</p>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalVisits}
          </p>
          <p className="text-xs text-gray-500 mt-2">All time appointments</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-secondary hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-secondary/10 p-3 rounded-lg">
              <Heart className="w-8 h-8 text-secondary" />
            </div>
            <Stethoscope className="w-5 h-5 text-secondary" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Health Score</p>
          <p className="text-3xl font-bold text-gray-900">Good</p>
          <p className="text-xs text-gray-500 mt-2">Based on visit history</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
            </div>
            <Link
              to="/patient/appointments"
              className="text-primary hover:text-secondary font-semibold text-sm flex items-center"
            >
              View All →
            </Link>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">
                No upcoming appointments
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Book your next appointment to stay healthy
              </p>
              <Link
                to="/book-appointment"
                className="btn-secondary inline-block"
              >
                Book Appointment
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="border-2 border-gray-100 hover:border-primary rounded-xl p-5 transition group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(appointment.status)}
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition">
                          {appointment.department}
                        </h3>
                        {appointment.doctor && (
                          <p className="text-sm text-gray-600">
                            Dr. {appointment.doctor.firstName}{" "}
                            {appointment.doctor.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(appointment.status)}
                      {getPaymentBadge(appointment.paymentStatus)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-gray-600">
                          {getDateLabel(appointment.preferredDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-gray-600">Time</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {appointment.preferredTime || "Morning"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {appointment.paymentStatus === "unpaid" &&
                    appointment.paymentAmount > 0 && (
                      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-5 h-5 text-yellow-600" />
                          <span className="text-sm font-semibold text-yellow-900">
                            Payment Required: ₦
                            {appointment.paymentAmount.toLocaleString()}
                          </span>
                        </div>
                        <Link
                          to={`/payment?appointment=${appointment._id}`}
                          className="bg-success text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                        >
                          Pay Now
                        </Link>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Sidebar - Takes 1 column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <div className="bg-secondary/10 p-2 rounded-lg mr-3">
                <Activity className="w-5 h-5 text-secondary" />
              </div>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/book-appointment"
                className="block bg-gradient-to-r from-secondary to-orange-600 text-white rounded-lg p-4 hover:shadow-lg transition text-center group"
              >
                <Calendar className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition" />
                <p className="font-semibold">Book Appointment</p>
              </Link>
              <Link
                to="/patient/appointments"
                className="block bg-gradient-to-r from-primary to-blue-800 text-white rounded-lg p-4 hover:shadow-lg transition text-center group"
              >
                <FileText className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition" />
                <p className="font-semibold">View All Appointments</p>
              </Link>
              <Link
                to="/patient/profile"
                className="block bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg p-4 hover:shadow-lg transition text-center group"
              >
                <Activity className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition" />
                <p className="font-semibold">Update Profile</p>
              </Link>
            </div>
          </div>
          {/* Health Tips */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              Health Tips
            </h3>
            <div className="space-y-4">
              {healthTips.map((tip, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    {tip.icon}
                    <div>
                      <p className="font-semibold text-sm text-gray-900 mb-1">
                        {tip.title}
                      </p>
                      <p className="text-xs text-gray-600">{tip.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Emergency Contact */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center text-red-900">
              <Phone className="w-5 h-5 mr-2" />
              Emergency Contact
            </h3>
            <p className="text-sm text-red-800 mb-3">24/7 Emergency Hotline</p>
            <a
              href="tel:07086986677"
              className="block bg-red-600 text-white text-center py-3 rounded-lg hover:bg-red-700 transition font-bold text-lg"
            >
              📞 07086986677
            </a>
            <div className="mt-4 space-y-2 text-xs text-red-800">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Roving House, Satellite Town</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Announcements / News */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Bell className="w-6 h-6 text-primary" />
          <h3 className="font-bold text-lg text-gray-900">
            Latest Announcements
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm font-semibold text-primary mb-2">
              🎉 New Service Available
            </p>
            <p className="text-xs text-gray-600">
              We now offer telemedicine consultations. Book yours today!
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm font-semibold text-primary mb-2">
              ⏰ Extended Hours
            </p>
            <p className="text-xs text-gray-600">
              Our Abule Ado branch now opens until 8 PM on weekdays.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm font-semibold text-primary mb-2">
              💉 Free Health Screening
            </p>
            <p className="text-xs text-gray-600">
              Book your free annual health screening this month!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
