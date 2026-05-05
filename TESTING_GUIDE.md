# FixFinder Testing Guide

Complete guide for testing all features of the FixFinder system.

## 🎯 Prerequisites

Before testing, ensure:
- ✅ Backend server running on `http://localhost:5000`
- ✅ Frontend server running on `http://localhost:5173`
- ✅ `GEMINI_API_KEY` configured in `backend/.env`
- ✅ Browser console open (F12) for debugging

## 🧪 Test Scenarios

### Test 1: Text Input Report

**Objective**: Test basic text report processing with AI analysis

**Steps**:
1. Open `http://localhost:5173`
2. Click "Report a Problem" button
3. Ensure "TYPE" tab is selected
4. Enter test text:
   ```
   There is a broken streetlight on Main Street near the park. 
   It has been dark for 3 days and is causing safety concerns 
   for pedestrians at night.
   ```
5. Click "GENERATE REPORT"
6. Wait for AI processing (2-3 seconds)

**Expected Results**:
- ✅ Loading animation appears
- ✅ AI generates a summary
- ✅ Suggested agencies appear (likely DPWH, DILG)
- ✅ Professional email template is generated
- ✅ Report is editable
- ✅ Reference ID is generated (format: AP-XXXXXX)

**Verify**:
- Summary is concise and accurate
- Agencies match the issue type
- Email template is professional
- Priority level is assigned (High/Medium/Low)

---

### Test 2: Image Upload Report

**Objective**: Test image analysis using Gemini Vision

**Steps**:
1. Click "Report a Problem"
2. Select "UPLOAD" tab
3. Drag and drop an image OR click "Choose File"
4. Use test image: photo of pothole, broken infrastructure, or garbage
5. (Optional) Add description: "Large pothole causing traffic issues"
6. Click "GENERATE REPORT"

**Expected Results**:
- ✅ Image preview appears
- ✅ File info shows (size, type)
- ✅ AI analyzes image content
- ✅ Summary describes what's in the image
- ✅ Relevant agencies suggested based on image

**Test Images to Try**:
- Pothole → Should suggest DPWH
- Garbage dump → Should suggest DENR
- Traffic issue → Should suggest MMDA
- Fire hazard → Should suggest BFP

---

### Test 3: Voice Recording Report

**Objective**: Test audio recording and transcription

**Steps**:
1. Click "Report a Problem"
2. Select "RECORD" tab
3. Click microphone icon to start recording
4. Speak clearly for 10-15 seconds:
   ```
   "I want to report a fare overcharging incident. 
   A taxi driver charged me 500 pesos for a trip 
   that should only cost 200 pesos. This happened 
   on January 15th near the airport."
   ```
5. Click stop button (square icon)
6. Verify recording appears with duration
7. Click "GENERATE REPORT"

**Expected Results**:
- ✅ Recording timer shows elapsed time
- ✅ Audio waveform animation appears
- ✅ Recording saved with playback option
- ✅ Transcription generated (or mock if not configured)
- ✅ AI analyzes transcribed text
- ✅ Suggested agencies (LTFRB for fare issues)

**Note**: If Speech-to-Text not configured, mock transcription will be used.

---

### Test 4: Report Review & Edit

**Objective**: Test report editing and agency selection

**Steps**:
1. Generate any report (text/image/voice)
2. On review screen, verify:
   - Reference ID displayed
   - Priority badge shown
   - Issue type tag visible
3. Edit the report text:
   - Add additional details
   - Fix any errors
   - Modify formatting
4. Click "Reset" to restore original
5. Toggle agency selections:
   - Uncheck recommended agencies
   - Check additional agencies
   - Verify count updates

**Expected Results**:
- ✅ Report is fully editable
- ✅ Changes are preserved
- ✅ Reset button restores original
- ✅ Agency selection updates count
- ✅ Recommended agencies are highlighted
- ✅ All agency info visible (name, email)

---

### Test 5: Email Submission (Optional)

**Objective**: Test email notification system

**Prerequisites**: Email configured in `backend/.env`

**Steps**:
1. Generate and review a report
2. Scroll to "Email for Updates" section
3. Enter your email address
4. Click "SEND REPORT"
5. Wait for submission

**Expected Results**:
- ✅ Email validation works
- ✅ Invalid emails show error
- ✅ Submission shows loading state
- ✅ Success screen appears
- ✅ Confirmation email received (if configured)

**Test Cases**:
- Valid email: `test@example.com` ✅
- Invalid email: `notanemail` ❌
- Empty email: Should work (optional field) ✅

---

### Test 6: Error Handling

**Objective**: Test system resilience and error messages

**Test 6.1: Empty Submission**
1. Open report modal
2. Click "GENERATE REPORT" without input
3. **Expected**: Button disabled, no action

**Test 6.2: Network Error**
1. Stop backend server
2. Try to generate report
3. **Expected**: Error message displayed

**Test 6.3: Invalid File Type**
1. Try uploading a PDF or text file
2. **Expected**: Error message about file type

**Test 6.4: Large File**
1. Try uploading image > 10MB
2. **Expected**: Error message about file size

**Test 6.5: API Key Missing**
1. Remove `GEMINI_API_KEY` from `.env`
2. Restart backend
3. Try generating report
4. **Expected**: 500 error with clear message

---

### Test 7: Multiple Reports

**Objective**: Test system with multiple sequential reports

