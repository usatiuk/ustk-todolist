const mongoose = require('mongoose');
const slugify = require('slugify');

const { Schema } = mongoose;

const TodoListSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

TodoListSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

TodoListSchema.methods.slugify = function () {
  this.slug = slugify(this.name);
};

TodoListSchema.pre('remove', async function () {
  this.todos.forEach(async (todo) => {
    await todo.remove();
  });
});

mongoose.model('TodoList', TodoListSchema);
