const request = require('supertest');
const app = require('../src/App'); // Adjust if your app export is different

describe('Auth API', () => {
  it('should return 400 for missing credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.statusCode).toBe(400);
  });
});
