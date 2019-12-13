'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, (email, passport, done) => {
    User.findOne({ email: email }).then((user) => {
        if (!user || !user.validPassword(passport)) {
            return done(null, false, {
                errors: {'email or password': 'is invalid'}
            });
        }

        return done(null, user);
    }).catch(done);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});