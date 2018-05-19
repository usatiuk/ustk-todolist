const mongoose = require('mongoose');
const asyncHelper = require('../asyncHelper');

const TodoList = mongoose.model('TodoList');

const { NotFoundError } = require('../errors');

// listId middleware
module.exports = asyncHelper(async (req, res, next) => {
  const { slug } = req.params;
  const list = await TodoList.findOne({ slug }).exec();
  if (!list) {
    throw new NotFoundError('cant find list');
  }
  res.locals.listId = list._id;
  next();
});
