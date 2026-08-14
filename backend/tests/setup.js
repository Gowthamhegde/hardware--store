const prisma = require('../src/config/db');

beforeAll(async () => {
  // Any global setup before tests
});

afterAll(async () => {
  await prisma.$disconnect();
});
