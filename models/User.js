const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Creating the user Schema defining the different property to be stored for each individual user.
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0}
});

// Wiring up the userSchema to mongoose to form a new collection called user.
mongoose.model('users', userSchema);