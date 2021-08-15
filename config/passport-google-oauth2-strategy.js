const passport = require("passport");

const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");

const User = require("../models/user");

//tell the passport to use new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "1006118794052-97799pr5jeeibmmbn3qn0khvsr3fbb46.apps.googleusercontent.com",

      clientSecret: "qsmXmBzaqrLgWtkDOkr8NJK1",

      callbackURL: "http://localhost:5005/user/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google-startegy-passport", err);
          return;
        }
        console.log(profile);
        if (user) {
          //if found set req.user and set its a req.user
          return done(null, user);
        } else {
          //if not found,create the user and set req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
              avatar: profile.photos[0].value,
            },
            function (err, user) {
              if (err) {
                console.log("error in cretatong user in google-auth", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
