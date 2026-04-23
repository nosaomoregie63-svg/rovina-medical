import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// In-memory mock data
const doctors = [
  { _id: "d1", firstName: "Amina", lastName: "Okafor", department: "General" },
  {
    _id: "d2",
    firstName: "Emeka",
    lastName: "Chukwu",
    department: "Cardiology",
  },
  { _id: "d3", firstName: "Ngozi", lastName: "Ibe", department: "Pediatrics" },
  { _id: "d4", firstName: "Samuel", lastName: "Osei", department: "Radiology" },
];

const departments = [
  {
    _id: "dept1",
    name: "General Medicine",
    description: "Primary healthcare and general medical services",
  },
  {
    _id: "dept2",
    name: "Cardiology",
    description: "Heart and cardiovascular health services",
  },
  {
    _id: "dept3",
    name: "Pediatrics",
    description: "Children's healthcare and pediatric services",
  },
  {
    _id: "dept4",
    name: "Radiology",
    description: "Medical imaging and diagnostic services",
  },
  {
    _id: "dept5",
    name: "Laboratory",
    description: "Medical testing and laboratory services",
  },
  {
    _id: "dept6",
    name: "Emergency",
    description: "Emergency medical care and urgent services",
  },
];

const appointments = [];

const patients = [];

const adminUser = {
  _id: "admin1",
  // allow login with either address for testing
  email: "rovinamedicaldiagostic@gmail.com",
  firstName: "Admin",
  lastName: "User",
  role: "admin",
};

// additional valid admin login addresses
const adminEmails = [adminUser.email, "michealomoregie1@gmail.com"];

function makeAxiosResponse(payload, status = 200) {
  const body = payload;
  return {
    data: body,
    status,
    statusText: status === 200 ? "OK" : "Created",
    headers: {},
    config: {},
  };
}

const original = {
  get: axios.get.bind(axios),
  post: axios.post.bind(axios),
  put: axios.put.bind(axios),
  patch: axios.patch?.bind(axios),
  delete: axios.delete.bind(axios),
};

axios.get = async function (url, config) {
  if (typeof url === "string" && url.startsWith(API_URL)) {
    const u = new URL(url);
    const pathname = u.pathname;

    if (pathname === "/api/doctors") {
      const dept = u.searchParams.get("department");
      const result = dept
        ? doctors.filter((d) => d.department === dept)
        : doctors.slice();
      return Promise.resolve(makeAxiosResponse(result, 200));
    }

    if (pathname === "/api/departments") {
      return Promise.resolve(makeAxiosResponse({ data: departments }, 200));
    }

    if (pathname === "/api/patients") {
      return Promise.resolve(makeAxiosResponse(patients, 200));
    }

    if (pathname === "/api/patients/stats") {
      const now = new Date();
      const stats = {
        total: patients.length,
        active: patients.filter((p) => p.isActive !== false).length,
        verified: patients.filter((p) => p.isEmailVerified).length,
        newThisMonth: patients.filter((p) => {
          if (!p.createdAt) return false;
          const created = new Date(p.createdAt);
          return now - created < 1000 * 60 * 60 * 24 * 30;
        }).length,
      };
      return Promise.resolve(makeAxiosResponse(stats, 200));
    }

    // Check more specific paths first before generic /api/appointments/...
    if (pathname === "/api/appointments/stats") {
      const stats = {
        totalAppointments: appointments.length,
        pendingAppointments: appointments.filter((a) => a.status === "pending")
          .length,
        approvedAppointments: appointments.filter(
          (a) => a.status === "approved",
        ).length,
        todayAppointments: 0,
      };
      return Promise.resolve(makeAxiosResponse(stats, 200));
    }

    if (pathname === "/api/appointments/reports/departments") {
      const deptStats = [
        { department: "General", count: 5 },
        { department: "Cardiology", count: 3 },
        { department: "Pediatrics", count: 4 },
        { department: "Radiology", count: 2 },
      ];
      return Promise.resolve(makeAxiosResponse(deptStats, 200));
    }

    if (pathname === "/api/appointments/reports/doctors") {
      const doctorStats = doctors.map((doc) => ({
        _id: doc._id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        department: doc.department,
        appointmentCount: 2,
      }));
      return Promise.resolve(makeAxiosResponse(doctorStats, 200));
    }

    if (pathname === "/api/appointments") {
      return Promise.resolve(makeAxiosResponse(appointments, 200));
    }

    if (pathname.startsWith("/api/appointments/patient/")) {
      const parts = pathname.split("/");
      const email = decodeURIComponent(parts[parts.length - 1] || "");
      const result = appointments
        .filter((a) => (a.email || "").toLowerCase() === email.toLowerCase())
        .map((a) => {
          // if a.doctor is an id, replace with full object
          if (a.doctor && typeof a.doctor === "string") {
            const doc = doctors.find((d) => d._id === a.doctor);
            if (doc) {
              return { ...a, doctor: doc };
            }
          }
          return a;
        });
      return Promise.resolve(makeAxiosResponse(result, 200));
    }

    if (pathname.startsWith("/api/appointments/")) {
      const parts = pathname.split("/");
      const id = parts[parts.length - 1];
      const appt = appointments.find((a) => a._id === id);
      if (appt) return Promise.resolve(makeAxiosResponse(appt, 200));
      return Promise.reject({
        response: { status: 404, data: { message: "Not found" } },
      });
    }

    if (pathname === "/api/auth/me") {
      const auth =
        config?.headers?.Authorization || config?.headers?.authorization;
      if (auth && auth.toLowerCase().startsWith("bearer")) {
        return Promise.resolve(makeAxiosResponse({ user: adminUser }, 200));
      }
      return Promise.reject({
        response: { status: 401, data: { message: "Unauthorized" } },
      });
    }

    return Promise.reject({
      response: { status: 404, data: { message: "Mock GET: Not found" } },
    });
  }
  return original.get(url, config);
};

