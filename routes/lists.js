const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const TodoList = mongoose.model('TodoList');

const asyncHelper = require('../asyncHelper');

const listIdMiddleware = require('./listIdMiddleware');

// index
router.get(
  '/',
  asyncHelper(async (req, res) => {
    const lists = await TodoList.find({})
      .populate('todos')
      .exec();
    res.json(lists);
  }),
);

// create
router.post(
  '/',
  asyncHelper(async (req, res) => {
    const { name } = req.body;
    const newList = new TodoList({ name });
    await newList.save();
    res.json({ success: true });
  }),
);

// delete
router.delete(
  '/:slug',
  listIdMiddleware,
  asyncHelper(async (req, res) => {
    const { listId } = res.locals;
    const list = await TodoList.findById(listId)
      .populate('todos')
      .exec();
    await list.remove();
    res.json({ success: true });
  }),
);

// update
router.patch(
  '/:slug',
  listIdMiddleware,
  asyncHelper(async (req, res) => {
    const { listId } = res.locals;
    const { name } = req.body;
    const patch = {};
    if (name) {
      patch.name = name;
    }
    const list = await TodoList.findByIdAndUpdate(
      { _id: listId },
      { $set: patch },
      { new: true },
    ).exec();
    await list.slugify();
    await list.save();
    res.json({ success: true });
  }),
);
router.use('/:slug/todos', listIdMiddleware, require('./todos'));

module.exports = router;
