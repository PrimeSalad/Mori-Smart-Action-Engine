# FixFinder Quick Reference

Quick reference for developers working with FixFinder.

## 🚀 Quick Commands

### Start Development
```bash
# Automated start (recommended)
./start-dev.sh          # Linux/Mac
start-dev.bat           # Windows

# Manual start
cd backend && npm run dev    # Terminal 1
cd mori && npm run dev       # Terminal 2
```

### Install Dependencies
```bash
cd backend && npm install
cd mori && npm install
```

### Build for Production
```bash
cd backend && npm start
cd mori && npm run build
```

## 🔑 Environment Variables

### Backend (.env)
```env
# Required
GEMINI_API_KEY=your_key_here

# Optional
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/health` | Health check |
| POST | `/api/reports/process` | Process report input |
| POST | `/api/reports/submit` | Submit final report |

## 🧪 Test Inputs

### Text Report
```
There is a broken streetlight on Main Street near the park. 
It has been dark for 3 days causing safety concerns.
```

### Voice Recording Script
```
I want to report a fare overcharging incident. 
A taxi driver charged me 500 pesos for a trip 
that should only cost 200 pesos.
```

### Test Agencies
- **LTFRB** - Transport/Fare issues
- **DPWH** - Infrastructure/Roads
- **DENR** - Environment/Pollution
- **BFP** - Fire/Emergency
- **PNP** - Crime/Security
- **MMDA** - Traffic/Metro Manila

## 🔧 Common Tasks

### Reset Everything
```bash
# Stop servers (Ctrl+C)
# Clear node_modules
rm -rf backend/node_modules mori/node_modules
# Reinstall
cd backend && npm install
cd mori && npm install
```

### Check Logs
```bash
# Backend logs
cd backend && npm run dev

# Frontend logs
cd mori && npm run dev

# Check browser console (F12)
```

### Update Dependencies
```bash
cd backend && npm update
cd mori && npm update
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | `lsof -ti:5000 \| xargs kill -9` (Mac/Linux) |
| CORS error | Check `CORS_ORIGIN` in backend/.env |
| API key error | Verify `GEMINI_API_KEY` in backend/.env |
| Email not sending | Optional feature - check EMAIL_* vars |
| Build fails | Delete node_modules and reinstall |

## 📁 Project Structure

```
fixfinder/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Express middleware
│   │   └── validators/       # Input validation
│   ├── server.js             # Entry point
│   └── .env                  # Configuration
│
├── mori/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API client
│   │   └── pages/            # Page components
│   └── .env                  # Frontend config
│
└── docs/
    ├── SETUP_GUIDE.md        # Complete setup
    ├── TESTING_GUIDE.md      # Testing instructions
    └── QUICK_REFERENCE.md    # This file
```

## 🔗 Important URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/health
- **Gemini API**: https://makersuite.google.com/app/apikey
- **Gmail App Passwords**: https://myaccount.google.com/apppasswords

## 📦 Key Dependencies

### Backend
- `express` - Web framework
- `@google/generative-ai` - Gemini AI SDK
- `multer` - File uploads
- `nodemailer` - Email sending
- `joi` - Validation
- `helmet` - Security

### Frontend
- `react` - UI framework
- `lucide-react` - Icons
- `tailwindcss` - Styling

## 🎯 Development Workflow

1. **Start servers** → `./start-dev.sh`
2. **Make changes** → Edit files
3. **Test locally** → Use browser + API
4. **Check logs** → Terminal + Console
5. **Commit** → Git commit
6. **Deploy** → Push to production

## 💡 Pro Tips

- Use browser DevTools (F12) for debugging
- Check Network tab for API calls
- Console shows React errors
- Backend logs show API errors
- Test with Postman for API debugging
- Use `.env.example` as template
- Never commit `.env` files
- Keep dependencies updated
- Use `npm audit fix` for security

## 🚨 Emergency Commands

### Kill All Node Processes
```bash
# Mac/Linux
killall node

# Windows
taskkill /F /IM node.exe
```

### Reset Git
```bash
git reset --hard HEAD
git clean -fd
```

### Fresh Install
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Get Help

1. Check [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. Review [TESTING_GUIDE.md](TESTING_GUIDE.md)
3. Check backend logs
4. Check browser console
5. Verify environment variables

---

**Keep this file handy for quick reference!** 🚀
