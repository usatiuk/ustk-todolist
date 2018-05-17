const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoListSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

mongoose.model('TodoList', todoListSchema);
