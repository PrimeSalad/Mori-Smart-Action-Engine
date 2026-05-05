# Mori ActionPoint Deployment Checklist

Use this checklist to ensure proper deployment of the Mori ActionPoint system.

## 📋 Pre-Deployment Checklist

### Backend Setup
- [ ] Node.js 18+ installed
- [ ] All dependencies installed (`npm install`)
- [ ] `.env` file created from `.env.example`
- [ ] `GEMINI_API_KEY` configured
- [ ] `PORT` configured (default: 5000)
- [ ] `CORS_ORIGIN` set to frontend URL
- [ ] Email service configured (optional)
- [ ] Speech-to-Text configured (optional)
- [ ] Server starts without errors (`npm run dev`)
- [ ] Health endpoint accessible (`/health`)

### Frontend Setup
- [ ] Node.js 18+ installed
- [ ] All dependencies installed (`npm install`)
- [ ] `.env` file created from `.env.example`
- [ ] `VITE_API_URL` points to backend
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Frontend starts without errors (`npm run dev`)

### Testing
- [ ] Text input processing works
- [ ] Image upload works
- [ ] Voice recording works (or mock fallback)
- [ ] AI generates summaries
- [ ] Agencies are suggested
- [ ] Reports are editable
- [ ] Email validation works
- [ ] Report submission succeeds
- [ ] No console errors
- [ ] No backend errors

## 🚀 Development Deployment

### Local Development
```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your keys
npm run dev

# Frontend
cd mori
npm install
cp .env.example .env
# Edit .env with backend URL
npm run dev
```

**Verify**:
- [ ] Backend: http://localhost:5000/health returns OK
- [ ] Frontend: http://localhost:5173 loads
- [ ] Can submit test report
- [ ] No errors in console or terminal

## 🌐 Production Deployment

### Backend Deployment Options

#### Option 1: Heroku
```bash
cd backend
heroku create mori-actionpoint-api
heroku config:set GEMINI_API_KEY=your_key
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://your-frontend.com
git push heroku main
```

**Checklist**:
- [ ] App created on Heroku
- [ ] Environment variables set
- [ ] Deployed successfully
- [ ] Health endpoint accessible
- [ ] Logs show no errors

#### Option 2: Railway
1. [ ] Connect GitHub repository
2. [ ] Select backend directory
3. [ ] Add environment variables:
   - `GEMINI_API_KEY`
   - `NODE_ENV=production`
   - `CORS_ORIGIN`
4. [ ] Deploy
5. [ ] Verify deployment URL

#### Option 3: DigitalOcean App Platform
1. [ ] Create new app
2. [ ] Connect repository
3. [ ] Configure build settings
4. [ ] Add environment variables
5. [ ] Deploy
6. [ ] Verify deployment

#### Option 4: AWS Elastic Beanstalk
1. [ ] Install EB CLI
2. [ ] Initialize EB app
3. [ ] Configure environment
4. [ ] Set environment variables
5. [ ] Deploy
6. [ ] Configure security groups

### Frontend Deployment Options

#### Option 1: Vercel (Recommended)
```bash
cd mori
npm install -g vercel
vercel login
vercel
```

**Checklist**:
- [ ] Project deployed
- [ ] Environment variable `VITE_API_URL` set
- [ ] Build successful
- [ ] Site accessible
- [ ] API calls work

#### Option 2: Netlify
```bash
cd mori
npm run build
# Drag dist folder to Netlify
```

**Checklist**:
- [ ] Build completed
- [ ] Environment variables set
- [ ] Site deployed
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled

#### Option 3: GitHub Pages
```bash
cd mori
npm install --save-dev gh-pages
# Add to package.json:
# "homepage": "https://username.github.io/repo-name"
# "predeploy": "npm run build"
# "deploy": "gh-pages -d dist"
npm run deploy
```

**Checklist**:
- [ ] gh-pages installed
- [ ] Scripts added to package.json
- [ ] Deployed successfully
- [ ] Site accessible

#### Option 4: AWS S3 + CloudFront
1. [ ] Build frontend (`npm run build`)
2. [ ] Create S3 bucket
3. [ ] Enable static website hosting
4. [ ] Upload dist folder
5. [ ] Configure CloudFront
6. [ ] Set up custom domain

## 🔐 Security Checklist

### Backend Security
- [ ] Environment variables not committed
- [ ] `.env` in `.gitignore`
- [ ] HTTPS enabled in production
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Helmet security headers active
- [ ] Input validation working
- [ ] File upload restrictions enforced
- [ ] Error messages don't expose sensitive data
- [ ] Dependencies up to date (`npm audit`)

