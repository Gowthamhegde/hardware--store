const { PrismaClient } = require('@prisma/client');

// ponytail: globalThis pattern avoids multiple instances during nodemon hot-reload
const prisma = globalThis.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

module.exports = prisma;
