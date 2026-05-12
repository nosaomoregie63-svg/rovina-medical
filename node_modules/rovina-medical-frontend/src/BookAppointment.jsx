import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, Users, Phone, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RovinaBranding from "./components/RovinaBranding";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function BookAppointment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctor");

  const [departments] = useState([
    "General",
    "Pediatrics",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Radiology",
    "Surgery",
    "Dermatology",
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    doctor: doctorId || "",
    date: new Date(),
    message: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch doctors when department changes
  useEffect(() => {
    if (formData.department) {
      fetchDoctors();
    }
  }, [formData.department]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      // Check if we should use mock data
      if (import.meta.env.VITE_USE_MOCK === "true") {
        console.log("Using mock doctors data for booking");
        const mockDoctors = [
          {
            _id: "d1",
            firstName: "Amina",
            lastName: "Okafor",
            department: "General",
          },
          {
            _id: "d2",
            firstName: "Emeka",
            lastName: "Chukwu",
            department: "Cardiology",
          },
          {
            _id: "d3",
            firstName: "Ngozi",
            lastName: "Ibe",
            department: "Pediatrics",
          },
          {
            _id: "d4",
            firstName: "Samuel",
            lastName: "Osei",
            department: "Radiology",
          },
        ];
        const filteredDoctors = formData.department
          ? mockDoctors.filter(
              (doctor) => doctor.department === formData.department,
            )
          : mockDoctors;
        setDoctors(filteredDoctors);
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}/doctors?department=${formData.department}`,
      );
      setDoctors(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    // Ensure only future dates are allowed (at least today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      toast.warning("Please select today or a future date");
      return;
    }

    setFormData((prev) => ({ ...prev, date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.department ||
      !formData.date
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const appointmentData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        doctor: formData.doctor || null,
        date: formData.date,
        message: formData.message,
      };

      const response = await axios.post(
        `${API_URL}/appointments`,
        appointmentData,
      );

      toast.success("Appointment booked successfully!");
      navigate(`/patient-portal?email=${formData.email}`);
    } catch (error) {
      console.error("Error booking appointment:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Failed to book appointment. Please try again.";
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <RovinaBranding />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-primary text-white rounded-full p-4 mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Book an Appointment
            </h1>
            <p className="text-lg text-gray-600">
              Schedule your visit with our expert doctors
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="example@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="08012345678"
                    required
                  />
                </div>
              </div>

              {/* Department & Doctor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Doctor (Optional)
                  </label>
                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className="input-field"
                    disabled={loading || !formData.department}
                  >
                    <option value="">Any available doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        Dr. {doc.firstName} {doc.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Picker */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  className="input-field w-full"
                  dateFormat="MMMM dd, yyyy"
                  placeholderText="Select a date"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field resize-none"
                  rows="4"
                  placeholder="Any specific concerns or medical history we should know about?"
                ></textarea>
              </div>

              {/* Notice */}
              <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    Our team will confirm your appointment within 24 hours.
                    Please ensure your contact details are correct.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-secondary flex-1"
                >
                  {submitting ? "Booking..." : "Book Appointment"}
                </button>
              </div>
            </form>
          </div>

          {/* Phone Contact Alternative */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Prefer to call?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="tel:+2347012345678"
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition"
              >
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-gray-700 font-semibold">
                  +234 (701) 2345678
                </span>
              </a>
              <a
                href="tel:+2347098765432"
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition"
              >
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-gray-700 font-semibold">
                  +234 (709) 8765432
                </span>
              </a>
              <a
                href="tel:+2348052123456"
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition"
              >
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-gray-700 font-semibold">
                  +234 (805) 2123456
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