### Frontend Security
- [ ] API URL uses HTTPS in production
- [ ] No API keys in frontend code
- [ ] Environment variables properly used
- [ ] XSS protection enabled
- [ ] Dependencies up to date (`npm audit`)

## 📊 Post-Deployment Verification

### Backend Tests
```bash
# Health check
curl https://your-backend.com/health

# Process text report
curl -X POST https://your-backend.com/api/reports/process \
  -F "type=text" \
  -F "textInput=Test report"

# Check logs
# Heroku: heroku logs --tail
# Railway: Check dashboard
# AWS: CloudWatch logs
```

**Verify**:
- [ ] Health endpoint returns 200
- [ ] API endpoints respond correctly
- [ ] No errors in logs
- [ ] Response times acceptable (< 10s)

### Frontend Tests
- [ ] Site loads without errors
- [ ] Can open report modal
- [ ] Can submit text report
- [ ] Can upload image
- [ ] Can record voice (or see mock message)
- [ ] AI analysis works
- [ ] Report submission succeeds
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Works in Chrome, Firefox, Safari

### Integration Tests
- [ ] Frontend can reach backend
- [ ] CORS working properly
- [ ] File uploads work
- [ ] Email sending works (if configured)
- [ ] Error handling works
- [ ] Loading states display
- [ ] Success messages show

## 🔧 Configuration Verification

### Environment Variables

**Backend Production**:
```env
NODE_ENV=production
PORT=5000
GEMINI_API_KEY=your_production_key
CORS_ORIGIN=https://your-frontend-domain.com
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

**Frontend Production**:
```env
VITE_API_URL=https://your-backend-domain.com/api
```

**Checklist**:
- [ ] All required variables set
- [ ] URLs use HTTPS
- [ ] API keys are production keys
- [ ] Email credentials correct (if used)
- [ ] No development URLs in production

## 📈 Monitoring Setup

### Backend Monitoring
- [ ] Error logging configured
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring set up
- [ ] Alert notifications configured

### Frontend Monitoring
- [ ] Error tracking (e.g., Sentry)
- [ ] Analytics (e.g., Google Analytics)
- [ ] Performance monitoring
- [ ] User feedback system

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy Backend
        # Add deployment steps
      - name: Deploy Frontend
        # Add deployment steps
```

**Checklist**:
- [ ] CI/CD pipeline configured
- [ ] Automated tests run
- [ ] Deployment on push to main
- [ ] Rollback strategy defined

## 📝 Documentation

- [ ] README.md updated with production URLs
- [ ] API documentation accessible
- [ ] User guide created
- [ ] Admin documentation written
- [ ] Troubleshooting guide available

## 🎯 Performance Optimization

### Backend
- [ ] Compression enabled
- [ ] Caching configured
- [ ] Database indexed (if applicable)
- [ ] Connection pooling set up
- [ ] Rate limiting optimized

### Frontend
- [ ] Assets minified
- [ ] Images optimized
- [ ] Code splitting enabled
- [ ] Lazy loading implemented
- [ ] CDN configured

## 🆘 Rollback Plan

### If Deployment Fails
1. [ ] Revert to previous version
2. [ ] Check error logs
3. [ ] Verify environment variables
4. [ ] Test locally
5. [ ] Fix issues
6. [ ] Redeploy

### Rollback Commands
```bash
# Heroku
heroku rollback

# Vercel
vercel rollback

# Git
git revert HEAD
git push
```

## ✅ Final Verification

### Smoke Tests
- [ ] Homepage loads
- [ ] Can create report
- [ ] AI processing works
- [ ] Email sending works (if configured)
- [ ] Mobile works
- [ ] All browsers work

### Load Testing
- [ ] Test with 10 concurrent users
- [ ] Verify response times
- [ ] Check error rates
- [ ] Monitor resource usage

### User Acceptance
- [ ] Test with real users
- [ ] Gather feedback
- [ ] Fix critical issues
- [ ] Document known issues

## 🎉 Launch Checklist

- [ ] All tests passing
- [ ] Documentation complete
- [ ] Monitoring active
- [ ] Backup strategy in place
- [ ] Support plan ready
- [ ] Marketing materials prepared
- [ ] Launch announcement ready

## 📞 Support Contacts

- **Technical Issues**: [Your email]
- **API Issues**: [Google Gemini Support]
- **Hosting Issues**: [Hosting provider support]

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Version**: _______________

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Completed | ⬜ Issues Found

---

**Good luck with your deployment!** 🚀
