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
    const { listId } = res.locals;
    const todos = await Todo.find({ list: listId }).exec();
    res.json({ success: true, data: todos.map(todo => todo.toJson()) });
  }),
);

// create
router.post(
  '/',
  asyncHelper(async (req, res) => {
    const { listId } = res.locals;
    const { text } = req.body;
    const todo = new Todo({ text, list: listId });
    await todo.save();
    res.json({ success: true });
  }),
);

// update
router.patch(
  '/:todoId',
  asyncHelper(async (req, res) => {
    const { todoId } = req.params;
    const { text, completed } = req.body;
    const patch = {};
    if (text) {
      patch.text = text;
    }
    if (completed) {
      patch.completed = completed;
    }
    await Todo.update({ _id: todoId }, { $set: patch }).exec();
    res.json({ success: true });
  }),
);

// delete
router.delete(
  '/:todoId',
  asyncHelper(async (req, res) => {
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId).exec();
    if (!todo) {
      throw new NotFoundError('cant find todo');
    }
    await todo.remove();
    res.json({ success: true });
  }),
);

module.exports = router;
