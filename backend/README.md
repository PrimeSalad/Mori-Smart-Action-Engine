# Mori ActionPoint Backend API

Backend API for processing incident reports using Google Gemini 2.5 Flash AI and email notifications.

## Features

- **Text Processing**: Analyze text reports using Google Gemini AI
- **Image Analysis**: Extract information from images using Gemini Vision
- **Voice Transcription**: Convert audio recordings to text (Google Speech-to-Text)
- **AI-Powered Analysis**: Generate summaries, suggest agencies, and create email templates
- **Email Notifications**: Send reports to agencies and confirmations to users
- **Secure & Scalable**: Rate limiting, CORS, helmet security, input validation

## Tech Stack

- **Node.js** + **Express** - Server framework
- **Google Gemini API** - AI analysis and content generation
- **Google Speech-to-Text** - Audio transcription (optional)
- **Nodemailer** - Email delivery
- **Multer** - File upload handling
- **Joi** - Input validation
- **Helmet** - Security headers
- **Morgan** - Request logging

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Google Gemini API (REQUIRED)
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration (OPTIONAL - for sending emails)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### 3. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key and paste it in your `.env` file

### 4. Configure Email (Optional)

For Gmail:
1. Enable 2-factor authentication on your Google account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the app password in `EMAIL_PASSWORD` (not your regular password)

For other email services, update `EMAIL_SERVICE` accordingly.

### 5. Configure Speech-to-Text (Optional)

For audio transcription, you need Google Cloud Speech-to-Text:

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Speech-to-Text API
3. Create a service account and download the JSON key
4. Set environment variable:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
   ```

**Note**: Audio transcription will use a mock fallback if not configured.

### 6. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and configuration info.

### Process Report
```
POST /api/reports/process
Content-Type: multipart/form-data

Body:
- type: "text" | "image" | "audio"
- textInput: string (for text type)
- file: File (for image/audio type)
- imageDescription: string (optional, for image type)

Response:
{
  "success": true,
  "data": {
    "summary": "...",
    "agencies": ["...", "..."],
    "email": "...",
    "transcription": "..." (for audio only)
  }
}
```

### Submit Report
```
POST /api/reports/submit
Content-Type: application/json

Body:
{
  "reportContent": "...",
  "referenceId": "...",
  "selectedAgencies": [
    {
      "id": "...",
      "name": "...",
      "fullName": "...",
      "email": "..."
    }
  ],
  "userEmail": "..." (optional)
}

Response:
{
  "success": true,
  "message": "Report submitted successfully",
  "data": {
    "agencyEmails": [...],
    "userConfirmation": {...}
  }
}
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── reportController.js    # Request handlers
│   ├── services/
│   │   ├── geminiService.js       # Google Gemini AI integration
│   │   ├── speechService.js       # Speech-to-text service
│   │   └── emailService.js        # Email sending service
│   ├── routes/
│   │   └── reportRoutes.js        # API routes
│   ├── middleware/
│   │   └── upload.js              # File upload middleware
│   └── validators/
│       └── reportValidator.js     # Input validation
├── server.js                      # Express app setup
├── package.json
└── .env.example
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad request (validation error)
- `429` - Too many requests (rate limit)
- `500` - Internal server error

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Joi schema validation
- **File Size Limits**: 10MB maximum
- **File Type Validation**: Only images and audio files

## Development Tips

1. **Testing the API**: Use tools like Postman or curl
2. **Logs**: Check console output for detailed error messages
3. **Mock Mode**: The system works without email/speech-to-text configured
4. **CORS**: Update `CORS_ORIGIN` if frontend runs on different port

## Troubleshooting

### "GEMINI_API_KEY is not configured"
- Make sure you created `.env` file
- Verify the API key is correct
- Restart the server after adding the key

### "Email service not configured"
- Email is optional - reports will still process
- Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
- For Gmail, use an App Password, not your regular password

### "Speech-to-Text service not configured"
- Audio transcription is optional
- Set `GOOGLE_APPLICATION_CREDENTIALS` environment variable
- The system will use a mock transcription as fallback

### CORS errors
- Update `CORS_ORIGIN` in `.env` to match your frontend URL
- Restart the server after changing CORS settings

## License

MIT
