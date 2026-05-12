# 🚀 QUICK FIX REFERENCE

## The Problem

❌ Services page shows: `GET http://localhost:5000/api/departments 404 (Not Found)`

## The Cause

Backend server wasn't running when frontend tried to fetch data

## The Solution (3 Steps)

### Step 1: Install Dependencies (First Time Only)

```bash
npm run install:all
```

### Step 2: Start Both Servers - Choose One:

**Windows (EASIEST):**

- Double-click `START.bat`

**Command Line (All Platforms):**

```bash
npm run dev
```

### Step 3: Open in Browser

```
http://localhost:5173
```

---

## ✅ You'll Know It's Working When:

1. Terminal shows both servers started
2. Browser shows `http://localhost:5173` loading
3. No 404 errors in browser console (F12)
4. Services page displays without errors
5. Browser console shows: `✓ Services fetched successfully from API`

---

## Port Reference

- Backend API: `http://localhost:5000`
- Frontend: `http://localhost:5173`

---

## If Port 5000 is Already Used

```powershell
taskkill /F /IM node.exe
```

Then run `npm run dev` again

---

## Individual Server Commands

```bash
npm run dev:backend    # Backend only
npm run dev:frontend   # Frontend only
npm run dev            # Both together ✓ USE THIS
```

---

**That's it! No more 404 errors.** ✨
