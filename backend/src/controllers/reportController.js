const geminiService = require('../services/geminiService');
const emailService = require('../services/emailService');

/**
 * Process report submission and generate AI analysis
 */
exports.processReport = async (req, res) => {
  try {
    const { type, textInput, imageDescription } = req.body;
    let analysisResult;

    // Handle different input types
    switch (type) {
      case 'text':
        if (!textInput || !textInput.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Text input is required',
          });
        }
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

        // Use Gemini to analyze audio directly (includes transcription)
        analysisResult = await geminiService.analyzeAudio(
          req.file.buffer,
          req.file.mimetype
        );
        break;

      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid input type. Must be text, image, or audio',
        });
    }

    // Return the analysis result
    res.json({
      success: true,
      data: {
        summary: analysisResult.summary,
        agencies: analysisResult.agencies,
        email: analysisResult.email,
        transcription: analysisResult.transcription || null,
      },
    });
  } catch (error) {
    console.error('Error processing report:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process report',
    });
  }
};

/**
 * Submit final report to agencies
 */
exports.submitReport = async (req, res) => {
  try {
    const {
      reportContent,
      referenceId,
      selectedAgencies,
      userEmail,
    } = req.body;

    // Validate required fields
    if (!reportContent || !referenceId || !selectedAgencies || selectedAgencies.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const results = {
      agencyEmails: [],
      userConfirmation: null,
    };

    // Send emails to agencies if email service is configured
    try {
      const agencyResults = await emailService.sendReportToAgencies(
        selectedAgencies,
        reportContent,
        referenceId
      );
      results.agencyEmails = agencyResults;
    } catch (error) {
      console.warn('Email service not configured, skipping agency emails:', error.message);
      results.agencyEmails = selectedAgencies.map(agency => ({
        agency: agency.name,
        success: false,
        error: 'Email service not configured',
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
        results.userConfirmation = confirmationResult;
      } catch (error) {
        console.warn('Failed to send user confirmation:', error.message);
        results.userConfirmation = {
          success: false,
          error: error.message,
        };
      }
    }

    res.json({
      success: true,
      message: 'Report submitted successfully',
      data: results,
    });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit report',
    });
  }
};
