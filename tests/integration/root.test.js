const server = require('../../app.js');

const request = require('supertest');
const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await server.close();
});

describe('Test not found', () => {
  test('respond not found with json', async () => {
    const response = await request(server)
      .get('/')
      .set('Accept', 'application/json')
      .expect(404)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body).toEqual({ error: 'Not found' });
  });
  test('respond not found with html', async () => {
    const response = await request(server)
      .get('/')
      .set('Accept', 'text/html')
      .expect(404)
      .expect('Content-Type', 'text/html; charset=utf-8');
    expect(response.text).toEqual('404');
  });
  test('respond not found with plain text', async () => {
    const response = await request(server)
      .get('/')
      .set('Accept', 'text/plain')
      .expect(404)
      .expect('Content-Type', 'text/plain; charset=utf-8');
    expect(response.text).toEqual('not found');
  });
});
