/**
 * Pregnant API Router
 */

'use strict';

var router = require('express').Router(),

    auth = require('../../auth/authService'),
    User = require('../users/userModel'),
    controller = require('./pregnantController'),

    userAuth = auth(User, true);

router.post('/', userAuth.isAuthenticated(), controller.create);

module.exports = router;
