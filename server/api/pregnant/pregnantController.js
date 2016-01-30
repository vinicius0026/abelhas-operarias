/**
 * Pregnant API Controller
 */

'use strict';

var datatablesQuery = require('datatables-query'),
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
        },

        fetch: function (req, res) {
            var params = req.body,
                query = datatablesQuery(Pregnant);

            query.run(params).then(data => {
                res.send(data);
            }, err => {
                errorHandler(err, res);
            });

        }
    };

module.exports = pregnantController;
