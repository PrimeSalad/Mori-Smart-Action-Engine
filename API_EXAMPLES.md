# Mori ActionPoint API Examples

Complete examples of API requests and responses for testing and integration.

## 🔗 Base URL

**Development**: `http://localhost:5000/api`
**Production**: `https://your-backend-domain.com/api`

## 📡 Endpoints

### 1. Health Check

Check if the API is running and configured.

**Request**:
```bash
curl http://localhost:5000/health
```

**Response** (200 OK):
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

---

### 2. Process Text Report

Analyze text input and generate report.

**Request**:
```bash
curl -X POST http://localhost:5000/api/reports/process \
  -F "type=text" \
  -F "textInput=There is a broken streetlight on Main Street near the park. It has been dark for 3 days and is causing safety concerns for pedestrians at night."
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "summary": "A streetlight on Main Street near the park has been non-functional for three days, creating safety hazards for pedestrians during nighttime hours.",
    "agencies": [
      "Department of Public Works and Highways (DPWH)",
      "Department of the Interior and Local Government (DILG)",
      "Local Barangay Office"
    ],
    "email": "Subject: Report of Non-Functional Streetlight - Main Street\n\nDear Sir/Madam,\n\nI am writing to report a non-functional streetlight located on Main Street near the park. This streetlight has been inoperative for approximately three days, creating a significant safety concern for pedestrians who use this area during nighttime hours.\n\nThe lack of adequate lighting poses risks including:\n- Increased vulnerability to accidents\n- Reduced visibility for pedestrians\n- Potential security concerns\n\nI kindly request that your office prioritize the repair or replacement of this streetlight to ensure the safety and security of the community.\n\nThank you for your attention to this matter.\n\nSincerely,\n[Your Name]",
    "transcription": null
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "error": "Text input is required"
}
```

---

### 3. Process Image Report

Analyze uploaded image and generate report.

**Request**:
```bash
curl -X POST http://localhost:5000/api/reports/process \
  -F "type=image" \
  -F "file=@/path/to/pothole.jpg" \
  -F "imageDescription=Large pothole on highway causing traffic issues"
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "summary": "A large pothole on the highway is causing significant traffic disruption and poses a safety hazard to vehicles. The damage appears to be approximately 2 feet in diameter and several inches deep.",
    "agencies": [
      "Department of Public Works and Highways (DPWH)",
      "Metropolitan Manila Development Authority (MMDA)",
      "Local Government Unit"
    ],
    "email": "Subject: Urgent Road Repair Required - Highway Pothole\n\nDear Sir/Madam,\n\nI am reporting a significant road hazard on the highway that requires immediate attention. A large pothole, approximately 2 feet in diameter and several inches deep, has formed and is causing:\n\n- Traffic congestion as vehicles swerve to avoid it\n- Potential damage to vehicles\n- Safety risks for motorists\n- Possible accidents if not addressed promptly\n\nPhotographic evidence is attached for your reference. This issue requires urgent repair to prevent accidents and further road deterioration.\n\nI request that your department prioritize this repair work.\n\nThank you for your prompt attention.\n\nSincerely,\n[Your Name]",
    "transcription": null
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "error": "Image file is required"
}
```

**Error Response** (400 Bad Request - Invalid File):
```json
{
  "success": false,
  "error": "Invalid file type. Only images (JPEG, PNG, WEBP) and audio (WEBM, WAV, MP3, OGG) are allowed."
}
```

---

### 4. Process Audio Report

Transcribe audio and analyze content.

**Request**:
```bash
curl -X POST http://localhost:5000/api/reports/process \
  -F "type=audio" \
  -F "file=@/path/to/recording.webm"
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "summary": "A taxi driver overcharged a passenger 500 pesos for a trip that should have cost 200 pesos. The incident occurred on January 15th near the airport.",
    "agencies": [
      "Land Transportation Franchising and Regulatory Board (LTFRB)",
      "Department of Transportation (DOTr)",
      "Philippine National Police (PNP)"
    ],
    "email": "Subject: Complaint - Taxi Fare Overcharging Incident\n\nDear Sir/Madam,\n\nI am filing a formal complaint regarding a fare overcharging incident that occurred on January 15th near the airport.\n\nIncident Details:\n- Date: January 15th\n- Location: Near the airport\n- Issue: Taxi driver charged 500 pesos for a trip\n- Expected fare: 200 pesos\n- Overcharge amount: 300 pesos\n\nThis represents a 150% overcharge and is a clear violation of fare regulations. Such practices harm consumers and damage the reputation of legitimate taxi operators.\n\nI request that your office:\n1. Investigate this complaint\n2. Take appropriate action against the driver\n3. Ensure compliance with fare regulations\n\nThank you for addressing this matter.\n\nSincerely,\n[Your Name]",
    "transcription": "I want to report a fare overcharging incident. A taxi driver charged me 500 pesos for a trip that should only cost 200 pesos. This happened on January 15th near the airport."
  }
}
```

**Note**: If Speech-to-Text is not configured, the transcription will be a mock message.

---

### 5. Submit Report

Submit final report to selected agencies.

