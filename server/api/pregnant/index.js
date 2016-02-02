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

router.get('/:id', userAuth.isAuthenticated(),
    controller.insertPregnantInRequest, controller.read);

router.post('/fetch', userAuth.isAuthenticated(), controller.fetch);

module.exports = router;
