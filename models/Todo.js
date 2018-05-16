const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = Schema({
  _id: Schema.Types.ObjectId,
  text: {
    type: String,
    required: true,
  },
  list: { type: Schema.Types.ObjectId, ref: 'TodoList' },
  completed: Boolean,
});

mongoose.model('Todo', todoSchema);
