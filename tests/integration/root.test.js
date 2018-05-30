const server = require('../../app.js');

const request = require('supertest');
const mongoose = require('mongoose');

const Todo = mongoose.model('Todo');
const TodoList = mongoose.model('TodoList');
const User = mongoose.model('User');

jest.setTimeout(60000);
const MongoDBMemoryServer = require('mongodb-memory-server').default;
const { seed, clean } = require('./utils');

let user;
let token;
let list;
let todo;
let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoDBMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  ({
    user, token, list, todo,
  } = await seed());
});

afterEach(async () => {
  await clean();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await server.close();
});

describe('test not found', () => {
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
