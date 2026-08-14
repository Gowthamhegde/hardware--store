const { ZodError } = require('zod');
const { ValidationError } = require('../utils/errors');

const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    // Update req properties with the validated and transformed data
    req.body = result.body;
    req.query = result.query;
    req.params = result.params;
    
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      }));
      next(new ValidationError('Validation Error', formattedErrors));
    } else {
      next(error);
    }
  }
};

module.exports = { validate };
