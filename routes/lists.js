const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const TodoList = mongoose.model('TodoList');

const asyncHelper = require('../asyncHelper');
const { NotFoundError } = require('../errors');

// index
router.get(
  '/',
  asyncHelper(async (req, res) => {
    const lists = await TodoList.find({ user: req.user.id })
      .populate('todos')
      .exec();
    res.json({ success: true, data: lists.map(list => list.toJson()) });
  }),
);

// create
router.post(
  '/',
  asyncHelper(async (req, res) => {
    const { name } = req.body;
    const newList = new TodoList({ name, user: req.user.id });
    await newList.save();
    res.json({ success: true, data: newList.toJson() });
  }),
);

// delete
router.delete(
  '/:listId',
  asyncHelper(async (req, res) => {
    const { listId } = req.params;
    const list = await TodoList.findOne({ _id: listId, user: req.user.id }).exec();
    await list.remove();
    res.json({ success: true });
  }),
);

// update
router.patch(
  '/:listId',
  asyncHelper(async (req, res) => {
    const { listId } = req.params;
    const { name } = req.body;
    const list = await TodoList.findOne({ _id: listId, user: req.user.id });
    if (!list) {
      throw new NotFoundError("can't find list");
    }
    if (name !== undefined) {
      list.name = name;
    }
    await list.save();
    res.json({ success: true, data: list.toJson() });
  }),
);
router.use(
  '/:listId/todos',
  (req, res, next) => {
    res.locals.listId = req.params.listId;
    next();
  },
  require('./todos'),
);

module.exports = router;
