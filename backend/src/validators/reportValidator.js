const Joi = require('joi');

/**
 * Validate process report request
 */
exports.validateProcessReport = (req, res, next) => {
  const schema = Joi.object({
    type: Joi.string().valid('text', 'image', 'audio').required(),
    textInput: Joi.string().when('type', {
      is: 'text',
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    imageDescription: Joi.string().optional().allow(''),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }

  next();
};

/**
 * Validate submit report request
 */
exports.validateSubmitReport = (req, res, next) => {
  const agencySchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  const schema = Joi.object({
    reportContent: Joi.string().required(),
    referenceId: Joi.string().required(),
    selectedAgencies: Joi.array().items(agencySchema).min(1).required(),
    userEmail: Joi.string().email().optional().allow(''),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }

  next();
};
