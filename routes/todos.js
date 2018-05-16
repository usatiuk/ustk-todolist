const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const TodoList = mongoose.model("TodoList");
const Todo = mongoose.model("Todo");

const asyncHelper = require("../asyncHelper");

// index
router.get(
  "/",
  asyncHelper(async (req, res) => {
    const todos = await Todo.find({}).exec();
    res.json(todos);
  })
);

// create
router.post(
  "/",
  asyncHelper(async (req, res) => {
    const { text, listId } = req.body;
    const list = await TodoList.findById(listId);
    const todo = new Todo({ text, list: list._id });
    await todo.save();
    list.todos.push(todo.id);
    await list.save();
    res.json({ success: true });
  })
);

module.exports = router;
