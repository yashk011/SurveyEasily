const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieSession({
    maxAge : 30*24*60*60*1000 , 
    keys : [keys.cookieKey] 
 })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);

authRoutes = require('./routes/authRoutes.js')(app);
require('./routes/billingRoutes.js')(app);

app.listen(PORT);