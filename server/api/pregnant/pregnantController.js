/**
 * Pregnant API Controller
 */

'use strict';

var
    errorHandler = require('../../lib/util/errorHandler'),

    Pregnant = require('./pregnantModel'),

    pregnantController = {
        create: function (req, res) {
            var pregnant = req.body;

            Pregnant.spawn(pregnant, (err, pregnant) => {
                if (err) {
                    return errorHandler(err, res);
                }

                res.status(201).send({
                    ok: true,
                    info: 'Created pregnant',
                    data: pregnant
                });
            });
        }
    };

module.exports = pregnantController;
