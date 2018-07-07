const express = require('express');
const passport = require('passport');

const router = express.Router();

const asyncHelper = require('../asyncHelper');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failWithError: true }),
  asyncHelper(async (req, res) => {
    res.redirect(`/login?jwt=${req.user.generateJwt()}`);
  }),
);

module.exports = router;
