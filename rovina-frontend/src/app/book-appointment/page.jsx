"use client";
import { useState, useEffect } from "react";
import { Calendar, User, Phone, Mail, MessageSquare } from "lucide-react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function BookAppointment() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctor");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    doctor: doctorId || "",
    preferredDate: new Date(),
    message: "",
    isLoggedIn: false,
  });

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    const patientToken = localStorage.getItem("patientToken");
    const patientData = localStorage.getItem("patient");

    if (patientToken && patientData) {
      const patient = JSON.parse(patientData);
      setFormData((prev) => ({
        ...prev,
        firstName: patient.firstName || "",
        lastName: patient.lastName || "",
        email: patient.email || "",
        phone: patient.phone || "",
        isLoggedIn: true,
      }));
    }
  }, []);

  const fetchDepartments = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.get(`${API_URL}/departments`);
      setDepartments(response.data.data.map((dept) => dept.name));
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      // Fallback to hardcoded if API fails
      setDepartments([
        "Medical Ultrasound",
        "Doppler Studies",
        "Echocardiography",
        "Laboratory Services",
        "Mammography",
        "Digital Radiography",
        "Electrocardiography (ECG)",
        "Hormonal Assay",
        "Ovulation Tracking",
        "Cancer Screening",
        "Corporate Health Screening",
        "Domestic Staff Screening",
        "Research And Training",
        "Other",
      ]);
    }
  };

  useEffect(() => {
    if (formData.department && formData.department !== "Other") {
      fetchDoctorsByDepartment(formData.department);
    } else {
      setDoctors([]);
      setFormData((prev) => ({ ...prev, doctor: "" }));
    }
  }, [formData.department]);

  const fetchDoctorsByDepartment = async (department) => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.get(
        `${API_URL}/doctors?department=${department}`,
      );
      setDoctors(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      setDoctors([]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      preferredDate: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";

      await axios.post(`${API_URL}/appointments`, formData);

      toast.success(
        "Appointment request submitted successfully! We will contact you within 24 hours.",
      );

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        doctor: "",
        preferredDate: new Date(),
        message: "",
      });
      setDoctors([]);
    } catch (error) {
      toast.error("Failed to submit appointment. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Book Appointment
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Schedule your visit with us. We'll confirm your appointment shortly.
          </p>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Request Appointment
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="John"
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
                      required
                      className="input-field"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="08012345678"
                    />
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Service/Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Choose a service...</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor Selection (Optional) */}
                {doctors.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Doctor (Optional)
                    </label>
                    <select
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">No preference</option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                          Dr. {doctor.firstName} {doctor.lastName} -{" "}
                          {doctor.specialty}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Leave blank if you have no preference
                    </p>
                  </div>
                )}

                {/* Preferred Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Preferred Date *
                  </label>
                  <DatePicker
                    selected={formData.preferredDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    className="input-field"
                    placeholderText="Select a date"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Additional Information (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="input-field resize-none"
                    placeholder="Any specific concerns or requirements..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-secondary text-lg py-4"
                >
                  {loading ? "Submitting..." : "Book Appointment"}
                </button>

                <p className="text-sm text-gray-600 text-center">
                  * We will call you to confirm your appointment within 24 hours
                </p>
              </form>
            </div>

            {/* Alternative Contact */}
            <div className="mt-10 bg-primary/10 rounded-xl p-6 text-center">
              <h3 className="font-bold text-lg mb-2">
                Prefer to call instead?
              </h3>
              <p className="text-gray-700 mb-4">
                Our team is ready to assist you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:07086986677"
                  className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Call: 07086986677
                </a>
                <a
                  href="tel:08033590577"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
                >
                  Call: 08033590577
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
