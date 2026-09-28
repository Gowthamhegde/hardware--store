const jwt = require('jsonwebtoken');
const env = require('../config/env');
const prisma = require('../config/db');
const { UnauthorizedError, ForbiddenError } = require('../utils/errors');

const authenticate = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError('You are not logged in. Please log in to get access.');
    }

    // Verify token — explicitly specify algorithm to prevent algorithm confusion attacks
    let decoded;
    try {
      decoded = jwt.verify(token, env.JWT_ACCESS_SECRET, { algorithms: ['HS256'] });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Your session has expired. Please log in again.');
      }
      throw new UnauthorizedError('Invalid or malformed token.');
    }

    // Ensure required fields exist in payload
    if (!decoded.id || !decoded.role) {
      throw new UnauthorizedError('Invalid token payload.');
    }

    // Check if user still exists
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        created_at: true,
        // Never select password_hash
      },
    });

    if (!currentUser) {
      throw new UnauthorizedError('The user belonging to this token no longer exists.');
    }

    // Attach safe user object to request
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ForbiddenError('You do not have permission to perform this action'));
    }
    next();
  };
};

module.exports = {
  authenticate,
  restrictTo,
};
