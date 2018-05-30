const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoListSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

TodoListSchema.pre('save', async function () {
  const user = await this.model('User').findById(this.user);
  user.lists.push(this._id);
  await user.save();
});

TodoListSchema.pre('remove', async function () {
  const user = await this.model('User').findById(this.user);
  user.lists.splice(user.todos.indexOf(this._id), 1);
  await user.save();
  await this.model('Todo').remove({ list: this._id });
});

TodoListSchema.methods.toJson = function () {
  const todos = this.populated('todos') ? this.todos.map(todo => todo.toJson()) : this.todos;
  return {
    id: this._id.toString(),
    user: this.user.toString(),
    name: this.name,
    todos,
  };
};

mongoose.model('TodoList', TodoListSchema);
