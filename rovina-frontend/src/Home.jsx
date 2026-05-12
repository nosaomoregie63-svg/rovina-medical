import { Link } from "react-router-dom";
import RovinaBranding from "./components/RovinaBranding";
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Award,
  Users,
  Shield,
  Star,
  TrendingUp,
  Heart,
  Activity,
  Microscope,
  ArrowRight,
  MessageCircle,
  Play,
} from "lucide-react";

export default function Home() {
  const services = [
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Medical Ultrasound",
      description: "Advanced 4D imaging technology for accurate diagnosis",
      popular: true,
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Echocardiography",
      description: "Comprehensive heart imaging by certified cardiologists",
      popular: true,
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Laboratory Services",
      description: "Full diagnostic testing with same-day results",
      popular: false,
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Cancer Screening",
      description: "Early detection programs for various cancers",
      popular: false,
    },
  ];

  const stats = [
    {
      number: "15+",
      label: "Years of Excellence",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "10,000+",
      label: "Happy Patients",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "12+",
      label: "Specialized Services",
      icon: <Activity className="w-6 h-6" />,
    },
    {
      number: "3",
      label: "Modern Facilities",
      icon: <MapPin className="w-6 h-6" />,
    },
  ];

  const testimonials = [
    {
      name: "Mrs. Adeyemi Adeola",
      role: "Patient",
      content:
        "The professionalism and care I received at Rovina Medical was exceptional. The staff made me feel comfortable throughout my ultrasound examination.",
      rating: 5,
    },
    {
      name: "Mr. Chukwuma Obi",
      role: "Corporate Client",
      content:
        "We have been using Rovina Medical for our company's staff medical screening for 3 years. Their service is prompt, professional, and reliable.",
      rating: 5,
    },
    {
      name: "Dr. Amina Hassan",
      role: "Referring Physician",
      content:
        "I always recommend Rovina Medical to my patients. Their diagnostic accuracy and quick turnaround time are impressive.",
      rating: 5,
    },
  ];

  const whyChoose = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "State-of-the-Art Equipment",
      description: "Latest diagnostic technology for accurate results",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Medical Team",
      description: "Highly qualified and experienced professionals",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Quick Turnaround",
      description: "Fast results without compromising quality",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Patient-Centered Care",
      description: "Your comfort and wellbeing is our priority",
    },
  ];

  const certifications = [
    "15+ Years Established",
    "ISO Certified Facility",
    "MDCN Accredited",
    "CAC Registered",
  ];

  return (
    <div className="relative">
      <RovinaBranding />
      {/* Hero Section - IMPACTFUL */}
      <section className="relative bg-gradient-to-br from-primary via-blue-900 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Trust Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Award className="w-5 h-5 text-secondary" />
                <span className="text-sm font-semibold">
                  Trusted by 10,000+ Patients Since 2010
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Your Health,
                <span className="block text-secondary">Our Priority</span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Experience world-class diagnostic services with cutting-edge
                technology and compassionate care at Lagos's most trusted
                medical facility.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/book-appointment"
                  className="group bg-secondary text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition font-bold text-lg flex items-center justify-center shadow-xl hover:shadow-2xl"
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/services"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary transition font-bold text-lg text-center"
                >
                  View Services
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index}>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="text-secondary">{stat.icon}</div>
                      <p className="text-3xl font-bold">{stat.number}</p>
                    </div>
                    <p className="text-sm text-blue-100">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Emergency Contact Card */}
            <div className="lg:pl-12">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-red-600 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">
                      24/7 Emergency Hotline
                    </p>
                    <a
                      href="tel:07086986677"
                      className="text-3xl font-bold text-primary hover:text-secondary transition"
                    >
                      070 8698 6677
                    </a>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Walk-in Patients Welcome
                      </p>
                      <p className="text-sm text-gray-600">
                        No appointment needed for urgent care
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Same-Day Results
                      </p>
                      <p className="text-sm text-gray-600">
                        Fast turnaround for most tests
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Insurance Accepted
                      </p>
                      <p className="text-sm text-gray-600">
                        We work with major HMOs
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/2347086986677"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold w-full"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
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

      {/* Trust Indicators */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-gray-700"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-3">
              OUR SERVICES
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Diagnostic Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art medical technology combined with expert care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary transition-all duration-300 hover:shadow-xl"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center text-primary font-semibold group-hover:text-secondary transition">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition font-semibold text-lg"
            >
              <span>View All 12+ Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-3">
                WHY CHOOSE US
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Excellence in Every Aspect
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChoose.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-3">
              TESTIMONIALS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Real experiences from real people who trust us with their health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-blue-200">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
              <Star className="w-5 h-5 fill-secondary text-secondary" />
              <span className="font-semibold">
                4.9/5 Average Rating from 500+ Reviews
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition">
                    {stat.icon}
                  </div>
                  <p className="text-5xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </p>
                  <p className="text-gray-600 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-3">
              OUR LOCATIONS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Convenient Access Across Lagos
            </h2>
            <p className="text-xl text-gray-600">
              Visit us at any of our modern facilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Head Office",
                location: "Satellite Town",
                address: "Roving House, 3 Mobil Road, Ile Epo Bus Stop",
                phone: "070 8698 6677 | 080 3359 0577",
                featured: true,
              },
              {
                name: "Abule Ado Branch",
                location: "Abule Ado",
                address: "Plot 446 Old Ojo Road, Christ-in-me Plaza",
                phone: "080 6090 9199",
                featured: false,
              },
              {
                name: "Olodi Apapa Branch",
                location: "Olodi Apapa",
                address: "Plot 174 Kirikiri Road, People's bus stop",
                phone: "091 3922 1666",
                featured: false,
              },
            ].map((branch, index) => (
              <div
                key={index}
                className={`bg-white border-2 ${branch.featured ? "border-secondary" : "border-gray-200"} rounded-xl p-6 hover:shadow-xl transition relative`}
              >
                {branch.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary text-white text-xs font-bold px-4 py-1 rounded-full">
                    MAIN BRANCH
                  </div>
                )}
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {branch.name}
                </h3>
                <p className="text-gray-600 mb-4">{branch.address}</p>
                <div className="flex items-center space-x-2 text-primary">
                  <Phone className="w-4 h-4" />
                  <a
                    href={`tel:${branch.phone.split("|")[0].trim()}`}
                    className="font-semibold hover:text-secondary transition"
                  >
                    {branch.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-blue-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the difference of
            world-class diagnostic care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-appointment"
              className="group bg-secondary text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition font-bold text-lg inline-flex items-center justify-center shadow-xl"
            >
              Book Appointment Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary transition font-bold text-lg"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-secondary" />
              <a
                href="tel:07086986677"
                className="text-lg font-semibold hover:text-secondary transition"
              >
                070 8698 6677
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-secondary" />
              <a
                href="https://wa.me/2347086986677"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold hover:text-secondary transition"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

