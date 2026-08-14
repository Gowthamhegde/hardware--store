const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/db');

describe('Auth API', () => {
  const testUser = {
    name: 'Test Auth User',
    email: `testauth${Date.now()}@example.com`,
    password: 'password123',
    phone: '1234567890'
  };

  let token;

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body.user).toHaveProperty('email', testUser.email);
  });

  it('should not register user with duplicate email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    expect(res.statusCode).toEqual(400);
  });

  it('should login user and return token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
    token = res.body.accessToken;
  });

  it('should access protected route with token', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.user).toHaveProperty('email', testUser.email);
  });
});
