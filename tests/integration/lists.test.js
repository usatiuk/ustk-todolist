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
  test('should index lists', async () => {
    const response = await request(server)
      .get('/api/lists')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    expect(response.body.data[0].name).toEqual('List1');
  });
  test('should not index lists without authentication', async () => {
    await request(server)
      .get('/api/lists')
      .set('Accept', 'application/json')
      .expect(401);
  });
  test('should create list', async () => {
    const response = await request(server)
      .post('/api/lists')
      .send({
        name: 'List2',
      })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    expect(await TodoList.findOne({ name: 'List2' })).toBeTruthy();
    const freshUser = await User.findById(user.id).exec();
    expect(freshUser.lists).toContain(response.body.data.id);
  });
  test('should not create list without authentication', async () => {
    await request(server)
      .post('/api/lists')
      .send({
        name: 'List2',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
  });
  test('should update list', async () => {
    const response = await request(server)
      .patch(`/api/lists/${list._id}`)
      .send({
        name: 'List2',
      })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    expect(await TodoList.findOne({ name: 'List2' })).toBeTruthy();
  });
  test('should not update list without authentication', async () => {
    await request(server)
      .patch(`/api/lists/${list._id}`)
      .send({
        name: 'List2',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
    expect(await TodoList.findOne({ name: 'List2' })).toBeFalsy();
  });
  test('should remove list', async () => {
    const response = await request(server)
      .delete(`/api/lists/${list._id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    expect(await TodoList.findOne({ name: 'List1' }).exec()).toBeFalsy();
    expect(await Todo.findOne({ text: 'Todo1' }).exec()).toBeFalsy();
    const freshUser = await User.findById(user.id).exec();
    expect(freshUser.lists).not.toContain(list._id);
    expect(freshUser.todos).not.toContain(todo._id);
  });
  test('should not remove list without authentication', async () => {
    await request(server)
      .delete(`/api/lists/${list._id}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
    expect(await TodoList.findOne({ name: 'List1' }).exec()).toBeTruthy();
    expect(await Todo.findOne({ text: 'Todo1' }).exec()).toBeTruthy();
    const freshUser = await User.findById(user.id).exec();
    expect(freshUser.lists).toContain(list._id);
    expect(freshUser.todos).toContain(todo._id);
  });
});
