const server = require('../../app.js');

const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const db = require('../../config/db');
const { secret } = require('../../config');

const User = mongoose.model('User');

let user;
let token;

beforeEach(async () => {
  await db.connect();

  user = new User({ username: 'User' });
  await user.setPassword('password');
  await user.save();
  token = user.generateJwt();
});

afterEach(async () => {
  await User.remove({}).exec();
  await db.disconnect();
});

afterAll(async () => {
  await server.close();
});

describe('test users', () => {
  test('should create user', async () => {
    const response = await request(server)
      .post('/users')
      .send({
        username: 'User 2',
        password: 'password 2',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    const tokenDecoded = jwt.verify(response.body.data.jwt, secret);
    expect(tokenDecoded.username).toEqual('User 2');
    const userAuth = await User.authenticate()('User 2', 'password 2');
    expect(userAuth.user).toBeTruthy();
  });
  test('should not create user with no username', async () => {
    const response = await request(server)
      .post('/users')
      .send({
        username: '',
        password: 'password 2',
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
        username: 'User',
        password: 'password',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    const tokenDecoded = jwt.verify(response.body.data.jwt, secret);
    expect(tokenDecoded.username).toEqual('User');
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
        username: 'User 2',
        password: 'password2',
      })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    const tokenDecoded = jwt.verify(response.body.data.jwt, secret);
    expect(tokenDecoded.username).toEqual('User 2');
    const userAuth = await User.authenticate()('User 2', 'password2');
    expect(userAuth.user).toBeTruthy();
  });
  test('should not update user without authentication', async () => {
    const response = await request(server)
      .patch('/users/user')
      .send({
        username: 'User 2',
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
    expect(await User.findOne({ username: 'User' }).exec()).toBeTruthy();
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
    expect(await User.findOne({ username: 'User' }).exec()).toBeFalsy();
  });
});
