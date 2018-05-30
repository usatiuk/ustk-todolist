const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const jwt = require('jsonwebtoken');

const { secret } = require('../config');

const { Schema } = mongoose;

const UserSchema = Schema({ username: { type: String, required: true } });

UserSchema.plugin(passportLocalMongoose);

UserSchema.methods.generateJwt = function () {
  return jwt.sign({ id: this._id, username: this.username }, secret, { expiresIn: '1y' });
};

UserSchema.methods.toAuthJson = function () {
  return {
    id: this._id,
    username: this.username,
    jwt: this.generateJwt(),
  };
};

mongoose.model('User', UserSchema);
