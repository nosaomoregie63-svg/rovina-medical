import { Award, Heart, Shield, Users, Target, Eye } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassionate Care",
      description: "We treat every patient with dignity and respect",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "Committed to the highest standards of service",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Integrity",
      description: "Transparent and ethical in all practices",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Patient-Centered",
      description: "Your health and comfort are our priorities",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Learn more about Rovina Medical and our commitment to your health
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-secondary font-semibold text-sm uppercase">
                Who We Are
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
                Rovina Medical Diagnostic Services
              </h2>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Rovina Medical Diagnostic Services is a leading healthcare
                provider in Nigeria, dedicated to delivering exceptional medical
                diagnostic services with accuracy, professionalism, and
                compassion. With multiple branches across Lagos, we serve our
                community with state-of-the-art medical technology and
                experienced healthcare professionals.
              </p>

              <p>
                Our commitment is to provide accessible, affordable, and
                high-quality diagnostic services that empower patients and
                healthcare providers with accurate information for better health
                decisions. We understand that timely and precise diagnostics are
                crucial to effective medical treatment.
              </p>

              <p>
                From medical ultrasound to comprehensive laboratory services,
                from ECG to cancer screening, we offer a wide range of
                diagnostic solutions. Our team of certified medical
                professionals uses cutting-edge equipment to ensure every test
                is conducted with the highest level of precision and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide world-class medical diagnostic services that are
                accessible, affordable, and reliable. We strive to improve
                healthcare outcomes in our community by delivering accurate
                diagnostic results with compassion and professionalism.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the most trusted and preferred diagnostic center in
                Nigeria, recognized for excellence in service delivery,
                innovation in healthcare technology, and unwavering commitment
                to patient care and satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-secondary font-semibold text-sm uppercase">
              What Drives Us
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-primary hover:shadow-lg transition"
              >
                <div className="text-primary mb-4">{value.icon}</div>
                <h3 className="font-semibold text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">
            Why Choose Rovina Medical?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div>
              <div className="text-6xl mb-4">🏥</div>
              <h3 className="font-semibold text-xl mb-2">Modern Facilities</h3>
              <p className="text-blue-100">State-of-the-art equipment</p>
            </div>

            <div>
              <div className="text-6xl mb-4">👨‍⚕️</div>
              <h3 className="font-semibold text-xl mb-2">Expert Team</h3>
              <p className="text-blue-100">Certified professionals</p>
            </div>

            <div>
              <div className="text-6xl mb-4">⏰</div>
              <h3 className="font-semibold text-xl mb-2">24/7 Available</h3>
              <p className="text-blue-100">Emergency services always ready</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
