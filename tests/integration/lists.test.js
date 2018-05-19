const server = require('../../app.js');

const request = require('supertest');
const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await server.close();
});

describe('test lists', () => {
  test('index lists', async () => {
    const response = await request(server)
      .get('/lists')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
  });
});
