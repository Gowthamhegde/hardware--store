const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const env = require('../config/env');
const { BadRequestError, UnauthorizedError } = require('../utils/errors');

// ponytail: In-memory login attempt tracking
// ceiling: not distributed-system safe, use Redis in production
const loginAttempts = new Map(); // key: email, value: { count, lockUntil }
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function isAccountLocked(email) {
  const record = loginAttempts.get(email);
  if (!record) return false;
  if (record.lockUntil && record.lockUntil > Date.now()) {
    return true;
  }
  return false;
}

function recordFailedLogin(email) {
  const record = loginAttempts.get(email) || { count: 0, lockUntil: null };
  record.count += 1;
  if (record.count >= MAX_LOGIN_ATTEMPTS) {
    record.lockUntil = Date.now() + LOCK_DURATION_MS;
  }
  loginAttempts.set(email, record);
}

function clearLoginAttempts(email) {
  loginAttempts.delete(email);
}

// Security logger - only log non-sensitive fields
function logAuthEvent(event, email, req) {
  const logEntry = {
    event,
    email,
    ip: req?.ip || 'unknown',
    userAgent: req?.headers?.['user-agent'] || 'unknown',
    timestamp: new Date().toISOString(),
  };
  console.log('[AUTH]', JSON.stringify(logEntry));
}

const generateTokens = (user) => {
  const payload = { id: user.id, role: user.role };

  const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
    algorithm: 'HS256',
  });

  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return { accessToken, refreshToken };
};

const registerUser = async (data, req) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  // Use generic error to prevent user enumeration
  if (existingUser) {
    logAuthEvent('register_duplicate', data.email, req);
    throw new BadRequestError('Registration failed. Please try again.');
  }

  const password_hash = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password_hash,
      phone: data.phone,
    },
  });

  logAuthEvent('register_success', data.email, req);

  const { accessToken, refreshToken } = generateTokens(user);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      user_id: user.id,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken,
  };
};

const loginUser = async (email, password, req) => {
  // Check account lockout
  if (isAccountLocked(email)) {
    logAuthEvent('login_locked', email, req);
    throw new UnauthorizedError(
      'Account temporarily locked due to too many failed attempts. Try again in 15 minutes.'
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Constant-time comparison even if user not found to prevent timing attacks
  const dummyHash = '$2a$12$dummyhashtopreventtimingattacksxxxxxxxxxxxxxxxxxxxxxxxx';
  const isPasswordValid = user
    ? await bcrypt.compare(password, user.password_hash)
    : await bcrypt.compare(password, dummyHash);

  if (!user || !isPasswordValid) {
    recordFailedLogin(email);
    logAuthEvent('login_failure', email, req);
    // Generic message prevents user enumeration
    throw new UnauthorizedError('Invalid credentials');
  }

  // Successful login - clear attempts
  clearLoginAttempts(email);
  logAuthEvent('login_success', email, req);

  const { accessToken, refreshToken } = generateTokens(user);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      user_id: user.id,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken,
  };
};

const refreshAccessToken = async (token) => {
  const savedToken = await prisma.refreshToken.findUnique({
    where: { token },
  });

  if (!savedToken || savedToken.expires_at < new Date()) {
    if (savedToken) {
      await prisma.refreshToken.delete({ where: { token } });
    }
    throw new UnauthorizedError('Refresh token invalid or expired');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, env.JWT_REFRESH_SECRET, { algorithms: ['HS256'] });
  } catch (err) {
    throw new UnauthorizedError('Refresh token invalid');
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user) {
    throw new UnauthorizedError('User no longer exists');
  }

  const { accessToken, refreshToken } = generateTokens(user);

  await prisma.$transaction([
    prisma.refreshToken.delete({ where: { token } }),
    prisma.refreshToken.create({
      data: {
        token: refreshToken,
        user_id: user.id,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  return { accessToken, refreshToken };
};

const logoutUser = async (token) => {
  await prisma.refreshToken.deleteMany({
    where: { token },
  });
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
