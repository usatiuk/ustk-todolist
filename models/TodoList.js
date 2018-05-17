const mongoose = require('mongoose');
const slugify = require('slugify');

const { Schema } = mongoose;

const TodoListSchema = Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  slug: {
    type: String,
    required: true,
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

mongoose.model('TodoList', TodoListSchema);
