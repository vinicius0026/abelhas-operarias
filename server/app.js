module.exports = function (app) {
    'use strict';

    require('./config/express')(app);
    var config = require('./config/environment');

    app.listen(config.port, () => {
        console.log(`App listening on port ${port}`);
    });
};
