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
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import RovinaBranding from "./components/RovinaBranding";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // Check if we should use mock data
      if (import.meta.env.VITE_USE_MOCK === "true") {
        console.log("Using mock services data");
        setServices([
          {
            icon: <Scan className="w-10 h-10" />,
            title: "Medical Ultrasound",
            description:
              "Advanced ultrasound imaging for accurate diagnosis of various medical conditions",
          },
          {
            icon: <Activity className="w-10 h-10" />,
            title: "Doppler Studies",
            description:
              "Specialized vascular imaging to assess blood flow and detect circulation problems",
          },
          {
            icon: <Heart className="w-10 h-10" />,
            title: "Echocardiography",
            description:
              "Comprehensive heart imaging to evaluate cardiac function and structure",
          },
          {
            icon: <TestTube className="w-10 h-10" />,
            title: "Laboratory Services",
            description:
              "Full-service laboratory for accurate diagnostic testing and analysis",
          },
          {
            icon: <Scan className="w-10 h-10" />,
            title: "Mammography",
            description:
              "Breast cancer screening and diagnostic imaging for early detection",
          },
          {
            icon: <Scan className="w-10 h-10" />,
            title: "Digital Radiography",
            description:
              "High-quality digital X-ray imaging for quick and accurate diagnosis",
          },
          {
            icon: <Zap className="w-10 h-10" />,
            title: "Electrocardiography (ECG)",
            description:
              "Heart rhythm monitoring and cardiovascular assessment",
          },
          {
            icon: <Droplet className="w-10 h-10" />,
            title: "Hormonal Assay",
            description:
              "Comprehensive hormone testing for endocrine health evaluation",
          },
          {
            icon: <Activity className="w-10 h-10" />,
            title: "Ovulation Tracking",
            description:
              "Fertility monitoring and ovulation prediction services",
          },
          {
            icon: <Microscope className="w-10 h-10" />,
            title: "Cancer Screening",
            description:
              "Early detection screening for various types of cancer",
          },
          {
            icon: <Users className="w-10 h-10" />,
            title: "Corporate Health Screening",
            description:
              "Comprehensive health packages for organizations and employees",
          },
          {
            icon: <Stethoscope className="w-10 h-10" />,
            title: "Domestic Staff Screening",
            description:
              "Pre-employment medical screening for domestic workers",
          },
          {
            icon: <GraduationCap className="w-10 h-10" />,
            title: "Research And Training",
            description: "Medical research and professional training programs",
          },
        ]);
        return;
      }

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
      // Fallback to hardcoded services
      setServices([
        {
          icon: <Scan className="w-10 h-10" />,
          title: "Medical Ultrasound",
          description:
            "Advanced ultrasound imaging for accurate diagnosis of various medical conditions",
        },
        {
          icon: <Activity className="w-10 h-10" />,
          title: "Doppler Studies",
          description:
            "Specialized vascular imaging to assess blood flow and detect circulation problems",
        },
        {
          icon: <Heart className="w-10 h-10" />,
          title: "Echocardiography",
          description:
            "Comprehensive heart imaging to evaluate cardiac function and structure",
        },
        {
          icon: <TestTube className="w-10 h-10" />,
          title: "Laboratory Services",
          description:
            "Full-service laboratory for accurate diagnostic testing and analysis",
        },
        {
          icon: <Scan className="w-10 h-10" />,
          title: "Mammography",
          description:
            "Breast cancer screening and diagnostic imaging for early detection",
        },
        {
          icon: <Scan className="w-10 h-10" />,
          title: "Digital Radiography",
          description:
            "High-quality digital X-ray imaging for quick and accurate diagnosis",
        },
        {
          icon: <Zap className="w-10 h-10" />,
          title: "Electrocardiography (ECG)",
          description: "Heart rhythm monitoring and cardiovascular assessment",
        },
        {
          icon: <Droplet className="w-10 h-10" />,
          title: "Hormonal Assay",
          description:
            "Comprehensive hormone testing for endocrine health evaluation",
        },
        {
          icon: <Activity className="w-10 h-10" />,
          title: "Ovulation Tracking",
          description: "Fertility monitoring and ovulation prediction services",
        },
        {
          icon: <Microscope className="w-10 h-10" />,
          title: "Cancer Screening",
          description: "Early detection screening for various types of cancer",
        },
        {
          icon: <Users className="w-10 h-10" />,
          title: "Corporate Health Screening",
          description:
            "Comprehensive health packages for organizations and employees",
        },
        {
          icon: <Stethoscope className="w-10 h-10" />,
          title: "Domestic Staff Screening",
          description: "Pre-employment medical screening for domestic workers",
        },
        {
          icon: <GraduationCap className="w-10 h-10" />,
          title: "Research And Training",
          description: "Medical research and professional training programs",
        },
      ]);
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

  const serviceCategories = [
    {
      title: "Diagnostic Imaging",
      count: 5,
      description: "Advanced imaging technologies for accurate diagnosis",
    },
    {
      title: "Laboratory Testing",
      count: 3,
      description: "Comprehensive blood work and diagnostic testing",
    },
    {
      title: "Health Screening",
      count: 3,
      description: "Preventive health packages and assessments",
    },
    {
      title: "Specialized Services",
      count: 2,
      description: "Targeted medical services and research programs",
    },
  ];

  return (
    <div className="relative">
      {/* Background Watermark */}
      <RovinaBranding />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Microscope className="w-5 h-5 text-secondary" />
              <span className="text-sm font-semibold">
                12+ Specialized Services
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Comprehensive diagnostic services delivered with precision and
              care
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

      {/* Service Categories Overview */}
      <section className="py-16 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-primary font-bold text-4xl mb-2">
                    {category.count}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-3">
                COMPLETE SOLUTIONS
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                All Your Diagnostic Needs, One Location
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From routine check-ups to specialized screenings, we offer
                comprehensive medical services
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading services...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-8 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center text-primary font-semibold group-hover:text-secondary transition">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-3">
                OUR ADVANTAGE
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Our Services Stand Out
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Same-Day Results
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Most diagnostic tests are processed and delivered within 24
                  hours for quick medical decisions
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Microscope className="w-8 h-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Advanced Equipment
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Latest diagnostic technology ensuring accuracy and reliability
                  in every test
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-purple-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Expert Team
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Certified radiologists and pathologists with years of
                  specialized experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services Banner */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Phone className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Urgent Medical Testing?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our emergency diagnostic services are available 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:07086986677"
                className="bg-secondary text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 font-bold text-lg hover:scale-105 shadow-lg"
              >
                Call Now: 070 8698 6677
              </a>
              <Link
                to="/book-appointment"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-bold text-lg"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready for Your Health Check?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Book an appointment with us today and let our expert team take
              care of your health needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book-appointment"
                className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-all duration-300 font-semibold hover:scale-105 shadow-lg"
              >
                Book Appointment
              </Link>
              <Link
                to="/contact"
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
