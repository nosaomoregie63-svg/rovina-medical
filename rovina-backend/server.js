const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

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

const appointments = [];
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

  res.json(filteredDoctors);
});

app.get("/api/appointments", (req, res) => {
  res.json(appointments);
});

app.get("/api/appointments/patient/:email", (req, res) => {
  const { email } = req.params;
  const patientAppointments = appointments.filter(
    (appointment) => appointment.patientEmail === email,
  );
  res.json({ data: patientAppointments });
});

app.post("/api/appointments", (req, res) => {
  const newAppointment = {
    _id: Date.now().toString(),
    ...req.body,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
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

app.get("/api/appointments/stats", (req, res) => {
  const stats = {
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter((a) => a.status === "pending")
      .length,
    approvedAppointments: appointments.filter((a) => a.status === "approved")
      .length,
    todayAppointments: 0,
  };
  res.json(stats);
});

app.get("/api/appointments/reports/departments", (req, res) => {
  const deptStats = [
    { department: "General Medicine", count: 5, total: 1200, completed: 1180 },
    { department: "Cardiology", count: 3, total: 800, completed: 780 },
    { department: "Pediatrics", count: 4, total: 600, completed: 590 },
    { department: "Radiology", count: 2, total: 400, completed: 395 },
  ];
  res.json(deptStats);
});

app.get("/api/appointments/reports/doctors", (req, res) => {
  const doctorStats = doctors.map((doc) => ({
    _id: doc._id,
    firstName: doc.firstName,
    lastName: doc.lastName,
    department: doc.department,
    appointmentCount: Math.floor(Math.random() * 20) + 5,
  }));
  res.json(doctorStats);
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

  // Mock patient login - accept any email/password for demo
  if (email && password) {
    const token = "patient-jwt-token-" + Date.now();
    const user = {
      _id: "patient1",
      email: email,
      firstName: "John",
      lastName: "Doe",
      role: "patient",
    };
    res.json({ token, user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/api/patients/register", (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const newPatient = {
    _id: Date.now().toString(),
    firstName,
    lastName,
    email,
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

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Rovina Medical API Server running on port ${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET  /api/departments`);
  console.log(`   GET  /api/doctors`);
  console.log(`   POST /api/appointments`);
  console.log(`   POST /api/auth/login`);
  console.log(`   And more...`);
});
