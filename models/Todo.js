const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = Schema({
  text: {
    type: String,
    required: true,
  },
  list: { type: Schema.Types.ObjectId, ref: 'TodoList', required: true },
  completed: { type: Boolean, default: false },
});

mongoose.model('Todo', todoSchema);
