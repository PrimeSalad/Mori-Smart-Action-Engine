# FixFinder - AI-Powered Incident Reporting System

A modern web-based incident reporting platform that uses Google Gemini AI to analyze reports, suggest relevant government agencies, and generate professional email templates.

![FixFinder](https://img.shields.io/badge/Status-Production%20Ready-green)
![Node.js](https://img.shields.io/badge/Node.js-18+-blue)
![React](https://img.shields.io/badge/React-18+-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎯 Features

### Core Functionality
- **Multi-Input Support**: Accept reports via text, image upload, or voice recording
- **AI-Powered Analysis**: Google Gemini AI analyzes and categorizes incidents
- **Smart Agency Matching**: Automatically suggests relevant government agencies
- **Professional Templates**: Generates formal email templates for reporting
- **Editable Reports**: Review and modify AI-generated content before submission
- **Email Notifications**: Send reports to agencies and confirmations to users

### Technical Features
- **Modern Stack**: React + Tailwind CSS frontend, Node.js + Express backend
- **Secure**: Helmet security, CORS protection, rate limiting, input validation
- **Scalable**: Modular architecture, async processing, error handling
- **Developer-Friendly**: Clear documentation, easy setup, comprehensive testing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd fixfinder
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

3. **Setup Frontend**
```bash
cd mori
npm install
cp .env.example .env
```

4. **Start Development Servers**

**Option 1: Automated (Recommended)**
```bash
# Linux/Mac
chmod +x start-dev.sh
./start-dev.sh

# Windows
start-dev.bat
```

**Option 2: Manual**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd mori
npm run dev
```

5. **Open Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📖 Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Complete installation and configuration
- **[Testing Guide](TESTING_GUIDE.md)** - Comprehensive testing instructions
- **[Backend README](backend/README.md)** - API documentation and backend details

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ ReportModal  │  │ Text Input   │  │ Image Upload │     │
│  │  Component   │  │ Voice Record │  │ Processing   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend API (Express)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Controllers  │  │  Validators  │  │  Middleware  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Services Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Gemini AI  │  │ Speech-to-   │  │    Email     │     │
│  │   Service    │  │ Text Service │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Configuration

### Required Environment Variables

**Backend (`backend/.env`)**:
```env
GEMINI_API_KEY=your_api_key_here  # Required
PORT=5000                          # Optional
CORS_ORIGIN=http://localhost:5173 # Optional
```

### Optional Environment Variables

**Email Service**:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

**Speech-to-Text** (requires Google Cloud setup):
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
```

## 📊 API Endpoints

### Process Report
```http
POST /api/reports/process
Content-Type: multipart/form-data

Parameters:
- type: "text" | "image" | "audio"
- textInput: string (for text)
- file: File (for image/audio)
- imageDescription: string (optional)

Response:
{
  "success": true,
  "data": {
    "summary": "...",
    "agencies": ["...", "..."],
    "email": "...",
    "transcription": "..." (audio only)
  }
}
```

### Submit Report
```http
POST /api/reports/submit
Content-Type: application/json

Body:
{
  "reportContent": "...",
  "referenceId": "...",
  "selectedAgencies": [...],
  "userEmail": "..." (optional)
}

Response:
{
  "success": true,
  "message": "Report submitted successfully"
}
```

## 🧪 Testing

Run the complete test suite:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd mori
npm test

# Manual testing
# See TESTING_GUIDE.md for detailed test scenarios
```

## 🚀 Deployment

### Backend Deployment

**Heroku**:
```bash
cd backend
heroku create fixfinder-api
heroku config:set GEMINI_API_KEY=your_key
git push heroku main
```

**Railway/Render**:
- Connect GitHub repository
- Set environment variables
- Deploy automatically

### Frontend Deployment

**Vercel**:
```bash
cd mori
vercel deploy
```

**Netlify**:
```bash
npm run build
# Drag dist folder to Netlify
```

## 🔐 Security

- ✅ Helmet security headers
- ✅ CORS protection
- ✅ Rate limiting (100 req/15min)
- ✅ Input validation (Joi)
- ✅ File size limits (10MB)
- ✅ File type validation
- ✅ Environment variable protection

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** - AI analysis and content generation
- **React** - Frontend framework
- **Tailwind CSS** - Styling
- **Express.js** - Backend framework
- **Nodemailer** - Email delivery

## 📞 Support

- 📖 [Documentation](SETUP_GUIDE.md)
- 🐛 [Issue Tracker](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)

## 🗺️ Roadmap

- [ ] Database integration for report storage
- [ ] User authentication and profiles
- [ ] Report tracking and status updates
- [ ] Admin dashboard for agencies
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics and reporting
- [ ] Integration with government APIs

## 📈 Status

- ✅ Core features complete
- ✅ AI integration working
- ✅ Email notifications functional
- ✅ Production ready
- 🚧 Database integration (planned)
- 🚧 User authentication (planned)

---

**Built with ❤️ for better civic engagement**
