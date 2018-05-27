const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoListSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

TodoListSchema.pre('remove', async function () {
  this.todos.forEach(async (todo) => {
    await todo.remove();
  });
});

TodoListSchema.methods.toJson = function () {
  const todos = this.populated('todos') ? this.todos.map(todo => todo.toJson()) : this.todos;
  return {
    id: this._id.toString(),
    name: this.name,
    todos,
  };
};

mongoose.model('TodoList', TodoListSchema);
