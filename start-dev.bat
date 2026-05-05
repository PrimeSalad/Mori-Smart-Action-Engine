@echo off
REM FixFinder Development Startup Script for Windows

echo 🚀 Starting FixFinder Development Environment...
echo.

REM Check if .env exists in backend
if not exist "backend\.env" (
    echo ⚠️  Warning: backend\.env not found!
    echo    Creating from .env.example...
    copy "backend\.env.example" "backend\.env"
    echo    ✅ Created backend\.env - Please configure your API keys!
    echo.
)

REM Check if .env exists in frontend
if not exist "mori\.env" (
    echo ⚠️  Warning: mori\.env not found!
    echo    Creating from .env.example...
    copy "mori\.env.example" "mori\.env"
    echo    ✅ Created mori\.env
    echo.
)

REM Check if GEMINI_API_KEY is configured
findstr /C:"your_gemini_api_key_here" "backend\.env" >nul
if %errorlevel% equ 0 (
    echo ❌ ERROR: GEMINI_API_KEY not configured!
    echo    Please edit backend\.env and add your Gemini API key
    echo    Get one at: https://makersuite.google.com/app/apikey
    echo.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
cd ..

REM Install frontend dependencies
echo Installing frontend dependencies...
cd mori
call npm install
cd ..

echo.
echo ✅ Dependencies installed!
echo.
echo 🎯 Starting servers...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop servers
echo.

REM Start both servers
start "FixFinder Backend" cmd /k "cd backend && npm run dev"
start "FixFinder Frontend" cmd /k "cd mori && npm run dev"

echo.
echo ✅ Servers started in separate windows!
echo.
pause
