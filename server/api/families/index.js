/**
 * Family API Router
 */

'use strict';

var router = require('express').Router(),

    auth = require('../../auth/authService'),
    User = require('../users/userModel'),
    controller = require('./familyController'),

    userAuth = auth(User, true);

router.post('/', userAuth.isAuthenticated(), controller.create);

router.get('/:id', userAuth.isAuthenticated(),
    controller.insertFamilyInRequest, controller.read);

router.put('/:id', userAuth.isAuthenticated(),
    controller.insertFamilyInRequest, controller.update);

router.delete('/:id', userAuth.isAuthenticated(), controller.delete);

router.post('/fetch', userAuth.isAuthenticated(), controller.fetch);

router.post('/registerMonthOfDonation/:id', userAuth.isAuthenticated(),
    controller.insertFamilyInRequest, controller.registerMonthOfDonation);

module.exports = router;
