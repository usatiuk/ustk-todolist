const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoListSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

mongoose.model('TodoList', todoListSchema);
