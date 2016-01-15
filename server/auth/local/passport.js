/**
 * Passport Local Strategy Configuration
 */

'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = {
    setup: function (User, strategyName) {
        passport.use(strategyName, new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            User.findOne({username: username}, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {message: 'Incorrect Username or Password'});
                }

                if (!user.authenticate(password)) {
                    return done(null, false, {message: 'Incorrect Username or Password'});
                }

                return done(null, user);
            });
        }));
    }
};
