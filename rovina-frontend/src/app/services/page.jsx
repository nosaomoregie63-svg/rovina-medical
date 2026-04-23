"use client";
import { useEffect, useState } from "react";
import {
  Microscope,
  Heart,
  Activity,
  Clipboard,
  Scan,
  Droplet,
  Zap,
  TestTube,
  Users,
  Stethoscope,
  FileText,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.get(`${API_URL}/departments`);
      setServices(
        response.data.data.map((dept) => ({
          icon: getIconForDepartment(dept.name),
          title: dept.name,
          description: dept.description,
        })),
      );
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIconForDepartment = (name) => {
    const iconMap = {
      "Medical Ultrasound": <Scan className="w-10 h-10" />,
      "Doppler Studies": <Activity className="w-10 h-10" />,
      Echocardiography: <Heart className="w-10 h-10" />,
      "Laboratory Services": <TestTube className="w-10 h-10" />,
      Mammography: <Scan className="w-10 h-10" />,
      "Recruitment Screening": <Clipboard className="w-10 h-10" />,
      "Electrocardiography (ECG)": <Zap className="w-10 h-10" />,
      "Digital Radiography": <Scan className="w-10 h-10" />,
      "Hormonal Assay": <Droplet className="w-10 h-10" />,
      "Ovulation Tracking": <Activity className="w-10 h-10" />,
      "Cancer Screening": <Microscope className="w-10 h-10" />,
      "Corporate Health Screening": <Users className="w-10 h-10" />,
      "Domestic Staff Screening": <Stethoscope className="w-10 h-10" />,
      "Research And Training": <GraduationCap className="w-10 h-10" />,
    };
    return iconMap[name] || <Stethoscope className="w-10 h-10" />;
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive medical diagnostic services delivered with precision,
            accuracy, and compassionate care
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="text-center col-span-3 py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading services...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center col-span-3 py-12">
                <p className="text-gray-600">No services available yet.</p>
              </div>
            ) : (
              services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-100 hover:border-primary rounded-xl p-6 transition hover:shadow-lg group"
                >
                  <div className="text-primary group-hover:text-secondary transition mb-4">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book Your Appointment?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Experience professional diagnostic services with our expert team.
            Book your appointment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-appointment"
              className="btn-secondary inline-block"
            >
              Book Appointment Now
            </Link>
            <Link href="/doctors" className="btn-outline inline-block">
              Meet Our Doctors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
