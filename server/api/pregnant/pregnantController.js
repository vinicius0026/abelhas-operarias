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

        read: function (req, res) {
            var pregnant = req.fiddus.pregnant;

            pregnant.read((err, pregnant) => {
                if (err) {
                    return errorHandler(err, res);
                }

                res.send({
                    ok: true,
                    info: `Got pregnant ${pregnant.id}`,
                    data: pregnant
                });
            });
        },

        update: function (req, res) {
            var pregnant = req.fiddus.pregnant,
                updateData = req.body;

            pregnant.update(updateData, (err, pregnant) => {
                if (err) {
                    return errorHandler(err, res);
                }

                res.send({
                    ok: true,
                    info: `Updated pregnant ${pregnant.id}`,
                    data: pregnant
                });
            });
        },

        delete: function (req, res) {
            var pregnantId = req.params.id;

            Pregnant.remove({_id: pregnantId}, err => {
                if (err) {
                    return errorHandler(err, res);
                }

                res.sendStatus(204);
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

        },

        insertPregnantInRequest: function (req, res, next) {
            var pregnantId = req.params.id;

            req.fiddus = {};

            Pregnant.findById(pregnantId, (err, pregnant) => {
                if (err) {
                    return errorHandler(err, res);
                }

                req.fiddus.pregnant = pregnant;
                next();
            });
        }
    };

module.exports = pregnantController;
