const { AppError } = require('../utils/errors');
const env = require('../config/env');

const errorHandler = (err, req, res, next) => {
  // Always log full error server-side
  console.error('[ERROR]', {
    message: err.message,
    code: err.code,
    path: req.path,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString(),
    // Only log stack in development
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });

  let statusCode = 500;
  let code = 'INTERNAL_ERROR';
  let message = 'An unexpected error occurred';
  let details = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    code = err.code;
    message = err.message;
    if (err.errors) {
      details = err.errors;
    }
  } else if (err.name === 'PrismaClientKnownRequestError') {
    if (err.code === 'P2002') {
      statusCode = 409;
      code = 'CONFLICT';
      message = 'Resource already exists';
      // Never expose Prisma meta in production
      if (env.NODE_ENV === 'development') {
        details = err.meta;
      }
    }
  } else if (err.name === 'ZodError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = 'Validation failed';
    details = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
    }));
  } else if (err.message === 'Not allowed by CORS') {
    statusCode = 403;
    code = 'CORS_ERROR';
    message = 'Origin not allowed';
  }

  const errorResponse = {
    error: {
      message,
      code,
      ...(details && { details }),
    },
  };

  // Only expose stack trace in development — never in production
  if (env.NODE_ENV === 'development' && statusCode === 500) {
    errorResponse.error.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: {
      message: 'Resource not found',
      code: 'NOT_FOUND',
    },
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
