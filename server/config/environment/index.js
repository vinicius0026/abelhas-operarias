/**
 * Environment Definitions
 * In this file, the default configurations are set.
 * For particular configurations of individual environments,
 * see appropriate file (prod.js, dev.js, test.js) in this same
 * directory.
 */

'use strict';

var _ = require('lodash'),

    all = {
        env: process.env.NODE_ENV || 'dev',
        port: process.env.PORT || 3000,
        secrets: {
            session: process.env.APP_SECRET ||
            'fc7856d00b08ccb205f2ac1d6aada4d5'
        }
    };

module.exports = _.merge(all,
    require('./' + process.env.NODE_ENV + '.js') || {});
