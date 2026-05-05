# FixFinder - Complete Setup Guide

This guide will help you set up the complete FixFinder system with React frontend and Node.js backend.

## 🎯 Overview

FixFinder is a web-based incident reporting system that uses Google Gemini AI to:
- Analyze text, image, and voice reports
- Generate professional summaries
- Suggest relevant government agencies
- Create email templates
- Send reports to agencies

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Google Gemini API Key** (required)
- **Gmail Account** (optional, for email features)
- **Google Cloud Account** (optional, for speech-to-text)

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
CORS_ORIGIN=http://localhost:5173

# Optional: Email configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

**Get Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in and click "Create API Key"
3. Copy and paste into `.env`

```bash
# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd mori

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `mori/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
# Start frontend development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 3. Test the System

1. Open `http://localhost:5173` in your browser
2. Click "Report a Problem" button
3. Try submitting a text report:
   - Example: "The streetlight on Main Street has been broken for 3 days"
4. Watch the AI generate a report and suggest agencies
5. Review and submit the report

## 🔧 Detailed Configuration

### Google Gemini API Setup

**Required** - This is the core AI service.

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `backend/.env`:
   ```env
   GEMINI_API_KEY=AIzaSy...your_key_here
   ```

**Free Tier**: 60 requests per minute

### Email Service Setup (Optional)

For sending reports to agencies and confirmations to users.

#### Gmail Configuration:

1. **Enable 2-Factor Authentication**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Visit [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Update `.env`**:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   ```

#### Other Email Services:

For Outlook, Yahoo, etc., update `EMAIL_SERVICE`:
```env
EMAIL_SERVICE=outlook
EMAIL_USER=your.email@outlook.com
EMAIL_PASSWORD=your_password
```

**Note**: If email is not configured, the system will still work but won't send actual emails.

### Speech-to-Text Setup (Optional)

For transcribing voice recordings.

1. **Create Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project

2. **Enable Speech-to-Text API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Cloud Speech-to-Text API"
   - Click "Enable"

3. **Create Service Account**:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Grant "Cloud Speech Client" role
   - Create and download JSON key

4. **Set Environment Variable**:
   ```bash
   # Linux/Mac
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
   
   # Windows (PowerShell)
   $env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\service-account-key.json"
   ```

**Note**: If not configured, audio transcription will use a mock fallback.

## 📁 Project Structure

```
fixfinder/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic (Gemini, Email, Speech)
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Upload, validation
│   │   └── validators/        # Input validation
│   ├── server.js              # Express app
│   ├── package.json
│   └── .env                   # Configuration
│
├── mori/                      # React + Vite frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   └── ReportModal.jsx
│   │   ├── services/          # API client
│   │   │   └── reportService.js
│   │   └── pages/             # Page components
│   ├── package.json
│   └── .env                   # Frontend config
│
└── SETUP_GUIDE.md            # This file
```

## 🧪 Testing the Features

### 1. Text Input
```
Input: "There's a pothole on 5th Avenue causing traffic issues"
Expected: AI analyzes and suggests DPWH, MMDA
```

### 2. Image Upload
```
Action: Upload image of broken streetlight
Expected: AI analyzes image and generates report
```

### 3. Voice Recording
```
Action: Record voice describing an issue
Expected: Transcription + AI analysis
```

### 4. Email Submission
```
Action: Submit report with email address
Expected: Confirmation email sent to user
```

## 🔍 API Testing

Use curl or Postman to test endpoints:

### Health Check
```bash
curl http://localhost:5000/health
```

### Process Text Report
```bash
curl -X POST http://localhost:5000/api/reports/process \
  -F "type=text" \
  -F "textInput=Broken streetlight on Main Street"
```

### Process Image Report
```bash
curl -X POST http://localhost:5000/api/reports/process \
  -F "type=image" \
  -F "file=@/path/to/image.jpg" \
  -F "imageDescription=Pothole on highway"
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is available
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill process if needed
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

### "GEMINI_API_KEY is not configured"
- Verify `.env` file exists in `backend/` directory
- Check API key is correct (starts with `AIzaSy`)
- Restart backend server after adding key

### CORS errors in browser
- Verify `CORS_ORIGIN` in `backend/.env` matches frontend URL
- Default should be `http://localhost:5173`
- Restart backend after changing

### Email not sending
- Email is optional - system works without it
- Check Gmail App Password (not regular password)
- Verify 2FA is enabled on Google account
- Check console logs for detailed error messages

### Image upload fails
- Max file size: 10MB
- Supported formats: JPG, PNG, WEBP
- Check browser console for errors

### Voice recording not working
- Browser needs microphone permission
- HTTPS required in production (not localhost)
- Check browser console for permission errors

## 🚀 Production Deployment

### Backend (Node.js)

**Environment Variables:**
```env
NODE_ENV=production
PORT=5000
GEMINI_API_KEY=your_production_key
CORS_ORIGIN=https://your-frontend-domain.com
```

**Deployment Options:**
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **DigitalOcean**: Use App Platform
- **AWS**: Elastic Beanstalk or EC2

### Frontend (React)

**Build:**
```bash
cd mori
npm run build
```

**Deployment Options:**
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload `dist` folder

**Update API URL:**
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 📊 Monitoring

### Backend Logs
```bash
# Development
npm run dev  # Shows all logs

# Production
pm2 start server.js --name fixfinder
pm2 logs fixfinder
```

### Check API Health
```bash
curl https://your-backend-domain.com/health
```

## 🔐 Security Checklist

- [ ] Never commit `.env` files
- [ ] Use App Passwords for Gmail (not regular password)
- [ ] Enable rate limiting (already configured)
- [ ] Use HTTPS in production
- [ ] Validate all user inputs (already implemented)
- [ ] Keep dependencies updated: `npm audit fix`
- [ ] Set strong `NODE_ENV=production` in production

## 📚 Additional Resources

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)

## 💡 Tips

1. **Development**: Use `npm run dev` for auto-reload
2. **Testing**: Test with mock data before configuring email
3. **Debugging**: Check browser console and server logs
4. **Performance**: Gemini API has rate limits (60/min free tier)
5. **Costs**: Gemini free tier is generous for development

## 🆘 Getting Help

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review backend logs: `npm run dev` output
3. Check browser console for frontend errors
4. Verify all environment variables are set
5. Ensure all dependencies are installed: `npm install`

## ✅ Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Gemini API key configured
- [ ] Can submit text reports
- [ ] AI generates summaries
- [ ] Agencies are suggested
- [ ] Can edit generated reports
- [ ] (Optional) Email sending works
- [ ] (Optional) Voice transcription works

## 🎉 You're Ready!

Your FixFinder system should now be fully operational. Start by testing with simple text reports, then try images and voice recordings.

Happy reporting! 🚀
