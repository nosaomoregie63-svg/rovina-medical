import {
  Award,
  Target,
  Eye,
  Heart,
  Shield,
  Users,
  CheckCircle,
  TrendingUp,
  Building2,
  Microscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import RovinaBranding from "./components/RovinaBranding";

export default function About() {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Excellence",
      description:
        "We maintain the highest standards in all our diagnostic services and patient care",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassion",
      description:
        "We treat every patient with empathy, respect, and genuine care for their wellbeing",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Integrity",
      description:
        "We uphold honesty, transparency, and ethical practices in everything we do",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description:
        "We work together as a team to deliver comprehensive healthcare solutions",
    },
  ];

  const reasons = [
    {
      text: "State-of-the-art diagnostic equipment",
      icon: <Microscope className="w-5 h-5" />,
    },
    {
      text: "Highly qualified and experienced medical professionals",
      icon: <Users className="w-5 h-5" />,
    },
    {
      text: "Quick turnaround time for test results",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      text: "Affordable and transparent pricing",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      text: "Three convenient branch locations",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      text: "Comprehensive range of diagnostic services",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      text: "Patient-centered care approach",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      text: "Strict adherence to international quality standards",
      icon: <Award className="w-5 h-5" />,
    },
  ];

  const milestones = [
    {
      year: "2010",
      title: "Foundation",
      description: "Rovina Medical established in Satellite Town",
    },
    {
      year: "2015",
      title: "Expansion",
      description: "Opened second branch in Abule Ado",
    },
    {
      year: "2018",
      title: "ISO Certification",
      description: "Achieved ISO quality certification",
    },
    {
      year: "2020",
      title: "Third Location",
      description: "Launched Olodi Apapa branch",
    },
    {
      year: "2024",
      title: "10,000+ Patients",
      description: "Milestone of serving 10,000+ patients",
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
              <Award className="w-5 h-5 text-secondary" />
              <span className="text-sm font-semibold">
                Excellence Since 2010
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Rovina Medical
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Your trusted partner in healthcare excellence for over 15 years
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
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-3">
                  WHO WE ARE
                </p>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Leading Healthcare Provider in Nigeria
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                  <p className="leading-relaxed">
                    Rovina Medical Diagnostic Services is a leading healthcare
                    provider in Nigeria, specializing in comprehensive
                    diagnostic services. With over 15 years of experience, we
                    have built a reputation for excellence, accuracy, and
                    patient-centered care.
                  </p>
                  <p className="leading-relaxed">
                    Our state-of-the-art facilities across three strategic
                    locations in Lagos provide easy access to quality healthcare
                    services for individuals, families, and corporate
                    organizations. We combine advanced medical technology with
                    the expertise of highly qualified healthcare professionals
                    to deliver accurate and timely diagnostic results.
                  </p>
                  <p className="leading-relaxed">
                    At Rovina Medical, we understand that accurate diagnosis is
                    the foundation of effective treatment. That's why we invest
                    continuously in the latest medical equipment and ongoing
                    training for our staff to ensure we deliver nothing but the
                    best to our patients.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary/5 to-blue-100/50 rounded-xl p-6 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Microscope className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
                  <p className="text-gray-600 font-semibold">
                    Years Experience
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-xl p-6 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    10K+
                  </h3>
                  <p className="text-gray-600 font-semibold">Patients Served</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-pink-100/50 rounded-xl p-6 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">12+</h3>
                  <p className="text-gray-600 font-semibold">
                    Services Offered
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-100/50 rounded-xl p-6 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">3</h3>
                  <p className="text-gray-600 font-semibold">
                    Branch Locations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To provide accessible, accurate, and affordable diagnostic
                services using cutting-edge technology and highly skilled
                professionals, while maintaining the highest standards of
                quality and patient care. We are committed to being the
                preferred diagnostic center in Nigeria and beyond.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading diagnostic healthcare provider in West Africa,
                recognized for excellence in service delivery, innovation in
                medical technology and unwavering commitment to patient
                satisfaction. We envision a future where quality healthcare is
                accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-3">
                CORE VALUES
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What Drives Us
              </h2>
              <p className="text-xl text-gray-600">
                Our commitment to excellence is built on these principles
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center group hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-3">
                OUR JOURNEY
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                15 Years of Excellence
              </h2>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-secondary hidden md:block"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div
                      className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
                    >
                      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="text-secondary font-bold text-4xl mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg hidden md:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-3">
                WHY CHOOSE US
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Patients Trust Us
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive care backed by excellence
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-md"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
                    {reason.icon}
                  </div>
                  <p className="text-gray-700 font-medium pt-2">
                    {reason.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <Award className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition" />
                <p className="text-5xl font-bold mb-2">15+</p>
                <p className="text-blue-100">Years of Service</p>
              </div>
              <div className="group">
                <Users className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition" />
                <p className="text-5xl font-bold mb-2">10,000+</p>
                <p className="text-blue-100">Patients Served</p>
              </div>
              <div className="group">
                <Microscope className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition" />
                <p className="text-5xl font-bold mb-2">12+</p>
                <p className="text-blue-100">Diagnostic Services</p>
              </div>
              <div className="group">
                <Building2 className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition" />
                <p className="text-5xl font-bold mb-2">3</p>
                <p className="text-blue-100">Branch Locations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Experience Excellence in Healthcare
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of satisfied patients who trust us with their
              health
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book-appointment"
                className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-all duration-300 font-semibold hover:scale-105 shadow-lg"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


