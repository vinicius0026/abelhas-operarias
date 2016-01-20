/**
 * User API Controller
 */

'use strict';

var errorHandler = require('../../lib/util/errorHandler'),
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
        }
    };

module.exports = userController;
