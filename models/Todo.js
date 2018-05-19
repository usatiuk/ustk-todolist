const mongoose = require('mongoose');

const TodoList = mongoose.model('TodoList');
const { Schema } = mongoose;

const TodoSchema = Schema({
  text: {
    type: String,
    required: true,
  },
  list: { type: Schema.Types.ObjectId, ref: 'TodoList', required: true },
  completed: { type: Boolean, default: false },
});

TodoSchema.pre('save', async function () {
  const list = await TodoList.findById(this.list);
  list.todos.push(this.id);
  await list.save();
});

TodoSchema.pre('remove', async function () {
  const list = await TodoList.findById(this.list);
  list.todos.remove(this.id);
  await list.save();
});

mongoose.model('Todo', TodoSchema);
