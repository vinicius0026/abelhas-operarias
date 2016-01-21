/**
 * Authentication Service
 */

'use strict';

var config = require('../config/environment'),
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    compose = require('composable-middleware'),

    /**
     * Attaches user object to the request, if authenticated
     * Otherwise returns 401
     */
    isAuthenticated = function (User, credentialsRequired) {
        var validateJwt = expressJwt({
            secret: config.secrets.session,
            credentialsRequired: credentialsRequired
        });

        return function () {
            return compose()
                // Allow accessToken to be passed through query parameter as well
                .use(function (req, res, next) {
                    if (req.query && req.query.hasOwnProperty('accessToken')) {
                        req.headers.authorization = 'Bearer ' + req.query.accessToken;
                    }

                    if (!req.headers.authorization && credentialsRequired) {
                        return res.status(401).json({ok: false, info: 'Unauthorized access'});
                    }

                    validateJwt(req, res, next);
                })
                // Attach user to request
                .use(function (err, req, res, next) {
                    if (err) {
                        return res.status(401).json({ok: false, info: 'Invalid or expired token'});
                    }

                    if (req.user && req.user._id) {
                        User.findById(req.user._id, function (err, user) {

                            if (err) {
                                return res.status(401).json({ok: false, info: 'User not found'});
                            }

                            if (!user && credentialsRequired) {
                                return res.status(401).json({ok: false, info: 'User not found'});
                            }

                            req.user = user;
                            next();
                        });
                    } else {
                        next();
                    }
                });
        };
    },

    /**
     * Method signToken
     * Creates a signed jwt
     * @param user The user who will receive the token
     * @returns signed jwt
     */
    signToken = function (user) {
        return jwt.sign(
            {_id: user.id, name: user.name, username: user.username},
            config.secrets.session,
            {expiresIn: 60 * 5 * 60} // seconds
        );
    },

    /**
     * Method setTokenCookie
     * Sets a cookie on the response object with a token for user access
     * @param req The request object
     * @param res The response object
     */
    setTokenCookie = function (req, res) {
        if (!req.user) {
            return res.status(404).json({ok: false, info: 'Something went wrong, please try again.'});
        }

        var token = signToken(req.user);
        res.cookie('token', JSON.stringify(token));
        res.redirect('/');
    };

module.exports = function (UserModel, credentialsRequired) {
    return {
        isAuthenticated: isAuthenticated(UserModel, credentialsRequired),
        signToken: signToken,
        setTokenCookie: setTokenCookie
    };
};
