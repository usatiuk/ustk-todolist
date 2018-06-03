const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');

const router = express.Router();

const asyncHelper = require('../asyncHelper');
const auth = require('./auth');

const { NotFoundError } = require('../errors');

router.get(
  '/user',
  auth.required,
  asyncHelper(async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id).exec();
    res.json({ success: true, data: user.toAuthJson() });
  }),
);

router.post(
  '/',
  asyncHelper(async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username });
    await user.setPassword(password);
    await user.save();
    res.json({ success: true, data: user.toAuthJson() });
  }),
);

router.patch(
  '/user',
  auth.required,
  asyncHelper(async (req, res) => {
    const { username, password } = req.body;
    const patch = {};
    if (username !== undefined) {
      patch.username = username;
    }
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: patch },
      { runValidators: true, context: 'query', new: true },
    ).exec();
    if (!user) {
      throw new NotFoundError(
        `can't find user with username ${req.user.username}`,
      );
    }
    if (password !== undefined) {
      await user.setPassword(password);
      await user.save();
    }
    res.json({ success: true, data: user.toAuthJson() });
  }),
);

router.delete(
  '/user',
  auth.required,
  asyncHelper(async (req, res) => {
    const user = await User.findById(req.user.id).exec();
    await user.remove();
    res.json({ success: true });
  }),
);

router.post(
  '/login',
  passport.authenticate('local', { session: false, failWithError: true }),
  asyncHelper(async (req, res) => {
    res.json({ success: true, data: req.user.toAuthJson() });
  }),
);

module.exports = router;