**Steps**:
1. Submit a text report → Complete
2. Close modal and reopen
3. Submit an image report → Complete
4. Close modal and reopen
5. Submit a voice report → Complete

**Expected Results**:
- ✅ Each report gets unique reference ID
- ✅ Modal resets between submissions
- ✅ No data leaks between reports
- ✅ All reports process successfully

---

### Test 8: UI/UX Testing

**Objective**: Test user interface and experience

**Test 8.1: Responsive Design**
- Resize browser window
- Test on mobile viewport (375px)
- Test on tablet viewport (768px)
- **Expected**: Layout adapts properly

**Test 8.2: Keyboard Navigation**
- Use Tab key to navigate
- Use Enter to submit
- Use Escape to close modal
- **Expected**: All actions work

**Test 8.3: Loading States**
- Verify spinner during processing
- Check progress bar animation
- Confirm button states change
- **Expected**: Clear feedback at all times

**Test 8.4: Accessibility**
- Test with screen reader
- Check color contrast
- Verify focus indicators
- **Expected**: Accessible to all users

---

## 🔍 API Testing (Advanced)

### Using curl

**Test Health Endpoint**:
```bash
curl http://localhost:5000/health
```

**Test Text Processing**:
```bash
curl -X POST http://localhost:5000/api/reports/process \
  -F "type=text" \
  -F "textInput=Test report about broken streetlight"
```

**Test Image Processing**:
```bash
curl -X POST http://localhost:5000/api/reports/process \
  -F "type=image" \
  -F "file=@/path/to/image.jpg" \
  -F "imageDescription=Pothole on highway"
```

**Test Report Submission**:
```bash
curl -X POST http://localhost:5000/api/reports/submit \
  -H "Content-Type: application/json" \
  -d '{
    "reportContent": "Test report content",
    "referenceId": "AP-TEST01",
    "selectedAgencies": [{
      "id": "dpwh",
      "name": "DPWH",
      "fullName": "Department of Public Works and Highways",
      "email": "comms@dpwh.gov.ph"
    }],
    "userEmail": "test@example.com"
  }'
```

### Using Postman

1. Import collection from API documentation
2. Set base URL: `http://localhost:5000/api`
3. Test each endpoint
4. Verify responses match schema

---

## 📊 Performance Testing

### Load Testing

**Test Concurrent Requests**:
```bash
# Install Apache Bench
# Mac: brew install httpd
# Ubuntu: apt-get install apache2-utils

# Test 100 requests, 10 concurrent
ab -n 100 -c 10 http://localhost:5000/health
```

**Expected Performance**:
- Health check: < 50ms
- Text processing: 2-5 seconds (Gemini API)
- Image processing: 3-7 seconds (Gemini Vision)
- Report submission: 1-3 seconds (with email)

---

## 🐛 Common Issues & Solutions

### Issue: "GEMINI_API_KEY is not configured"
**Solution**: 
```bash
# Check .env file exists
cat backend/.env

# Verify API key is set
grep GEMINI_API_KEY backend/.env

# Restart backend server
```

### Issue: CORS errors in browser
**Solution**:
```bash
# Check CORS_ORIGIN in backend/.env
# Should match frontend URL
CORS_ORIGIN=http://localhost:5173
```

### Issue: Image upload fails
**Solution**:
- Check file size < 10MB
- Verify file type (JPG, PNG, WEBP)
- Check browser console for errors

### Issue: Email not sending
**Solution**:
- Email is optional - system works without it
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- For Gmail, use App Password (not regular password)
- Verify 2FA enabled on Google account

### Issue: Voice recording not working
**Solution**:
- Grant microphone permission in browser
- Check browser console for errors
- Try different browser (Chrome recommended)
- HTTPS required in production

---

## ✅ Test Checklist

Use this checklist to verify all features:

### Core Features
- [ ] Text report processing works
- [ ] Image upload and analysis works
- [ ] Voice recording works (or mock fallback)
- [ ] AI generates summaries
- [ ] Agencies are suggested correctly
- [ ] Email templates are generated
- [ ] Reports are editable
- [ ] Agency selection works
- [ ] Reference IDs are unique

### UI/UX
- [ ] Modal opens and closes
- [ ] Tabs switch correctly
- [ ] Loading states show
- [ ] Error messages display
- [ ] Success confirmation appears
- [ ] Responsive on mobile
- [ ] Keyboard navigation works
- [ ] Escape key closes modal

### Optional Features
- [ ] Email sending works (if configured)
- [ ] Speech-to-text works (if configured)
- [ ] User confirmation emails sent

### Error Handling
- [ ] Empty input prevented
- [ ] Invalid files rejected
- [ ] Network errors handled
- [ ] API errors displayed
- [ ] Email validation works

---

## 📈 Success Metrics

A successful test run should achieve:
- ✅ 100% core features working
- ✅ < 5 second average processing time
- ✅ No console errors
- ✅ All UI states functional
- ✅ Proper error handling
- ✅ Responsive design working

---

## 🎓 Next Steps

After testing:
1. Review any failed tests
2. Check logs for errors
3. Verify API key configuration
4. Test edge cases
5. Prepare for production deployment

---

## 📞 Support

If tests fail:
1. Check SETUP_GUIDE.md
2. Review backend logs
3. Check browser console
4. Verify environment variables
5. Ensure dependencies installed

Happy testing! 🚀
