'use strict';

var router = require('express').Router(),
    authHandler = require('../authResponseHandler');

router.post('/', authHandler('local'));

module.exports = router;
