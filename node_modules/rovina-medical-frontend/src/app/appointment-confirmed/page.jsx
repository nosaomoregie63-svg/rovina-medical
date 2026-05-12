"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Download,
  ArrowLeft,
  Home,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import RovinaBranding from "@/components/RovinaBranding";

export default function AppointmentConfirmed() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    // Get appointment details from URL params
    const details = {
      id: searchParams.get("id"),
      department: searchParams.get("department"),
      date: searchParams.get("date"),
      time: searchParams.get("time"),
      name: searchParams.get("name"),
      email: searchParams.get("email"),
      phone: searchParams.get("phone"),
    };

    if (!details.id) {
      router.push("/book-appointment");
      return;
    }

    setAppointmentDetails(details);
  }, [searchParams, router]);

  if (!appointmentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const addToCalendar = () => {
    const event = {
      title: `Rovina Medical - ${appointmentDetails.department}`,
      description: `Appointment at Rovina Medical Diagnostic Services`,
      location:
        "Roving House, 3 Mobil Road, Ile Epo Bus Stop, Satellite Town, Lagos",
      start: new Date(`${appointmentDetails.date}T${appointmentDetails.time}`),
      duration: [1, "hour"],
    };

    // Create Google Calendar URL
    const startTime = new Date(
      `${appointmentDetails.date}T${appointmentDetails.time}`,
    );
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour later

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startTime.toISOString().replace(/-|:|\.\d\d\d/g, "")}/${endTime.toISOString().replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  const printConfirmation = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <RovinaBranding />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-6 animate-pulse">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Appointment Confirmed!
          </h1>
          <p className="text-xl text-green-100">
            We've received your appointment request and sent confirmation to
            your email and phone.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Appointment Details Card */}
            <div className="bg-white border-2 border-green-200 rounded-xl shadow-xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-primary to-blue-800 text-white p-6">
                <h2 className="text-2xl font-bold mb-2">Appointment Details</h2>
                <p className="text-blue-100">
                  Appointment ID:{" "}
                  <span className="font-mono font-bold">
                    {appointmentDetails.id}
                  </span>
                </p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Patient Name</p>
                      <p className="text-lg font-bold text-gray-900">
                        {appointmentDetails.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Department</p>
                      <p className="text-lg font-bold text-gray-900">
                        {appointmentDetails.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Appointment Date
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatDate(appointmentDetails.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Time</p>
                      <p className="text-lg font-bold text-gray-900">
                        {appointmentDetails.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="text-lg font-bold text-gray-900 break-all">
                        {appointmentDetails.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <p className="text-lg font-bold text-gray-900">
                        {appointmentDetails.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <span className="font-bold text-yellow-800">
                      Status: PENDING APPROVAL
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-2">
                    Our team will review your appointment within 24 hours.
                    You'll receive confirmation via email and SMS.
                  </p>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                What Happens Next?
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Review & Approval
                    </h4>
                    <p className="text-gray-600">
                      Our medical team will review your appointment request
                      within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Confirmation Notification
                    </h4>
                    <p className="text-gray-600">
                      You'll receive email and SMS confirmation once your
                      appointment is approved.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Reminder Alerts
                    </h4>
                    <p className="text-gray-600">
                      We'll send you a reminder 24 hours before your
                      appointment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Visit Our Facility
                    </h4>
                    <p className="text-gray-600">
                      Arrive 15 minutes early with your ID and relevant medical
                      documents.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📋 What to Bring
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>
                    Valid government-issued ID (Driver's License, National ID,
                    or Passport)
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>
                    Previous medical records or test results (if available)
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>List of current medications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Insurance card (if applicable)</span>
                </li>
              </ul>
            </div>

            {/* Location Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-6 h-6 text-red-600 mr-2" />
                Our Location
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>
                  Rovina Medical Diagnostic Services - Head Office
                </strong>
                <br />
                Roving House, 3 Mobil Road, Ile Epo Bus Stop
                <br />
                Satellite Town, Lagos, Nigeria
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:07086986677"
                  className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call: 070 8698 6677</span>
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=3+Mobil+Road+Ile+Epo+Bus+Stop+Satellite+Town+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={addToCalendar}
                  className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Add to Calendar</span>
                </button>

                <button
                  onClick={printConfirmation}
                  className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-4 rounded-lg hover:bg-gray-700 transition font-semibold"
                >
                  <Download className="w-5 h-5" />
                  <span>Print Confirmation</span>
                </button>

                <a
                  href={`https://wa.me/2347086986677?text=Hi, I just booked appointment ${appointmentDetails.id}. I have a question.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>

              <Link
                href={`/payment?id=${appointmentDetails.id}&firstName=${encodeURIComponent(appointmentDetails.name?.split(" ")[0] || "")}&lastName=${encodeURIComponent(appointmentDetails.name?.split(" ").slice(1).join(" ") || "")}&department=${encodeURIComponent(appointmentDetails.department)}&date=${appointmentDetails.date}&time=${appointmentDetails.time}&email=${encodeURIComponent(appointmentDetails.email)}&phone=${encodeURIComponent(appointmentDetails.phone)}`}
                className="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                <CreditCard className="w-5 h-5" />
                <span>Proceed to Payment</span>
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition font-semibold"
              >
                <User className="w-5 h-5" />
                <span>Go to Patient Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .container * {
            visibility: visible;
          }
          .container {
            position: absolute;
            left: 0;
            top: 0;
          }
          button,
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
