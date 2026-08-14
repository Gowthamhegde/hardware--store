const { AppError } = require('../utils/errors');
const env = require('../config/env');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  let statusCode = 500;
  let code = 'INTERNAL_ERROR';
  let message = 'Internal Server Error';
  let details = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    code = err.code;
    message = err.message;
    if (err.errors) {
      details = err.errors;
    }
  } else if (err.name === 'PrismaClientKnownRequestError') {
    // Handle specific Prisma errors
    if (err.code === 'P2002') {
      statusCode = 409;
      code = 'CONFLICT';
      message = 'Unique constraint failed';
      details = err.meta;
    }
  } else if (err.name === 'ZodError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = 'Validation Error';
    details = err.errors;
  }

  const errorResponse = {
    error: {
      message,
      code,
      ...(details && { details }),
    }
  };

  if (env.NODE_ENV === 'development' && statusCode === 500) {
    errorResponse.error.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: {
      message: `Cannot find ${req.originalUrl} on this server`,
      code: 'NOT_FOUND'
    }
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
