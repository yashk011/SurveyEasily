const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
var mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user,done) => {
    console.log('serialize');
    done(null,user.id);
});

passport.deserializeUser((id,done) => {
    console.log('Deserialize');
   
    User.findById(id)
    .then((user) => {
        done(null,user)
    });
});
passport.use(new GoogleStrategy({
    clientID : keys.googleClientID ,
    clientSecret : keys.googleClientSecret,
    callbackURL : '/auth/google/callback',
    proxy :true 
} , async (accessToken,refreshToken,profile,done) => {
        
    const existingUser = await User.findOne({googleId:profile.id});
        
            if(existingUser)
            {
               return  done(null,existingUser);
            }
            
                const user = await new User ({googleId:profile.id})
                .save()
                done(null,user);
                
        } 
    )
);
