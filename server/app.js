module.exports = function (app) {
    'use strict';

    var async = require('async'),
        mongoose = require('mongoose'),

        config = require('./config/environment'),

        MONGODB_URI = config.db.baseUrl + config.db.appDB;

    require('./config/express')(app);
    require('./routes')(app);

    async.series([
        cb => {
            mongoose.connect(MONGODB_URI, {}, err => {
                if (err) {
                    throw new Error('Unable to connect to MongoDB');
                }
                cb();
            });
        },
        cb => {
            app.listen(config.port, () => {
                console.log(`App listening on port ${config.port}`);
            });
        }
    ]);
};
