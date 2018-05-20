const server = require('../../app.js');

const request = require('supertest');
const mongoose = require('mongoose');

const db = require('../../config/db');

const TodoList = mongoose.model('TodoList');
const Todo = mongoose.model('Todo');

let lists;
let listsPopulated;
let todos;

beforeEach(async () => {
  await db.connect();

  // seed lists and todos
  const list1 = new TodoList({ name: 'List1' });
  const todo1 = new Todo({ text: 'Todo1', list: list1._id });
  const todo2 = new Todo({ text: 'Todo2', list: list1._id });

  await list1.save();
  await todo1.save();
  await todo2.save();
  lists = await TodoList.find({}).exec();
  listsPopulated = await TodoList.find({})
    .populate('todos')
    .exec();
  todos = await Todo.find({}).exec();
});

afterEach(async () => {
  await TodoList.remove({}).exec();
  await Todo.remove({}).exec();
  await db.disconnect();
});

afterAll(async () => {
  await server.close();
});

describe('test lists', () => {
  test('should index lists', async () => {
    const response = await request(server)
      .get('/lists')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data).toEqual(listsPopulated.map(list => list.toJson()));
  });
  test('should create list', async () => {
    const response = await request(server)
      .post('/lists')
      .send({
        name: 'List2',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.success).toBeTruthy();
    expect(await TodoList.findOne({ name: 'List2' })).toBeTruthy();
  });
});
