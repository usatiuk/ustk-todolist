const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Todo = mongoose.model("Todo");

const asyncHelper = require("../asyncHelper");

const { NotFoundError } = require("../errors");
// index
router.get(
    "/",
    asyncHelper(async (req, res) => {
        const { listId } = res.locals || req.body;
        const todos = listId
            ? await Todo.find({ list: listId, user: req.user.id }).exec()
            : await Todo.find({ user: req.user.id }).exec();
        res.json({
            success: true,
            data: todos.reverse().map((todo) => todo.toJson()),
        });
    }),
);

// create
router.post(
    "/",
    asyncHelper(async (req, res) => {
        const { listId } = res.locals || req.body;
        const { text } = req.body;
        const { id } = req.body || mongoose.Types.ObjectId();
        const todo = new Todo({
            text,
            list: listId,
            user: req.user.id,
            _id: id,
        });
        await todo.save();
        res.json({ success: true, data: todo.toJson() });
    }),
);

// update
router.patch(
    "/:todoId",
    asyncHelper(async (req, res) => {
        const { todoId } = req.params;
        const { text, completed } = req.body;
        const todo = await Todo.findOne({ _id: todoId, user: req.user.id });
        if (!todo) {
            throw new NotFoundError("can't find todo");
        }
        if (text !== undefined) {
            todo.text = text;
        }
        if (completed !== undefined) {
            todo.completed = completed;
        }
        await todo.save();
        res.json({ success: true, data: todo.toJson() });
    }),
);

// delete
router.delete(
    "/:todoId",
    asyncHelper(async (req, res) => {
        const { todoId } = req.params;
        const todo = await Todo.findOne({
            _id: todoId,
            user: req.user.id,
        }).exec();
        if (!todo) {
            throw new NotFoundError(`can't find todo with id ${todoId}`);
        }
        await todo.remove();
        res.json({ success: true });
    }),
);

module.exports = router;
