@echo off
REM ========================================
REM Rovina Medical - Start Both Servers
REM ========================================
echo.
echo ========================================
echo   ROVINA MEDICAL STARTUP
echo ========================================
echo.
echo Starting Backend and Frontend servers...
echo.
echo Backend will run on:  http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers
echo.
echo ========================================
echo.

REM Check if concurrently is installed
npm list concurrently > nul 2>&1
if %errorlevel% neq 0 (
    echo Installing required dependencies...
    call npm install concurrently --save-dev
)

REM Run both servers
call npm run dev

REM Keep window open if it closes unexpectedly
if %errorlevel% neq 0 (
    echo.
    echo An error occurred. Press any key to exit...
    pause
)
