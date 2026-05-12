import { useState, useEffect } from "react";
import { Mail, Phone, Award, Calendar, Users } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import RovinaBranding from "./components/RovinaBranding";

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
    setLoading(true);
    try {
      // Check if we should use mock data
      if (import.meta.env.VITE_USE_MOCK === "true") {
        console.log("✓ Using mock doctors data (VITE_USE_MOCK=true)");
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
        setDoctors(mockDoctors);
        setFilteredDoctors(mockDoctors);
        setLoading(false);
        return;
      }

      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      console.log(`📡 Fetching doctors from: ${apiUrl}/doctors`);

      const response = await axios.get(`${apiUrl}/doctors`)

      console.log("✓ Doctors fetched successfully from API");
      const fetchedDoctors = response.data?.data ?? response.data ?? [];
      const normalizedDoctors = Array.isArray(fetchedDoctors)
        ? fetchedDoctors
        : [];
      setDoctors(normalizedDoctors);
      setFilteredDoctors(normalizedDoctors);
    } catch (error) {
      console.error("❌ Failed to fetch doctors from API:", error.message);
      console.warn(
        "⚠️  Falling back to mock doctors. Check that:",
        "\n1. Backend server is running: npm run dev:backend",
        "\n2. VITE_USE_MOCK=false in .env.local",
        "\n3. API is accessible at http://localhost:5001/api/doctors",
      );
      setDoctors([]);
      setFilteredDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <RovinaBranding />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Users className="w-5 h-5 text-secondary" />
              <span className="text-sm font-semibold">
                Expert Medical Professionals
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Medical Team
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Meet our experienced healthcare professionals dedicated to your
              wellbeing
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="#F9FAFB"
            />
          </svg>
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
                      <img
                        src={doctor.photo}
                        alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                        className="w-full h-full object-cover"
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
                      to={`/book-appointment?doctor=${doctor._id}`}
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
          <Link to="/contact" className="btn-primary inline-block">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}


