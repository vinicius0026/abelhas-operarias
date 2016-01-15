'use strict';

var router = require('express').Router(),
    User = require('../api/users/userModel'),
    passportConf = require('./local/passport');

// Admin Panel Users Login
passportConf.setup(User, 'local');
router.use('/local', require('./local'));

module.exports = router;
