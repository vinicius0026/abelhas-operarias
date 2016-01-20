'use strict';

var errorHandler = function (err, res, status, msg) {
    var info = msg || (err && err.message) || 'Some error occurred';

    res.status(status || 500)
        .send({
            ok: false,
            info,
            err
        });
};

module.exports = errorHandler;
