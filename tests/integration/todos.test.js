const server = require('../../app.js');

const request = require('supertest');
const mongoose = require('mongoose');

const Todo = mongoose.model('Todo');
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

describe('test todos', () => {
  test('should index todos', async () => {
    const response = await request(server)
      .get(`/lists/${list._id}/todos`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    expect(response.body.data[0].text).toEqual('Todo1');
  });
  test('should not index todos without authentication', async () => {
    await request(server)
      .get(`/lists/${list._id}/todos`)
      .set('Accept', 'application/json')
      .expect(401);
  });
  test('should create todo', async () => {
    const response = await request(server)
      .post(`/lists/${list._id}/todos`)
      .send({
        text: 'Todo2',
      })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    expect(await Todo.findOne({ text: 'Todo2', list: list._id })).toBeTruthy();
    const freshUser = await User.findById(user.id).exec();
    expect(freshUser.todos).toContain(response.body.data.id);
    const freshList = await User.findById(user.id).exec();
    expect(freshList.todos).toContain(response.body.data.id);
  });
  test('should not create todo without authentication', async () => {
    await request(server)
      .post(`/lists/${list._id}/todos`)
      .send({
        text: 'Todo1',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
  });
  test('should update todo', async () => {
    const response = await request(server)
      .patch(`/lists/${list._id}/todos/${todo._id}`)
      .send({
        text: 'Todo2',
      })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    expect(await Todo.findOne({ text: 'Todo2' })).toBeTruthy();
    expect(await Todo.findOne({ text: 'Todo1' })).toBeFalsy();
  });
  test('should not update todo without authentication', async () => {
    await request(server)
      .patch(`/lists/${list._id}/todos/${todo._id}`)
      .send({
        text: 'Todo2',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
    expect(await Todo.findOne({ text: 'Todo1' })).toBeTruthy();
    expect(await Todo.findOne({ text: 'Todo2' })).toBeFalsy();
  });
  test('should remove todo', async () => {
    const response = await request(server)
      .delete(`/lists/${list._id}/todos/${todo._id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    expect(await Todo.findOne({ text: 'Todo1' }).exec()).toBeFalsy();
    const freshUser = await User.findById(user.id).exec();
    expect(freshUser.todos).not.toContain(todo.id);
    const freshList = await User.findById(user.id).exec();
    expect(freshList.todos).not.toContain(todo.id);
  });
  test('should not remove todo without authentication', async () => {
    await request(server)
      .delete(`/lists/${list._id}/todos/${todo._id}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
    expect(await Todo.findOne({ text: 'Todo1' }).exec()).toBeTruthy();
  });
});