axios.post = async function (url, data, config) {
  if (typeof url === "string" && url.startsWith(API_URL)) {
    const u = new URL(url);
    const pathname = u.pathname;

    if (pathname === "/api/appointments") {
      const id = String(Date.now() + Math.floor(Math.random() * 1000));
      const newAppt = {
        _id: id,
        firstName: data.firstName || data.first_name || "",
        lastName: data.lastName || data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        department: data.department || "",
        doctor: data.doctor || null,
        date: data.date || new Date().toISOString(),
        message: data.message || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      appointments.push(newAppt);
      return Promise.resolve(makeAxiosResponse(newAppt, 201));
    }

    if (pathname === "/api/departments") {
      const id = String(Date.now() + Math.floor(Math.random() * 1000));
      const newDept = {
        _id: id,
        name: data.name || "",
        description: data.description || "",
        createdAt: new Date().toISOString(),
      };
      departments.push(newDept);
      return Promise.resolve(makeAxiosResponse({ data: newDept }, 201));
    }

    if (pathname === "/api/auth/login") {
      const email = (data?.email || "").trim();
      const password = data?.password || "";
      // Accept login for either admin email
      if (email && password && adminEmails.includes(email.toLowerCase())) {
        const token = "mocked-jwt-token";
        const user = { ...adminUser, email };
        return Promise.resolve(makeAxiosResponse({ token, user }, 200));
      }
      return Promise.reject({
        response: { status: 401, data: { message: "Invalid credentials" } },
      });
    }

    if (pathname === "/api/patients/login") {
      const email = data?.email || "";
      const password = data?.password || "";

      // Check if patient exists with this email
      if (email.trim() && password.trim()) {
        const registeredPatient = patients.find(
          (p) => p.email.toLowerCase() === email.toLowerCase(),
        );

        if (registeredPatient) {
          if (registeredPatient.isActive === false) {
            return Promise.reject({
              response: {
                status: 403,
                data: {
                  message: "Account is inactive. Please contact support.",
                },
              },
            });
          }
          const token = "mocked-jwt-token-patient";
          const patient = {
            _id: registeredPatient._id,
            email: registeredPatient.email,
            firstName: registeredPatient.firstName,
            lastName: registeredPatient.lastName,
            phone: registeredPatient.phone,
            isEmailVerified: true,
          };
          return Promise.resolve(makeAxiosResponse({ token, patient }, 200));
        }
      }

      return Promise.reject({
        response: { status: 401, data: { message: "Invalid credentials" } },
      });
    }

    if (pathname === "/api/doctors") {
      const id = String(Date.now() + Math.floor(Math.random() * 1000));
      const newDoc = {
        _id: id,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        department: data.department || "",
        email: data.email || "",
        phone: data.phone || "",
        bio: data.bio || "",
        createdAt: new Date().toISOString(),
      };
      doctors.push(newDoc);
      return Promise.resolve(makeAxiosResponse(newDoc, 201));
    }

    if (pathname === "/api/patients/register") {
      const email = data?.email || "";

      // Check if patient already exists
      if (patients.some((p) => p.email.toLowerCase() === email.toLowerCase())) {
        return Promise.reject({
          response: {
            status: 400,
            data: { message: "Email already registered" },
          },
        });
      }

      const id = String(Date.now() + Math.floor(Math.random() * 1000));
      const newPatient = {
        _id: id,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: email,
        phone: data.phone || "",
        password: data.password || "",
        isEmailVerified: false,
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      patients.push(newPatient);
      return Promise.resolve(
        makeAxiosResponse(
          {
            message:
              "Registration successful. Please check your email to verify your account.",
            patient: { _id: newPatient._id, email: newPatient.email },
          },
          201,
        ),
      );
    }

    return Promise.reject({
      response: { status: 404, data: { message: "Mock POST: Not found" } },
    });
  }
  return original.post(url, data, config);
};

axios.put = async function (url, data, config) {
  if (typeof url === "string" && url.startsWith(API_URL)) {
    const u = new URL(url);
    const pathname = u.pathname;

    // PUT /api/appointments/:id/status
    if (pathname.includes("/appointments/") && pathname.endsWith("/status")) {
      const parts = pathname.split("/");
      const id = parts[parts.length - 2];
      const idx = appointments.findIndex((a) => a._id === id);
      if (idx === -1)
        return Promise.reject({
          response: { status: 404, data: { message: "Not found" } },
        });
      appointments[idx] = { ...appointments[idx], status: data.status };
      return Promise.resolve(makeAxiosResponse(appointments[idx], 200));
    }

    // PUT /api/appointments/:id
    if (pathname.startsWith("/api/appointments/")) {
      const parts = pathname.split("/");
      const id = parts[parts.length - 1];
      const idx = appointments.findIndex((a) => a._id === id);
      if (idx === -1)
        return Promise.reject({
          response: { status: 404, data: { message: "Not found" } },
        });
      appointments[idx] = { ...appointments[idx], ...data };
      return Promise.resolve(makeAxiosResponse(appointments[idx], 200));
    }

    // PUT /api/doctors/:id
    if (pathname.startsWith("/api/doctors/")) {
      const parts = pathname.split("/");
      const id = parts[parts.length - 1];
      const idx = doctors.findIndex((d) => d._id === id);
      if (idx === -1)
        return Promise.reject({
          response: { status: 404, data: { message: "Not found" } },
        });
      doctors[idx] = { ...doctors[idx], ...data };
      return Promise.resolve(makeAxiosResponse(doctors[idx], 200));
    }

    return Promise.reject({
      response: { status: 404, data: { message: "Mock PUT: Not found" } },
    });
  }
  return original.put(url, data, config);
};

axios.patch = async function (url, data, config) {
  if (typeof url === "string" && url.startsWith(API_URL)) {
    const u = new URL(url);
    const pathname = u.pathname;

    // PATCH /api/appointments/:id/status
    if (pathname.includes("/appointments/") && pathname.endsWith("/status")) {
      const parts = pathname.split("/");
      const id = parts[parts.length - 2];
      const idx = appointments.findIndex((a) => a._id === id);
      if (idx === -1)
        return Promise.reject({
          response: { status: 404, data: { message: "Not found" } },
        });
      appointments[idx] = { ...appointments[idx], status: data.status };
      return Promise.resolve(makeAxiosResponse(appointments[idx], 200));
    }

    // PATCH /api/patients/:id/toggle-status
    if (
      pathname.startsWith("/api/patients/") &&
      pathname.endsWith("/toggle-status")
    ) {
      const parts = pathname.split("/");
      const id = parts[parts.length - 2];
      const idx = patients.findIndex((p) => p._id === id);
      if (idx === -1)
        return Promise.reject({
          response: { status: 404, data: { message: "Not found" } },
        });
      patients[idx].isActive = !patients[idx].isActive;
      return Promise.resolve(makeAxiosResponse(patients[idx], 200));
    }

    return Promise.reject({
      response: { status: 404, data: { message: "Mock PATCH: Not found" } },
    });
  }
  return original.patch
    ? original.patch(url, data, config)
    : original.put(url, data, config);
};

axios.delete = async function (url, config) {
  if (typeof url === "string" && url.startsWith(API_URL)) {
    const u = new URL(url);
    const pathname = u.pathname;

    if (pathname.startsWith("/api/appointments/")) {
      const parts = pathname.split("/");
      const id = parts[parts.length - 1];
      const idx = appointments.findIndex((a) => a._id === id);
      if (idx === -1)
        return Promise.reject({
          response: { status: 404, data: { message: "Not found" } },
        });
      const removed = appointments.splice(idx, 1)[0];
      return Promise.resolve(makeAxiosResponse(removed, 200));
    }

    if (pathname.startsWith("/api/patients/")) {
      const parts = pathname.split("/");
      const id = parts[parts.length - 1];
      const idx = patients.findIndex((p) => p._id === id);
      if (idx === -1)
        return Promise.reject({
          response: { status: 404, data: { message: "Not found" } },
        });
      const removed = patients.splice(idx, 1)[0];
      return Promise.resolve(makeAxiosResponse(removed, 200));
    }

    if (pathname.startsWith("/api/doctors/")) {
      const parts = pathname.split("/");
      const id = parts[parts.length - 1];
      const idx = doctors.findIndex((d) => d._id === id);
      if (idx === -1)
        return Promise.reject({
          response: { status: 404, data: { message: "Not found" } },
        });
      const removed = doctors.splice(idx, 1)[0];
      return Promise.resolve(makeAxiosResponse(removed, 200));
    }

    if (pathname.startsWith("/api/departments/")) {
      const parts = pathname.split("/");
      const id = parts[parts.length - 1];
      const idx = departments.findIndex((d) => d._id === id);
      if (idx === -1)
        return Promise.reject({
          response: { status: 404, data: { message: "Not found" } },
        });
      const removed = departments.splice(idx, 1)[0];
      return Promise.resolve(makeAxiosResponse(removed, 200));
    }

    return Promise.reject({
      response: { status: 404, data: { message: "Mock DELETE: Not found" } },
    });
  }
  return original.delete(url, config);
};

console.info("apiMock: enabled — intercepting requests to", API_URL);
