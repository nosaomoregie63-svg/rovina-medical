"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We will contact you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  const branches = [
    {
      name: "Head Office",
      address: "Roving House, 3 Mobil Road, Ile Epo Bus Stop, Satellite Town",
      phone: "07086986677, 08033590577",
      email: "rovinamedicaldiagnostic@gmail.com",
    },
    {
      name: "Abule Ado Branch",
      address:
        "Plot 446 Old Ojo Road, Christ-in-me Plaza, Beside Petrocam Filling Station, Satellite Town",
      phone: "08060909199",
      email: "rovinamedicaldiagnostic@gmail.com",
    },
    {
      name: "Olodi Apapa Branch",
      address: "Plot 174 Kirikiri Road, People's bus stop, Olodi Apapa",
      phone: "09139221666",
      email: "rovinamedicaldiagnostic@gmail.com",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get in touch with us for any inquiries or to schedule an appointment
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>

              {/* Emergency Contact */}
              <div className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-6 mb-8">
                <div className="flex items-center space-x-3 mb-2">
                  <Phone className="w-6 h-6 text-secondary" />
                  <h3 className="font-bold text-xl">Emergency Hotline</h3>
                </div>
                <p className="text-2xl font-bold text-secondary">07086986677</p>
                <p className="text-gray-600 text-sm mt-1">Available 24/7</p>
              </div>

              {/* Branches */}
              <div className="space-y-6">
                {branches.map((branch, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <h3 className="font-bold text-xl text-primary mb-3">
                      {branch.name}
                    </h3>

                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">{branch.address}</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        <span className="text-sm">{branch.phone}</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        <span className="text-sm">{branch.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Opening Hours */}
              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-xl">Opening Hours</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="text-secondary font-bold">
                      Emergency: 24/7
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="input-field resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-secondary flex items-center justify-center"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Contact;

