import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Upload,
  ImageIcon,
  Activity,
  Calendar,
  Users,
  BarChart3,
  LogOut,
  Home,
  UserPlus,
  Loader,
} from "lucide-react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const DEPARTMENTS = [
  "General",
  "Pediatrics",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Radiology",
  "Surgery",
  "Dermatology",
];

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AdminDoctors() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
    department: "",
    qualification: "",
    experience: "",
    phone: "",
    email: "",
    bio: "",
    photo: null,
    availability: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchDoctors();
  }, [navigate]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_URL}/doctors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      } else {
        toast.error("Failed to load doctors");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("File must be an image");
        return;
      }

      setFormData((prev) => ({ ...prev, photo: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvailabilityChange = (day) => {
    setFormData((prev) => {
      const availability = prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day];
      return { ...prev, availability };
    });
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      specialty: "",
      department: "",
      qualification: "",
      experience: "",
      phone: "",
      email: "",
      bio: "",
      photo: null,
      availability: [],
    });
    setPhotoPreview(null);
    setEditingDoctor(null);
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      specialty: doctor.specialty,
      department: doctor.department,
      qualification: doctor.qualification || "",
      experience: doctor.experience || "",
      phone: doctor.phone || "",
      email: doctor.email || "",
      bio: doctor.bio || "",
      photo: null,
      availability: doctor.availability || [],
    });
    if (doctor.photo && doctor.photo !== "default-doctor.jpg") {
      setPhotoPreview(doctor.photo);
    }
    setShowModal(true);
  };

  const handleDelete = async (doctorId) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/doctors/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors((prev) => prev.filter((d) => d._id !== doctorId));
      toast.success("Doctor deleted successfully");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.specialty ||
      !formData.department
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setUploading(true);
      const token = localStorage.getItem("adminToken");

      // Create FormData for multipart upload if there's a photo
      let doctorData = formData;
      if (formData.photo || editingDoctor) {
        const data = new FormData();
        data.append("firstName", formData.firstName);
        data.append("lastName", formData.lastName);
        data.append("specialty", formData.specialty);
        data.append("department", formData.department);
        data.append("qualification", formData.qualification);
        data.append("experience", formData.experience);
        data.append("phone", formData.phone);
        data.append("email", formData.email);
        data.append("bio", formData.bio);
        data.append("availability", JSON.stringify(formData.availability));
        if (formData.photo) {
          data.append("photo", formData.photo);
        }
        doctorData = data;
      }

      if (editingDoctor) {
        // Update existing doctor
        await axios.put(`${API_URL}/doctors/${editingDoctor._id}`, doctorData, {
          headers: {
            Authorization: `Bearer ${token}`,
            ...(formData.photo && { "Content-Type": "multipart/form-data" }),
          },
        });
        toast.success("Doctor updated successfully");
      } else {
        // Create new doctor
        await axios.post(`${API_URL}/doctors`, doctorData, {
          headers: {
            Authorization: `Bearer ${token}`,
            ...(formData.photo && { "Content-Type": "multipart/form-data" }),
          },
        });
        toast.success("Doctor added successfully");
      }

      setShowModal(false);
      resetForm();
      fetchDoctors();
    } catch (error) {
      console.error("Error saving doctor:", error);
      const errorMsg = error.response?.data?.message || "Failed to save doctor";
      toast.error(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col fixed h-screen z-40 lg:relative`}
      >
        <div
          className={`${
            sidebarOpen ? "p-6" : "p-4"
          } border-b flex items-center justify-between`}
        >
          {sidebarOpen && (
            <h1 className="text-2xl font-bold text-primary">Rovina</h1>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            to="/admin/dashboard"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <Activity className="w-5 h-5" />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link
            to="/admin/dashboard/appointments"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <Calendar className="w-5 h-5" />
            {sidebarOpen && <span>Appointments</span>}
          </Link>

          <Link
            to="/admin/dashboard/doctors"
            className="flex items-center space-x-3 px-4 py-3 bg-primary text-white rounded-lg"
          >
            <Users className="w-5 h-5" />
            {sidebarOpen && <span>Doctors</span>}
          </Link>

          <Link
            to="/admin/dashboard/users"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <UserPlus className="w-5 h-5" />
            {sidebarOpen && <span>Users</span>}
          </Link>

          <Link
            to="/admin/dashboard/reports"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <BarChart3 className="w-5 h-5" />
            {sidebarOpen && <span>Reports</span>}
          </Link>

          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <Home className="w-5 h-5" />
            {sidebarOpen && <span>View Website</span>}
          </Link>
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Manage Doctors</h2>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition flex items-center space-x-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Doctor</span>
          </button>
        </div>

        {/* Doctors Grid */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-2" />
              <p className="text-gray-600">Loading doctors...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">
                No doctors found. Add your first doctor!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-primary transition"
                >
                  {/* Doctor Photo */}
                  <div className="relative h-48 bg-gradient-to-br from-primary to-primaryLight">
                    {doctor.photo && doctor.photo !== "default-doctor.jpg" ? (
                      <img
                        src={doctor.photo}
                        alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary">
                            {doctor.firstName.charAt(0)}
                            {doctor.lastName.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Doctor Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </h3>
                    <p className="text-secondary text-sm font-semibold mb-2">
                      {doctor.specialty}
                    </p>
                    <p className="text-gray-600 text-xs mb-3">
                      {doctor.department}
                    </p>

                    {doctor.phone && (
                      <p className="text-xs text-gray-700 mb-1">
                        📞 {doctor.phone}
                      </p>
                    )}
                    {doctor.email && (
                      <p className="text-xs text-gray-700 mb-3">
                        📧 {doctor.email}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleEdit(doctor)}
                        className="flex-1 p-2 bg-primary text-white rounded hover:bg-blue-900 transition flex items-center justify-center"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="flex-1 p-2 bg-danger text-white rounded hover:bg-red-700 transition flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Doctor Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">
                {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Doctor Photo
                </label>

                <div className="flex items-center space-x-4">
                  {/* Preview */}
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-300">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="flex-1">
                    <input
                      type="file"
                      id="photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="photo"
                      className="cursor-pointer inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        Choose Photo
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Max size: 5MB. Formats: JPG, PNG, WEBP
                    </p>
                  </div>
                </div>
              </div>

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

              {/* Specialty & Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specialty *
                  </label>
                  <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g., Radiologist"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Qualification & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., MBBS, MD"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., 10+ years"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="08012345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="doctor@rovinamedical.ng"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="input-field resize-none"
                  placeholder="Brief professional bio..."
                ></textarea>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Availability
                </label>
                <div className="flex flex-wrap gap-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <label
                      key={day}
                      className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200"
                    >
                      <input
                        type="checkbox"
                        checked={formData.availability.includes(day)}
                        onChange={() => handleAvailabilityChange(day)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-semibold"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-secondary"
                  disabled={uploading}
                >
                  {uploading
                    ? "Saving..."
                    : editingDoctor
                      ? "Update Doctor"
                      : "Add Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
