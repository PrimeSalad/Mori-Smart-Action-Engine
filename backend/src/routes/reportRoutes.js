const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const reportValidator = require('../validators/reportValidator');
const upload = require('../middleware/upload');
const { verifyFileSignature } = require('../middleware/upload');

/**
 * POST /api/reports/process
 * Process report input (text, image, or audio) and generate AI analysis
 */
router.post(
  '/process',
  upload.single('file'),
  verifyFileSignature,
  reportValidator.validateProcessReport,
  reportController.processReport
);

/**
 * POST /api/reports/submit
 * Submit final report to selected agencies
 */
router.post(
  '/submit',
  reportValidator.validateSubmitReport,
  reportController.submitReport
);

module.exports = router;
