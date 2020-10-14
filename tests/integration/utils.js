const mongoose = require('mongoose');

require('../../models/Todo');
require('../../models/TodoList');
require('../../models/User');

const User = mongoose.model('User');
const Todo = mongoose.model('Todo');
const TodoList = mongoose.model('TodoList');

async function seed() {
  const user = new User({ username: 'User1' });
  await user.setPassword('password1');
  await user.save();
  const token = user.generateJwt();

  const list = new TodoList({ name: 'List1', user: user._id });
  const todo = new Todo({ text: 'Todo1', list: list._id, user: user._id });

  await list.save();
  await todo.save();

  return {
    user,
    token,
    list,
    todo,
  };
}

async function clean() {
  await TodoList.remove({}).exec();
  await Todo.remove({}).exec();
  await User.remove({}).exec();
}

const mongodbMemoryServerConfig = {
  binary: {
    version: 'latest',
  },
  instance: {
    args: ['--enableMajorityReadConcern=false'],
  },
};

module.exports = { seed, clean, mongodbMemoryServerConfig };
