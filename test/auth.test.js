const request = require('supertest');
const app = require('../app');

const api = request(app);

describe('Test in app', () => {
  test('should respond', async () => {
    const response = await api.get('/').send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ msg: 'Server is running' });
  });
});

//  This test depends of proper database migration and seeder

describe('Test /api/auth/login', () => {
  test('should respond with a 400 status', async () => {
    const response = await api.post('/api/auth/login').send();
    expect(response.statusCode).toBe(400);
  });
  test('should log in successfully', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ email: 'example@example.com', password: '123123' });
    expect(response.statusCode).toBe(200);
    expect(response.body.msg).toBe('Logged successfully');
    expect(response.body.token).toStrictEqual(expect.any(String));
    expect(response.body.user).toMatchObject({
      name: 'demoUser',
      email: 'example@example.com',
    });
  });
  test('should validate the password field and deny it', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ email: 'example@example.com', password: '1234' });
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe(
      '{"err":[{"value":"1234","msg":"Password must be at least 5 characters long","param":"password","location":"body"}]}'
    );
  });
  test('should validate the password field and deny it', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ email: 'example@example.com', password: '123456' });
    expect(response.statusCode).toBe(401);
    expect(response.text).toBe('{"msg":"Invalid credentials"}');
  });
});
