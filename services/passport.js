const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('../models/User')
const keys = require('../config/keys');

// Assigning the User collection 
const User = mongoose.model('users');

// serializeUser makes a cookie by assing what we have specified in the funtion passed to it ie the mongoose provided user id
 // the user model is the one that we just received from the database down.
passport.serializeUser((user, done) => {               
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
      // These represent the developers google oauth console details.
      clientID: keys.googleClientID,                    
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({googleId: profile.id})

      if (existingUser) {
        return done(null, existingUser);
      } 
      
      // this is creating a user model.
      const user = await new User({ googleId: profile.id }).save();               
      // this is the user model/instance that we are getting from the database.
      done(null, user);      
    }
  )
);