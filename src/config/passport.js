const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const {
    googleClientId,
    googleClientSecret,
    googleCallback,
    googleEnabled,
} = require(".").googleOAuth;

const User = mongoose.model("User");

passport.use(User.createStrategy());

if (googleEnabled) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: googleClientId,
                clientSecret: googleClientSecret,
                callbackURL: googleCallback,
            },
            (accessToken, refreshToken, profile, done) => {
                User.findOrCreate({ googleId: profile.id }, (err, user) =>
                    done(err, user),
                );
            },
        ),
    );
}
module.exports = passport;
