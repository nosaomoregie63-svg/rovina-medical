"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Calendar,
  Clock,
  User,
  Printer,
  Home,
} from "lucide-react";

export default function AppointmentConfirmed() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    const details = {
      appointmentId: searchParams.get("id") || "APT-" + Date.now(),
      department: searchParams.get("department") || "General Consultation",
      date: searchParams.get("date") || new Date().toISOString(),
      time: searchParams.get("time") || "10:00 AM",
      patientName: searchParams.get("name") || "Patient",
      email: searchParams.get("email") || "",
      phone: searchParams.get("phone") || "",
    };
    setAppointmentDetails(details);
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  if (!appointmentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 text-center mb-8 print:shadow-none">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Appointment Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you, <strong>{appointmentDetails.patientName}</strong>! Your
              appointment has been successfully booked.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Appointment Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Appointment ID</p>
                    <p className="font-semibold text-gray-900">
                      {appointmentDetails.appointmentId}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <User className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-semibold text-gray-900">
                      {appointmentDetails.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(appointmentDetails.date).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-semibold text-gray-900">
                      {appointmentDetails.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-bold text-gray-900 mb-3">
                Important Information
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • A confirmation email has been sent to{" "}
                  <strong>{appointmentDetails.email}</strong>
                </li>
                <li>• Please arrive 15 minutes before your scheduled time</li>
                <li>• Bring a valid ID and any relevant medical documents</li>
                <li>
                  • If you need to reschedule, please contact us at least 24
                  hours in advance
                </li>
                <li>
                  • For emergencies, call our 24/7 hotline:{" "}
                  <strong>070 8698 6677</strong>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                <Printer className="w-5 h-5" />
                <span>Print Confirmation</span>
              </button>

              <Link
                href="/"
                className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>

              {appointmentDetails.email && (
                <Link
                  href="/login"
                  className="flex items-center justify-center space-x-2 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition font-semibold"
                >
                  <User className="w-5 h-5" />
                  <span>View in Portal</span>
                </Link>
              )}
            </div>
          </div>

          <div className="text-center text-gray-600 print:hidden">
            <p className="mb-2">Need help? Contact us:</p>
            <p className="font-semibold text-gray-900">
              <a
                href="tel:07086986677"
                className="text-primary hover:underline"
              >
                070 8698 6677
              </a>
              {" | "}
              <a
                href="mailto:rovinamedicaldiagnostic@gmail.com"
                className="text-primary hover:underline"
              >
                rovinamedicaldiagnostic@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
