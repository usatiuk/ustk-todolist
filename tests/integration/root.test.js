const server = require('../../app.js');

const request = require('supertest');
const mongoose = require('mongoose');

const Todo = require('../../models/Todo');
const TodoList = require('../../models/TodoList');

const db = require('../../config/db');

beforeEach(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.disconnect();
});

afterAll(async () => {
  await TodoList.remove({}).exec();
  await Todo.remove({}).exec();
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
