/**
 * API routes
 */

'use strict';

module.exports = function (app) {
    app.use('/auth', require('./auth'));
};
