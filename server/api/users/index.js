/**
 * Users API Router
 */

var router = require('express').Router(),

    auth = require('../../auth/authService'),
    User = require('./userModel'),
    controller = require('./userController'),

    userAuth = auth(User, true);

router.post('/', userAuth.isAuthenticated(), controller.create);

router.post('/fetch', userAuth.isAuthenticated(), controller.fetch);

module.exports = router;
