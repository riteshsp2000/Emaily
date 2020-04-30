const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('../models/User')
const keys = require('../config/keys');

// Assigning the User collection 
const User = mongoose.model('users');

// serializeUser makes a cookie by assing what we have specified in the funtion passed to it ie the mongoose provided user id
passport.serializeUser((user, done) => {                // the user model is the one that we just received from the database down.
  done(null, user.id);
  
})

// deserializeUser obtains the id from the cookie and the function passed to it converts the id to a user.
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user));
})

// Setting up the Google strategy
passport.use(
  new GoogleStrategy (
    {
      clientID: keys.googleClientID,                    // These represent the developers google oauth console details.
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleId: profile.id})
      .then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);

        } else {
          new User({ googleId: profile.id})             // this is creating a user model.
            .save()
            .then(user => done(null, user));            // this is the user model/instance that we are getting from the database.
        }
      });
    }
  )
);