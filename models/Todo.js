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
  list.todos.push(this._id);
  await list.save();
});

TodoSchema.pre('remove', async function () {
  const list = await TodoList.findById(this.list);
  list.todos.splice(list.todos.indexOf(this._id), 1);
  await list.save();
});

TodoSchema.methods.toJson = function () {
  return {
    id: this._id,
    text: this.text,
    list: this.list,
  };
};

mongoose.model('Todo', TodoSchema);
