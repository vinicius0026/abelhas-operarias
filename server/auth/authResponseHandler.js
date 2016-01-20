'use strict';

var passport = require('passport'),
    auth = require('./authService')(),

    handler = function (strategy) {
        return function (req, res) {
            passport.authenticate(strategy, function (err, user, info) {
                var error = err || info;

                if (error) {
                    return res.status(401).send(error);
                }

                if (!user) {
                    return res.sendStatus(401);
                }

                var token = auth.signToken(user);

                res.send({
                    ok: true,
                    info: 'Logged in successfully',
                    data: {
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        token: token
                    }
                });
            })(req, res);
        };
    };

module.exports = handler;
