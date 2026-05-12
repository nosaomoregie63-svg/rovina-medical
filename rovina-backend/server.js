const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { startReminderService } = require("./services/reminderService");
const emailTemplates = require("./services/emailTemplates");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for development (replace with database later)
const departments = [
  {
    _id: "1",
    name: "General Medicine",
    description: "Primary healthcare and general medical services",
  },
  {
    _id: "2",
    name: "Cardiology",
    description: "Heart and cardiovascular health services",
  },
  {
    _id: "3",
    name: "Pediatrics",
    description: "Children's healthcare and pediatric services",
  },
  {
    _id: "4",
    name: "Radiology",
    description: "Medical imaging and diagnostic services",
  },
  {
    _id: "5",
    name: "Laboratory Services",
    description: "Medical testing and laboratory analysis",
  },
  {
    _id: "6",
    name: "Emergency Medicine",
    description: "Emergency medical care and urgent services",
  },
];

const doctors = [
  {
    _id: "d1",
    firstName: "Amina",
    lastName: "Okafor",
    department: "General Medicine",
  },
  {
    _id: "d2",
    firstName: "Emeka",
    lastName: "Chukwu",
    department: "Cardiology",
  },
  { _id: "d3", firstName: "Ngozi", lastName: "Ibe", department: "Pediatrics" },
  { _id: "d4", firstName: "Samuel", lastName: "Osei", department: "Radiology" },
];

const appointments = [
  {
    _id: "apt1",
    firstName: "Nosao",
    lastName: "Omoregie",
    email: "nosaomoregie31@gmail.com",
    phone: "+2347086986677",
    department: "General Medicine",
    appointmentDate: new Date("2024-03-15T10:00:00").toISOString(),
    appointmentTime: "10:00 AM",
    status: "approved",
    createdAt: new Date().toISOString(),
  },
];
const patients = [
  {
    _id: "p1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    isEmailVerified: true,
    isActive: true,
    createdAt: "2024-01-15T10:00:00.000Z",
  },
  {
    _id: "p2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1234567891",
    isEmailVerified: false,
    isActive: true,
    createdAt: "2024-02-20T14:30:00.000Z",
  },
  {
    _id: "p3",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@example.com",
    phone: "+1234567892",
    isEmailVerified: true,
    isActive: false,
    createdAt: "2024-03-10T09:15:00.000Z",
  },
];

