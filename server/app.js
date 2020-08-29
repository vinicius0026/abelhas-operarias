module.exports = function (app) {
    'use strict';

    var async = require('async'),
        mongoose = require('mongoose'),

        config = require('./config/environment'),

        MONGODB_URI = config.db.baseUrl;

    require('./config/express')(app);
    require('./routes')(app);
    require('./config/seeds')();

    async.series([
        cb => {
            mongoose.connect(MONGODB_URI, {}, err => {
                if (err) {
                    console.log('Unable to connect to mongodb');
                    console.log(err);
                    return cb(err);
                }
                cb();
            });
        },
        () => {
            app.listen(config.port, () => {
                console.log(`App listening on port ${config.port}`);
            });
        }
    ]);
};
