const geminiService = require('../services/geminiService');
const emailService = require('../services/emailService');

/**
 * Sanitize a string for safe inclusion in HTML
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Generic internal error response — never leaks stack traces
 */
function internalError(res, err, context) {
  console.error(`[${context}]`, err);
  return res.status(500).json({
    success: false,
    error: 'An unexpected error occurred. Please try again.',
  });
}

/**
 * Process report submission and generate AI analysis
 */
exports.processReport = async (req, res) => {
  try {
    const { type, textInput, imageDescription } = req.body;
    let analysisResult;

    switch (type) {
      case 'text':
        // textInput already validated + trimmed by validator
        analysisResult = await geminiService.analyzeText(textInput);
        break;

      case 'image':
        if (!req.file) {
          return res.status(400).json({
            success: false,
            error: 'Image file is required',
          });
        }
        analysisResult = await geminiService.analyzeImage(
          req.file.buffer,
          req.file.mimetype,
          imageDescription || ''
        );
        break;

      case 'audio':
        if (!req.file) {
          return res.status(400).json({
            success: false,
            error: 'Audio file is required',
          });
        }
        analysisResult = await geminiService.analyzeAudio(
          req.file.buffer,
          req.file.mimetype
        );
        break;

      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid input type',
        });
    }

    return res.json({
      success: true,
      data: {
        summary: analysisResult.summary,
        agencies: analysisResult.agencies,
        email: analysisResult.email,
        transcription: analysisResult.transcription || null,
      },
    });
  } catch (err) {
    return internalError(res, err, 'processReport');
  }
};

/**
 * Submit final report to agencies
 */
exports.submitReport = async (req, res) => {
  try {
    const { reportContent, referenceId, selectedAgencies, userEmail } = req.body;

    const results = {
      agencyEmails: [],
      userConfirmation: null,
    };

    // Send emails to agencies
    try {
      const agencyResults = await emailService.sendReportToAgencies(
        selectedAgencies,
        reportContent,
        referenceId
      );
      // Strip internal error details from agency results before returning
      results.agencyEmails = agencyResults.map((r) => ({
        agency: escapeHtml(r.agency),
        success: r.success,
        ...(r.success ? {} : { error: 'Delivery failed' }),
      }));
    } catch (err) {
      console.warn('[submitReport] Email service unavailable:', err.message);
      results.agencyEmails = selectedAgencies.map((agency) => ({
        agency: escapeHtml(agency.name),
        success: false,
        error: 'Email service not available',
      }));
    }

    // Send confirmation to user if email provided
    if (userEmail && userEmail.trim()) {
      try {
        const confirmationResult = await emailService.sendConfirmationToUser(
          userEmail,
          reportContent,
          referenceId,
          selectedAgencies
        );
        results.userConfirmation = { success: confirmationResult.success };
      } catch (err) {
        console.warn('[submitReport] User confirmation failed:', err.message);
        results.userConfirmation = { success: false, error: 'Confirmation email could not be sent' };
      }
    }

    return res.json({
      success: true,
      message: 'Report submitted successfully',
      data: results,
    });
  } catch (err) {
    return internalError(res, err, 'submitReport');
  }
};