// Email service function
const createEmailTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
  const emailPort = Number(process.env.EMAIL_PORT || 587);

  if (!emailUser || !emailPass) {
    console.warn(
      "⚠️ Email transport is not configured. Set EMAIL_USER and EMAIL_PASS in your .env.",
    );
    return null;
  }

  return nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailPort === 465,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    logger: true,
    debug: true,
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const sendAppointmentConfirmation = async (appointment) => {
  const transporter = createEmailTransporter();
  if (!transporter) return;

  try {
    await transporter.verify();
    console.log("✅ SMTP connection verified");
  } catch (verifyError) {
    console.error("❌ SMTP verification failed:", verifyError);
    return;
  }

  const appointmentData = {
    appointmentId: `APT-${appointment._id.toString().slice(-8).toUpperCase()}`,
    firstName: appointment.firstName,
    lastName: appointment.lastName,
    department:
      appointment.department ||
      appointment.doctor?.department ||
      "General Medicine",
    date: new Date(appointment.appointmentDate).toLocaleDateString(),
    time: appointment.appointmentTime,
    email: appointment.email,
  };

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: appointment.email,
    subject: "Appointment Request Received - Rovina Medical",
    html: emailTemplates.appointmentConfirmation(appointmentData),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${appointment.email}`);
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
  }
};

const sendAppointmentStatusUpdate = async (appointment) => {
  const transporter = createEmailTransporter();
  if (!transporter) return;

  try {
    await transporter.verify();
    console.log("✅ SMTP connection verified for status update");
  } catch (verifyError) {
    console.error(
      "❌ SMTP verification failed for status update:",
      verifyError,
    );
    return;
  }

  const appointmentData = {
    appointmentId: `APT-${appointment._id.toString().slice(-8).toUpperCase()}`,
    firstName: appointment.firstName,
    lastName: appointment.lastName,
    department:
      appointment.department ||
      appointment.doctor?.department ||
      "General Medicine",
    date: new Date(appointment.appointmentDate).toLocaleDateString(),
    time: appointment.appointmentTime,
    email: appointment.email,
    status: appointment.status,
  };

  const statusLabel =
    appointment.status === "approved" ? "Approved" : "Rejected";
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: appointment.email,
    subject: `Appointment ${statusLabel} - Rovina Medical`,
    html: emailTemplates.appointmentStatusUpdate(appointmentData),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `✅ Status email (${appointment.status}) sent to ${appointment.email}`,
    );
  } catch (error) {
    console.error("❌ Failed to send appointment status email:", error);
  }
};

// Routes
app.get("/api/departments", (req, res) => {
  res.json({ data: departments });
});

app.get("/api/doctors", (req, res) => {
  const { department } = req.query;
  let filteredDoctors = doctors;

  if (department) {
    filteredDoctors = doctors.filter((doc) => doc.department === department);
  }

  res.json({ data: filteredDoctors });
});

app.get("/api/appointments", (req, res) => {
  res.json({ data: appointments });
});

app.get("/api/appointments/patient/:email", (req, res) => {
  const { email } = req.params;
  const patientAppointments = appointments.filter(
    (appointment) =>
      appointment.patientEmail === email || appointment.email === email,
  );
  res.json({ data: patientAppointments });
});

app.get("/api/appointments/track/:email", (req, res) => {
  const { email } = req.params;
  const decodedEmail = decodeURIComponent(email).toLowerCase();
  const trackedAppointments = appointments.filter(
    (appointment) =>
      appointment.email?.toLowerCase() === decodedEmail ||
      appointment.patientEmail?.toLowerCase() === decodedEmail,
  );
  res.json({
    success: true,
    count: trackedAppointments.length,
    data: trackedAppointments,
  });
});

app.post("/api/appointments", (req, res) => {
  // Find doctor if doctor ID is provided
  let doctorObj = null;
  if (req.body.doctor) {
    doctorObj = doctors.find((d) => d._id === req.body.doctor);
  }

  const newAppointment = {
    _id: Date.now().toString(),
    ...req.body,
    doctor: doctorObj, // Store full doctor object
    appointmentDate: req.body.preferredDate || new Date().toISOString(),
    appointmentTime: req.body.appointmentTime || "09:00 AM",
    patientEmail: req.body.email || req.body.patientEmail,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);
  sendAppointmentConfirmation(newAppointment);
  res.status(201).json({
    success: true,
    appointmentId: newAppointment._id,
    data: newAppointment,
  });
});

app.patch("/api/appointments/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const appointment = appointments.find((a) => a._id === id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  const oldStatus = appointment.status;
  appointment.status = status;

  if (status !== oldStatus) {
    if (status === "approved" || status === "rejected") {
      sendAppointmentStatusUpdate(appointment);
    }
  }

  res.json({ data: appointment });
});

app.get("/api/appointments/stats", (req, res) => {
  const todayString = new Date().toDateString();
  const todayAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate);
    return appointmentDate.toDateString() === todayString;
  }).length;

  const stats = {
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter((a) => a.status === "pending")
      .length,
    approvedAppointments: appointments.filter((a) => a.status === "approved")
      .length,
    todayAppointments,
  };
  res.json(stats);
});

app.get("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  const appointment = appointments.find((a) => a._id === id);

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  res.json({ data: appointment });
});

// Admin routes
app.get("/api/admin/patients", (req, res) => {
  res.json({ data: patients });
});

app.get("/api/patients", (req, res) => {
  res.json({ data: patients });
});

app.get("/api/admin/patients/stats", (req, res) => {
  const stats = {
    total: patients.length,
    active: patients.filter((p) => p.isActive !== false).length,
    verified: patients.filter((p) => p.isEmailVerified).length,
    newThisMonth: patients.filter((p) => {
      if (!p.createdAt) return false;
      const created = new Date(p.createdAt);
      const now = new Date();
      return now - created < 1000 * 60 * 60 * 24 * 30;
    }).length,
  };
  res.json(stats);
});

// Patient management endpoints
app.patch("/api/admin/patients/:id/toggle-status", (req, res) => {
  const { id } = req.params;
  const patient = patients.find((p) => p._id === id);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  patient.isActive = !patient.isActive;
  res.json({ data: patient });
});

app.patch("/api/patients/:id/toggle-status", (req, res) => {
  const { id } = req.params;
  const patient = patients.find((p) => p._id === id);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  patient.isActive = !patient.isActive;
  res.json({ data: patient });
});

app.delete("/api/admin/patients/:id", (req, res) => {
  const { id } = req.params;
  const index = patients.findIndex((p) => p._id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Patient not found" });
  }

  const deletedPatient = patients.splice(index, 1)[0];
  res.json({ message: "Patient deleted successfully", data: deletedPatient });
});

app.delete("/api/patients/:id", (req, res) => {
  const { id } = req.params;
  const index = patients.findIndex((p) => p._id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Patient not found" });
  }

  const deletedPatient = patients.splice(index, 1)[0];
  res.json({ message: "Patient deleted successfully", data: deletedPatient });
});

app.get("/api/appointments/reports/departments", (req, res) => {
  const deptStats = [
    { department: "General Medicine", count: 5, total: 1200, completed: 1180 },
    { department: "Cardiology", count: 3, total: 800, completed: 780 },
    { department: "Pediatrics", count: 4, total: 600, completed: 590 },
    { department: "Radiology", count: 2, total: 400, completed: 395 },
  ];
  res.json({ data: deptStats });
});

app.get("/api/appointments/reports/doctors", (req, res) => {
  const doctorStats = doctors.map((doc) => ({
    _id: doc._id,
    firstName: doc.firstName,
    lastName: doc.lastName,
    department: doc.department,
    appointmentCount: Math.floor(Math.random() * 20) + 5,
  }));
  res.json({ data: doctorStats });
});

// Auth routes (mock)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Simple mock authentication - accept multiple valid credentials for development
  const validCredentials = [
    { email: "rovinamedicaldiagostic@gmail.com", password: "admin123" },
    { email: "michealomoregie1@gmail.com", password: "Omoregie1" },
  ];

  const isValid = validCredentials.some(
    (cred) => cred.email === email && cred.password === password,
  );

  if (isValid) {
    const token = "mock-jwt-token-" + Date.now();
    const user = {
      _id: email === "rovinamedicaldiagostic@gmail.com" ? "admin1" : "admin2",
      email: email,
      firstName:
        email === "rovinamedicaldiagostic@gmail.com" ? "Admin" : "Michael",
      lastName:
        email === "rovinamedicaldiagostic@gmail.com" ? "User" : "Omoregie",
      role: "admin",
    };
    res.json({ token, user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/api/auth/me", (req, res) => {
  // Mock user authentication check
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const user = {
      _id: "admin1",
      email: "rovinamedicaldiagostic@gmail.com",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
    };
    res.json({ user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Patient auth routes
app.post("/api/patients/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const existingPatient = patients.find((p) => p.email === email);
  const token = "patient-jwt-token-" + Date.now();

  if (existingPatient) {
    return res.json({ token, patient: existingPatient });
  }

  const localPart = email
    .split("@")[0]
    .replace(/[^a-zA-Z]+/g, " ")
    .trim();
  const nameParts = localPart.split(" ").filter(Boolean);
  const formattedFirstName =
    nameParts.length > 0
      ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1)
      : email;
  const formattedLastName =
    nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  const patient = {
    _id: "patient-" + Date.now().toString(),
    email,
    firstName: formattedFirstName,
    lastName: formattedLastName,
    role: "patient",
    isEmailVerified: false,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  patients.push(patient);
  res.json({ token, patient });
});

app.post("/api/patients/register", (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const normalizedEmail = email.trim().toLowerCase();
  const newPatient = {
    _id: Date.now().toString(),
    firstName,
    lastName,
    email: normalizedEmail,
    phone,
    isEmailVerified: false,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  patients.push(newPatient);
  res
    .status(201)
    .json({ message: "Registration successful", user: newPatient });
});

app.put("/api/patients/profile", (req, res) => {
  const updatedProfile = req.body;
  const normalizedEmail = updatedProfile.email?.trim().toLowerCase();
  const patient = patients.find((p) => {
    const existingEmail = p.email?.trim().toLowerCase();
    return (
      (updatedProfile._id && p._id === updatedProfile._id) ||
      (normalizedEmail && existingEmail === normalizedEmail)
    );
  });

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  Object.assign(patient, {
    firstName: updatedProfile.firstName ?? patient.firstName,
    lastName: updatedProfile.lastName ?? patient.lastName,
    email: updatedProfile.email ?? patient.email,
    phone: updatedProfile.phone ?? patient.phone,
  });

  res.json({ data: patient });
});

app.post("/api/patients/resend-verification", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const patient = patients.find(
    (p) => p.email?.trim().toLowerCase() === normalizedEmail,
  );

  if (patient) {
    console.log(`📧 Resend verification email requested for ${email}`);
  }

  res.json({
    message:
      "If this email is registered, a verification message has been sent.",
  });
});

// Department management (admin)
app.post("/api/departments", (req, res) => {
  const { name, description } = req.body;

  const newDept = {
    _id: Date.now().toString(),
    name,
    description,
    createdAt: new Date().toISOString(),
  };

  departments.push(newDept);
  res.status(201).json({ data: newDept });
});

app.delete("/api/departments/:id", (req, res) => {
  const { id } = req.params;
  const index = departments.findIndex((dept) => dept._id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Department not found" });
  }

  const removed = departments.splice(index, 1)[0];
  res.json(removed);
});

// Payments endpoint
app.post("/api/payments/initialize", (req, res) => {
  const { appointmentId, amount, email } = req.body;

  if (!appointmentId || !amount || !email) {
    return res.status(400).json({
      message: "Missing required fields: appointmentId, amount, email",
    });
  }

  // In a real implementation, you would initialize Paystack payment here
  // For now, return a mock response
  const mockAuthorizationUrl =
    "https://checkout.paystack.com/fake-payment-link-" + Date.now();

  res.json({
    success: true,
    authorization_url: mockAuthorizationUrl,
    appointmentId,
    amount,
    message: "Payment initialized successfully",
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Rovina Medical API Server running on port ${PORT}`);

  // Start reminder service (runs daily at 9 AM)
  startReminderService();
  console.log(`   POST /api/appointments`);
  console.log(`   POST /api/auth/login`);
  console.log(`   And more...`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `⛔ Port ${PORT} is already in use. Please stop the process using it or set a different PORT in rovina-backend/.env.`,
    );
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});
