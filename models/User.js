const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

const { secret } = require('../config');

const { Schema } = mongoose;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: /^\S*$/,
  },
  lists: [{ type: Schema.Types.ObjectId, ref: 'TodoList' }],
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(uniqueValidator);

UserSchema.pre('remove', async function () {
  await this.model('TodoList')
    .find({ user: this._id })
    .remove()
    .exec();

  await this.model('Todo')
    .find({ user: this._id })
    .remove()
    .exec();
});

UserSchema.methods.generateJwt = function () {
  return jwt.sign({ id: this._id, username: this.username }, secret, { expiresIn: '6m' });
};

UserSchema.methods.toAuthJson = function () {
  return {
    id: this._id,
    username: this.username,
    jwt: this.generateJwt(),
  };
};

mongoose.model('User', UserSchema);
