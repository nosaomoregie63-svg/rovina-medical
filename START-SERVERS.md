# 🚀 Starting Rovina Medical Development Environment

## Quick Start (Recommended)

Run both frontend and backend servers simultaneously from the root directory:

```bash
npm run dev
```

This will:

- Start the backend API on `http://localhost:5000`
- Start the frontend on `http://localhost:5173`

**Note:** You must have `node_modules` installed. If you haven't done so, run:

```bash
npm run install:all
```

---

## Individual Server Startup

### Start Backend Only

```bash
npm run dev:backend
```

Backend will run on: `http://localhost:5000`

### Start Frontend Only

```bash
npm run dev:frontend
```

Frontend will run on: `http://localhost:5173`

---

## Windows Quick Start Batch File

If you prefer a one-click solution, create a file named `START.bat` in the root directory:

```batch
@echo off
echo Starting Rovina Medical Services...
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
npm run dev
pause
```

Then simply double-click `START.bat` to launch both servers.

---

## Troubleshooting

### Port Already in Use

If you get "Port 5000 is already in use":

1. Find the process: `netstat -ano | findstr :5000`
2. Kill it: `taskkill /PID [PID] /F`
3. Then restart

### Dependencies Not Installed

Run:

```bash
npm run install:all
```

### Services Still Showing 404 Error

1. Ensure the backend is running first (wait 2-3 seconds)
2. Check that `VITE_USE_MOCK=false` in `.env.local`
3. Refresh your browser or restart the frontend

---

## API Endpoints Available

Once the backend is running:

- `GET /api/departments` - Fetch all departments
- `GET /api/doctors` - Fetch doctors
- `POST /api/appointments` - Create appointments
- `POST /api/auth/login` - Admin login
- And more...

Visit `http://localhost:5000` to see available endpoints.
