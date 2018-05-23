const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Todo = mongoose.model('Todo');

const asyncHelper = require('../asyncHelper');

const { NotFoundError } = require('../errors');
// index
router.get(
  '/',
  asyncHelper(async (req, res) => {
    const { listId } = res.locals || req.body;
    const todos = await Todo.find({ list: listId }).exec();
    res.json({ success: true, data: todos.map(todo => todo.toJson()) });
  }),
);

// create
router.post(
  '/',
  asyncHelper(async (req, res) => {
    const { listId } = res.locals || req.body;
    const { text } = req.body;
    console.log(req.body);
    const todo = new Todo({ text, list: listId });
    await todo.save();
    res.json({ success: true, data: todo.toJson() });
  }),
);

// update
router.patch(
  '/:todoId',
  asyncHelper(async (req, res) => {
    const { todoId } = req.params;
    const { text, completed } = req.body;
    const patch = {};
    if (text !== undefined) {
      patch.text = text;
    }
    if (completed !== undefined) {
      patch.completed = completed;
    }
    const todo = await Todo.findByIdAndUpdate(
      { _id: todoId },
      { $set: patch },
      { new: true },
    ).exec();
    if (!todo) {
      throw new NotFoundError(`can't find todo with id ${todoId}`);
    }
    res.json({ success: true, data: todo.toJson() });
  }),
);

// delete
router.delete(
  '/:todoId',
  asyncHelper(async (req, res) => {
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId).exec();
    if (!todo) {
      throw new NotFoundError(`can't find todo with id ${todoId}`);
    }
    await todo.remove();
    res.json({ success: true });
  }),
);

module.exports = router;
