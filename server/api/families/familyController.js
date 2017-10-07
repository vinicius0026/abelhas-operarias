/**
 * Families API Controller
 */

'use strict';

var datatablesQuery = require('datatables-query'),
    moment = require('moment'),

    errorHandler = require('../../lib/util/errorHandler'),

    Family = require('./familyModel'),

    familyController = {
        create: function (req, res) {
            var family = req.body;

            Family.spawn(family, (err, family) => {
                if (err) {
                    return errorHandler(err, res);
                }

                res.status(201).send({
                    ok: true,
                    info: 'Created family',
                    data: family
                });
            });
        },

        read: function (req, res) {
            var family = req.fiddus.family;

            family.read((err, family) => {
                if (err) {
                    return errorHandler(err, res);
                }

                res.send({
                    ok: true,
                    info: `Got family ${family.id}`,
                    data: family
                });
            });
        },

        update: function (req, res) {
            var family = req.fiddus.family,
                updateData = req.body;

            family.update(updateData, (err, family) => {
                if (err) {
                    return errorHandler(err, res);
                }

                res.send({
                    ok: true,
                    info: `Updated family ${family.id}`,
                    data: family
                });
            });
        },

        delete: function (req, res) {
            var familyId = req.params.id;

            Family.remove({_id: familyId}, err => {
                if (err) {
                    return errorHandler(err, res);
                }

                res.sendStatus(204);
            });
        },

        fetch: function (req, res) {
            var params = req.body,
                query = datatablesQuery(Family);

            query.run(params).then(data => {
                res.send(data);
            }, err => {
                errorHandler(err, res);
            });

        },

        registerMonthOfDonation: function (req, res) {
            var family = req.fiddus.family,
                month = moment(req.body.month);

            family.registerMonthOfDonationReceipt(month, (err, family) => {
                if (err) {
                    return errorHandler(err, res);
                }

                res.send({
                    ok: true,
                    info: `Registered donation received in month ${month} ` +
                        `for family ${family.id}`
                });
            });
        },

        insertFamilyInRequest: function (req, res, next) {
            var familyId = req.params.id;

            req.fiddus = {};

            Family.findById(familyId, (err, family) => {
                if (err) {
                    return errorHandler(err, res);
                }

                req.fiddus.family = family;
                next();
            });
        }
    };

module.exports = familyController;
