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

describe('test lists', () => {
  test('should not index lists without authentication', async () => {
    await request(server)
      .get('/lists')
      .set('Accept', 'application/json')
      .expect(401);
  });
  test('should not create list without authentication', async () => {
    await request(server)
      .post('/lists')
      .send({
        name: 'List2',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
  });
});
