const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

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
require('./routes/surveyRoutes.js')(app);

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname, 'client' ,'build' , 'index.html'));
    });
}

app.listen(PORT);