const server = require('../../app.js');

const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Todo = mongoose.model('Todo');
const TodoList = mongoose.model('TodoList');
const User = mongoose.model('User');

jest.setTimeout(60000);
const MongoDBMemoryServer = require('mongodb-memory-server').default;
const { seed, clean } = require('./utils');
const { secret } = require('../../config');

let token;
let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoDBMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  ({ token } = await seed());
});

afterEach(async () => {
  await clean();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await server.close();
});

describe('test users', () => {
  test('should create user', async () => {
    const response = await request(server)
      .post('/users')
      .send({
        username: 'User2',
        password: 'password2',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    const tokenDecoded = jwt.verify(response.body.data.jwt, secret);
    expect(tokenDecoded.username).toEqual('User2');
    const userAuth = await User.authenticate()('User2', 'password2');
    expect(userAuth.user).toBeTruthy();
  });
  test('should not create user with no username', async () => {
    const response = await request(server)
      .post('/users')
      .send({
        username: '',
        password: 'password2',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeFalsy();
  });
  test('should not create user with no password', async () => {
    const response = await request(server)
      .post('/users')
      .send({
        username: 'User',
        password: '',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeFalsy();
  });
  test('should login user', async () => {
    const response = await request(server)
      .post('/users/login')
      .send({
        username: 'User1',
        password: 'password1',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    const tokenDecoded = jwt.verify(response.body.data.jwt, secret);
    expect(tokenDecoded.username).toEqual('User1');
  });
  test('should not login user with no name', async () => {
    await request(server)
      .post('/users/login')
      .send({
        username: '',
        password: 'notpassword',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400);
  });
  test('should not login user with wrong password', async () => {
    await request(server)
      .post('/users/login')
      .send({
        username: 'User',
        password: 'notpassword',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
  });
  test('should update user', async () => {
    const response = await request(server)
      .patch('/users/user')
      .send({
        username: 'User2',
        password: 'password2',
      })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    const tokenDecoded = jwt.verify(response.body.data.jwt, secret);
    expect(tokenDecoded.username).toEqual('User2');
    const userAuth = await User.authenticate()('User2', 'password2');
    expect(userAuth.user).toBeTruthy();
  });
  test('should not update user without authentication', async () => {
    const response = await request(server)
      .patch('/users/user')
      .send({
        username: 'User2',
        password: 'password2',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
    expect(response.body.success).toBeFalsy();
  });
  test('should not delete user without authentication', async () => {
    const response = await request(server)
      .delete('/users/user')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(401);
    expect(response.body.success).toBeFalsy();
    expect(await User.findOne({ username: 'User1' }).exec()).toBeTruthy();
    expect(await TodoList.findOne({ name: 'List1' }).exec()).toBeTruthy();
    expect(await Todo.findOne({ text: 'Todo1' })).toBeTruthy();
  });
  test('should delete user', async () => {
    const response = await request(server)
      .delete('/users/user')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    expect(await User.findOne({ username: 'User1' }).exec()).toBeFalsy();
    expect(await TodoList.findOne({ name: 'List1' }).exec()).toBeFalsy();
    expect(await Todo.findOne({ text: 'Todo1' }).exec()).toBeFalsy();
  });
});
