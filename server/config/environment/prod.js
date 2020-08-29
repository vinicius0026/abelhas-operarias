/**
 * Configurations for Production Environment
 */

'use strict';

module.exports = {
    db: {
        appDB: 'heroku_9jp74hcm',
        baseUrl: `mongodb+srv://abelhasoperarias:${process.env.DB_PASSWORD}@cluster0.93ykz.mongodb.net/abelhas-operarias?retryWrites=true&w=majority`
    }
};
