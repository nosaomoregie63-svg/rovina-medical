import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import Doctors from "./Doctors";
import BookAppointment from "./BookAppointment";
import PatientPortal from "./PatientPortal";
import TrackAppointments from "./TrackAppointments";
import Payment from "./Payment";
import PaymentCallback from "./PaymentCallback";
import Privacy from "./Privacy";
import Terms from "./Terms";

// Patient Auth Pages
import Register from "./app/register/page";
import Login from "./app/login/page";
import VerifyEmail from "./app/verify-email/page";
import ResendVerification from "./app/resend-verification/page";
import ForgotPassword from "./app/forgot-password/page";
import ResetPassword from "./app/reset-password/page";

// Patient Dashboard Pages
import PatientLayout from "./app/patient/layout";
import PatientDashboard from "./app/patient/dashboard/page";
import PatientAppointments from "./app/patient/appointments/page";
import PatientProfile from "./app/patient/profile/page";
import PatientSettings from "./app/patient/settings/page";

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import AdminAppointments from "./admin/AdminAppointments";
import AdminDoctors from "./admin/AdminDoctors";
import AdminUsers from "./admin/AdminUsers";
import AdminReports from "./admin/AdminReports";
import AdminDepartments from "./admin/AdminDepartments";

function AppRoutes() {
  const location = useLocation();
  const pathname = location.pathname;
  const isInPortal =
    pathname === "/patient" ||
    pathname.startsWith("/patient/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  return (
    <div className="flex flex-col min-h-screen">
      {!isInPortal && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/track-appointments" element={<TrackAppointments />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/callback" element={<PaymentCallback />} />

          {/* Patient Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/resend-verification" element={<ResendVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Patient Dashboard Routes */}
          <Route path="/patient" element={<PatientLayout />}>
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="settings" element={<PatientSettings />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route
            path="/admin/dashboard/appointments"
            element={<AdminAppointments />}
          />
          <Route path="/admin/dashboard/doctors" element={<AdminDoctors />} />
          <Route path="/admin/dashboard/users" element={<AdminUsers />} />
          <Route
            path="/admin/dashboard/departments"
            element={<AdminDepartments />}
          />
          <Route path="/admin/dashboard/reports" element={<AdminReports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isInPortal && <Footer />}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Sorry, we couldn’t find that page.
      </p>
      <Link
        to="/"
        className="inline-block rounded-full bg-primary px-6 py-3 text-white font-semibold hover:bg-primaryDark transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </Router>
  );
}