**Request**:
```bash
curl -X POST http://localhost:5000/api/reports/submit \
  -H "Content-Type: application/json" \
  -d '{
    "reportContent": "OFFICIAL INCIDENT REPORT\nReference: AP-ABC123\nDate: January 15, 2024\nTime: 10:30 AM\n\nISSUE TYPE: Infrastructure / Road Concern\nPRIORITY: High\n\nDESCRIPTION:\nThere is a broken streetlight on Main Street near the park...",
    "referenceId": "AP-ABC123",
    "selectedAgencies": [
      {
        "id": "dpwh",
        "name": "DPWH",
        "fullName": "Department of Public Works and Highways",
        "email": "comms@dpwh.gov.ph"
      },
      {
        "id": "dilg",
        "name": "DILG",
        "fullName": "Department of the Interior and Local Government",
        "email": "info@dilg.gov.ph"
      }
    ],
    "userEmail": "user@example.com"
  }'
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Report submitted successfully",
  "data": {
    "agencyEmails": [
      {
        "agency": "DPWH",
        "success": true,
        "messageId": "<abc123@gmail.com>"
      },
      {
        "agency": "DILG",
        "success": true,
        "messageId": "<def456@gmail.com>"
      }
    ],
    "userConfirmation": {
      "success": true,
      "messageId": "<ghi789@gmail.com>"
    }
  }
}
```

**Response** (200 OK - Email Not Configured):
```json
{
  "success": true,
  "message": "Report submitted successfully",
  "data": {
    "agencyEmails": [
      {
        "agency": "DPWH",
        "success": false,
        "error": "Email service not configured"
      },
      {
        "agency": "DILG",
        "success": false,
        "error": "Email service not configured"
      }
    ],
    "userConfirmation": null
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

**Error Response** (400 Bad Request - Validation):
```json
{
  "success": false,
  "error": "\"selectedAgencies\" must contain at least 1 items"
}
```

---

## 🧪 Testing with Postman

### Import Collection

Create a new Postman collection with these requests:

**1. Health Check**
- Method: GET
- URL: `{{baseUrl}}/health`

**2. Process Text Report**
- Method: POST
- URL: `{{baseUrl}}/api/reports/process`
- Body: form-data
  - type: text
  - textInput: Your test text

**3. Process Image Report**
- Method: POST
- URL: `{{baseUrl}}/api/reports/process`
- Body: form-data
  - type: image
  - file: [Select image file]
  - imageDescription: Optional description

**4. Submit Report**
- Method: POST
- URL: `{{baseUrl}}/api/reports/submit`
- Headers: Content-Type: application/json
- Body: raw (JSON)

**Environment Variables**:
```json
{
  "baseUrl": "http://localhost:5000"
}
```

---

## 🔍 Error Codes

| Status Code | Meaning | Common Causes |
|-------------|---------|---------------|
| 200 | Success | Request processed successfully |
| 400 | Bad Request | Invalid input, missing fields, validation error |
| 429 | Too Many Requests | Rate limit exceeded (100 req/15min) |
| 500 | Internal Server Error | Server error, API key issue, service unavailable |

---

## 📊 Rate Limiting

**Limit**: 100 requests per 15 minutes per IP address

**Response when limit exceeded** (429):
```json
{
  "success": false,
  "error": "Too many requests from this IP, please try again later."
}
```

**Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1642248000
```

---

## 🔐 Authentication

Currently, the API does not require authentication. For production use, consider adding:
- API keys
- JWT tokens
- OAuth 2.0

---

## 🌐 CORS

**Allowed Origins**: Configured in `CORS_ORIGIN` environment variable

**Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS

**Allowed Headers**: Content-Type, Authorization

---

## 📝 Request Validation

### Process Report Validation

**Required Fields**:
- `type`: Must be "text", "image", or "audio"
- `textInput`: Required when type is "text"
- `file`: Required when type is "image" or "audio"

**Optional Fields**:
- `imageDescription`: String, used with image type

### Submit Report Validation

**Required Fields**:
- `reportContent`: String, non-empty
- `referenceId`: String, non-empty
- `selectedAgencies`: Array, minimum 1 item
  - Each agency must have: id, name, fullName, email

**Optional Fields**:
- `userEmail`: String, must be valid email format if provided

---

## 💡 Tips for Integration

1. **Error Handling**: Always check the `success` field in responses
2. **File Uploads**: Use FormData for file uploads
3. **Rate Limiting**: Implement retry logic with exponential backoff
4. **Timeouts**: Set appropriate timeouts (10-15 seconds for AI processing)
5. **Validation**: Validate inputs on frontend before sending to API
6. **Loading States**: Show loading indicators during AI processing
7. **Error Messages**: Display user-friendly error messages

---

## 🧪 Sample Test Data

### Text Inputs
```
1. "Broken streetlight on Main Street causing safety concerns"
2. "Taxi driver overcharged me 300 pesos for a short trip"
3. "Large pothole on highway exit causing traffic delays"
4. "Illegal dumping of garbage in residential area"
5. "Fire hazard - exposed electrical wires on utility pole"
```

### Expected Agency Matches
1. DPWH, DILG
2. LTFRB, DOTr
3. DPWH, MMDA
4. DENR, DILG
5. BFP, Local Government

---

## 📞 Support

For API issues:
- Check backend logs
- Verify environment variables
- Test with curl/Postman
- Review error messages
- Check CORS configuration

---

**Happy Testing!** 🚀
