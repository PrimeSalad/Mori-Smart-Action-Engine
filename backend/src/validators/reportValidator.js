const Joi = require('joi');

// Shared limits
const MAX_TEXT_LENGTH = 5000;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_REPORT_CONTENT_LENGTH = 20000;
const MAX_REFERENCE_ID_LENGTH = 64;
const MAX_AGENCY_NAME_LENGTH = 100;
const MAX_AGENCIES = 10;

/**
 * Validate process report request
 */
exports.validateProcessReport = (req, res, next) => {
  const schema = Joi.object({
    type: Joi.string().valid('text', 'image', 'audio').required(),
    textInput: Joi.string()
      .trim()
      .min(1)
      .max(MAX_TEXT_LENGTH)
      .when('type', {
        is: 'text',
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
    imageDescription: Joi.string()
      .trim()
      .max(MAX_DESCRIPTION_LENGTH)
      .optional()
      .allow(''),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: true, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }

  // Replace body with validated + stripped value
  req.body = value;
  next();
};

/**
 * Validate submit report request
 */
exports.validateSubmitReport = (req, res, next) => {
  const agencySchema = Joi.object({
    id: Joi.string().alphanum().max(64).required(),
    name: Joi.string().trim().max(MAX_AGENCY_NAME_LENGTH).required(),
    fullName: Joi.string().trim().max(MAX_AGENCY_NAME_LENGTH).required(),
    email: Joi.string().email({ tlds: { allow: true } }).max(254).required(),
  });

  const schema = Joi.object({
    reportContent: Joi.string().trim().min(1).max(MAX_REPORT_CONTENT_LENGTH).required(),
    referenceId: Joi.string()
      .pattern(/^[A-Za-z0-9\-_]+$/)
      .max(MAX_REFERENCE_ID_LENGTH)
      .required(),
    selectedAgencies: Joi.array()
      .items(agencySchema)
      .min(1)
      .max(MAX_AGENCIES)
      .required(),
    userEmail: Joi.string().email({ tlds: { allow: true } }).max(254).optional().allow(''),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: true, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }

  // Replace body with validated + stripped value
  req.body = value;
  next();
};
