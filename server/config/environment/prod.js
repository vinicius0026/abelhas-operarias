/**
 * Configurations for Production Environment
 */

'use strict';

module.exports = {
    db: {
        appDB: 'heroku_9jp74hcm',
        baseUrl: `mongodb://abelhasoperarias:${process.env.MONGOLAB_PASSWORD}` +
            `@ds045795.mongolab.com:45795/`
    }
};
