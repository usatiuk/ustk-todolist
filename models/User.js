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
  await this.model('TodoList').remove({ user: this._id });
  await this.model('Todo').remove({ user: this._id });
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
