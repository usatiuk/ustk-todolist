const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoListSchema = Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

TodoListSchema.pre('save', async function () {
  if (this.isNew) {
    const user = await this.model('User').findById(this.user);
    user.lists.push(this._id);
    await user.save();
  }
});

TodoListSchema.pre('remove', async function () {
  const user = await this.model('User').findById(this.user);
  user.lists.splice(user.lists.indexOf(this._id), 1);

  // removing todos in parallel can cause VersionError
  // so we remove todos from user
  const todos = await this.model('Todo')
    .find({ list: this._id })
    .exec();
  const ids = todos.map(todo => todo._id);
  user.todos = user.todos.filter(todo => ids.includes(todo._id));
  await user.save();
  // and remove them from db
  await this.model('Todo')
    .find({ list: this._id })
    .remove()
    .exec();
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
