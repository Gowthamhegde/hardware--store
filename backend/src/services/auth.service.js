const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const env = require('../config/env');
const { BadRequestError, UnauthorizedError } = require('../utils/errors');

const generateTokens = (user) => {
  const payload = { id: user.id, role: user.role };
  
  const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });
  
  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
  
  return { accessToken, refreshToken };
};

const registerUser = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new BadRequestError('Email already in use');
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

  const { accessToken, refreshToken } = generateTokens(user);

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      user_id: user.id,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    }
  });

  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken };
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const { accessToken, refreshToken } = generateTokens(user);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      user_id: user.id,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }
  });

  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken };
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
    decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
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
      }
    })
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
