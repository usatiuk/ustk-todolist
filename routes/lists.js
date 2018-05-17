const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const { NotFoundError } = require('../errors');

const TodoList = mongoose.model('TodoList');

const asyncHelper = require('../asyncHelper');

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

router.delete(
  '/:id',
  asyncHelper(async (req, res) => {
    const { id } = req.params;
    const list = await TodoList.findById(id)
      .populate('todos')
      .exec();
    if (!list) {
      throw new NotFoundError();
    }
    list.todos.forEach((todo) => {
      todo.remove();
    });
    list.remove();
    res.json({ success: true });
  }),
);
module.exports = router;
