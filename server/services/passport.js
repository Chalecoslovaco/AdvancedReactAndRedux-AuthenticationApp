const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');

// Local Strategy
const localOptions = { userNameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // Verify user email and password
    // If correct call done with the user, if not call done with false
    User.findOne({ email: email }, function(err, user) {
        if(err) return done(err);
        if(!user) return done(null, false);

        // Compare passwords
        user.comparePassword(password, function(err, isMatch) {
            if(err) return done(err);
            if(!isMatch) return done(null, false);

            return done(null, user);
        });
    });

});

// Set up options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // Check if user id in the payload exists
    User.findById(payload.sub, function(err, user) {
        if(err) return done(err, false);
        
        // If exists call done with the user, if not call done without it
        user ? done(null, user) : done(null, false);
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
