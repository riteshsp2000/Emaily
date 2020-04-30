const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('./models/User')
require('./services/passport');

const keys = require('./config/keys');

// Connecting to mongodb
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const app = express();

// Wiring up the cookies with express and passport
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes imported from other files.
require('./routes/authRoutes')(app);


// Setting up the port for the server to run.
const PORT = process.env.PORT || 5000;
app.listen(PORT);