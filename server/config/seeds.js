/**
 * Seeding database
 */

'use strict';

var User = require('../api/users/userModel'),

    defaultUsername = process.env.DEFAULT_USERNAME || 'admin',
    defaultPassword = process.env.DEFAULT_PASSWORD || 'admin',

    seed = function () {
        User.count({name: defaultUsername}, (err, n) => {
            if (n === 0) {
                User.create({username: defaultUsername,
                    password: defaultPassword, name: 'Admin'});
            }
        });
    };

module.exports = seed;
