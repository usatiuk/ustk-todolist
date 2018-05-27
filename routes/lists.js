const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const TodoList = mongoose.model('TodoList');

const asyncHelper = require('../asyncHelper');

// index
router.get(
  '/',
  asyncHelper(async (req, res) => {
    const lists = await TodoList.find({})
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
    const newList = new TodoList({ name });
    await newList.save();
    res.json({ success: true, data: newList.toJson() });
  }),
);

// delete
router.delete(
  '/:listId',
  asyncHelper(async (req, res) => {
    const { listId } = req.params;
    const list = await TodoList.findById(listId)
      .populate('todos')
      .exec();
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
    const patch = {};
    if (name !== undefined) {
      patch.name = name;
    }
    const list = await TodoList.findByIdAndUpdate(
      { _id: listId },
      { $set: patch },
      { new: true },
    ).exec();
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
