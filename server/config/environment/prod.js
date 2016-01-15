/**
 * Configurations for Production Environment
 */

'use strict';

module.exports = {
    db: {
        appDB: 'abelhas-operarias',
        baseUrl: `mongodb://abelhasoperarias:${process.env.MONGOLAB_PASSWORD}@ds045795.mongolab.com:45795/heroku_9jp74hcm`
    }
};
