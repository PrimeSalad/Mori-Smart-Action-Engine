#!/bin/bash

# Mori ActionPoint Development Startup Script

echo "🚀 Starting Mori ActionPoint Development Environment..."
echo ""

# Check if .env exists in backend
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env not found!"
    echo "   Creating from .env.example..."
    cp backend/.env.example backend/.env
    echo "   ✅ Created backend/.env - Please configure your API keys!"
    echo ""
fi

# Check if .env exists in frontend
if [ ! -f "mori/.env" ]; then
    echo "⚠️  Warning: mori/.env not found!"
    echo "   Creating from .env.example..."
    cp mori/.env.example mori/.env
    echo "   ✅ Created mori/.env"
    echo ""
fi

# Check if GEMINI_API_KEY is configured
if grep -q "your_gemini_api_key_here" backend/.env; then
    echo "❌ ERROR: GEMINI_API_KEY not configured!"
    echo "   Please edit backend/.env and add your Gemini API key"
    echo "   Get one at: https://makersuite.google.com/app/apikey"
    echo ""
    exit 1
fi

echo "📦 Installing dependencies..."
echo ""

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd mori
npm install
cd ..

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "🎯 Starting servers..."
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers in parallel
trap 'kill 0' EXIT

cd backend && npm run dev &
cd mori && npm run dev &

wait
