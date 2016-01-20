/**
 * API routes
 */

'use strict';

module.exports = function (app) {
    app.use('/auth', require('./auth'));
    app.use('/api/users', require('./api/users'));
};
