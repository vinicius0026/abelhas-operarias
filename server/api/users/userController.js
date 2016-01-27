/**
 * User API Controller
 */

'use strict';

var datatablesQuery = require('datatables-query'),

    errorHandler = require('../../lib/util/errorHandler'),
    User = require('./userModel'),

    userController = {
        create: function (req, res) {
            User.spawn(req.body, (err, user) => {
                if (err) {
                    return errorHandler(err, res);
                }

                res.status(201)
                    .send({
                        ok: true,
                        info: `User created with id = ${user.id}`,
                        data: user
                    });
            });
        },
        fetch: function (req, res) {
            var params = req.body,
                query = datatablesQuery(User);

            query.run(params).then(data => res.send(data),
                    err => errorHandler(err, res));
        },

        read: function (req, res) {
            var user = req.fiddus.user;

            user.read((err, data) => {
                if (err) {
                    return errorHandler(err, res);
                }

                res.send({
                    ok: true,
                    info: `Got user ${user.id}`,
                    data: data
                });
            });

        },

        insertUserInRequest: function (req, res, next) {
            var userId = req.params.id;

            req.fiddus = {};

            User.findById(userId, (err, user) => {
                if (err) {
                    return errorHandler(err, res);
                }


                req.fiddus.user = user;
                next();
            });
        }
    };

module.exports = userController;
