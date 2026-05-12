"use client";
import { useState, useEffect } from "react";
import { Mail, Phone, Award, Calendar } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const defaultDepartments = [
    "Medical Ultrasound",
    "Echocardiography",
    "Laboratory Services",
    "Mammography",
    "Corporate Health Screening",
    "Digital Radiography",
  ];

  const departments = doctors.length
    ? Array.from(
        new Set(doctors.map((doc) => doc.department).filter(Boolean)),
      ).sort()
    : defaultDepartments;

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDepartment === "all") {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(
        doctors.filter((doc) => doc.department === selectedDepartment),
      );
    }
  }, [selectedDepartment, doctors]);

  const fetchDoctors = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const response = await axios.get(`${API_URL}/doctors`);
      const fetchedDoctors = response.data?.data ?? response.data ?? [];
      const normalizedDoctors = Array.isArray(fetchedDoctors)
        ? fetchedDoctors
        : [];
      setDoctors(normalizedDoctors);
      setFilteredDoctors(normalizedDoctors);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      setDoctors([]);
      setFilteredDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Medical Team
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Meet our experienced and dedicated healthcare professionals
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedDepartment("all")}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedDepartment === "all"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Doctors
            </button>
            {departments.map((dept, index) => (
              <button
                key={index}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  selectedDepartment === dept
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading doctors...</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No doctors found in this department
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
                >
                  {/* Doctor Image */}
                  <div className="relative h-64 bg-gradient-to-br from-primary to-primaryLight">
                    {doctor.photo && doctor.photo !== "default-doctor.jpg" ? (
                      <Image
                        src={doctor.photo}
                        alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-5xl font-bold text-primary">
                            {doctor.firstName.charAt(0)}
                            {doctor.lastName.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Doctor Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-2xl text-gray-900 mb-1">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </h3>
                    <p className="text-secondary font-semibold mb-2">
                      {doctor.specialty}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      {doctor.department}
                    </p>

                    {/* Qualification & Experience */}
                    {doctor.qualification && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-700">
                          {doctor.qualification}
                        </span>
                      </div>
                    )}
                    {doctor.experience && (
                      <div className="flex items-center space-x-2 mb-4">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-700">
                          {doctor.experience} experience
                        </span>
                      </div>
                    )}

                    {/* Bio */}
                    {doctor.bio && (
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {doctor.bio}
                      </p>
                    )}

                    {/* Contact */}
                    <div className="border-t pt-4 space-y-2">
                      {doctor.phone && (
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <Phone className="w-4 h-4 text-primary" />
                          <span>{doctor.phone}</span>
                        </div>
                      )}
                      {doctor.email && (
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <Mail className="w-4 h-4 text-primary" />
                          <span>{doctor.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Availability */}
                    {doctor.availability && doctor.availability.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-600 mb-2">
                          Available:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {doctor.availability.map((day, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Book Appointment Button */}
                    <Link
                      href={`/book-appointment?doctor=${doctor._id}`}
                      className="mt-4 block text-center bg-secondary text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can't find the right specialist?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us and we'll help you find the perfect doctor for your needs
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}


