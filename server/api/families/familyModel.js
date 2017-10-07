/**
 * Family Model
 */

'use strict';

var CPF = require('cpf_cnpj').CPF,
    mask = require('json-mask'),
    mongoose = require('mongoose'),
    _ = require('lodash'),

    Family,
    Schema = mongoose.Schema,

    familyCreateMask = 'name,cpf,neighborhood',
    familyMask = `id,createdAt,monthsReceivedDonation,${familyCreateMask}`,
    familyUpdateMask = familyCreateMask.split('cpf,').join(''),

    FamilySchema = new Schema({
        name: {type: String, require: true, trim: true, index: true},
        cpf: {
            type: String, index: {unique: true, dropDups: true}, trim: true,
            validate: CPF.isValid.bind(CPF)
        },
        neighborhood: {type: String, trim: true},
        createdAt: {type: Date, default: Date.now()},
        monthsReceivedDonation: [Date]
    });

FamilySchema.methods = {
    read: function (callback) {
        callback(null, mask(this, familyMask));
    },

    update: function (data, callback) {
        _.merge(this, mask(data, familyUpdateMask));

        this.save((err, family) =>
            callback(err, mask(family, familyMask)));
    },
    registerMonthOfDonationReceipt: function (month, callback) {
        this.monthsReceivedDonation.push(month);
        this.save(callback);
    }
};

FamilySchema.statics = {
    spawn: function (data, callback) {
        Family.create(mask(data, familyCreateMask),
            (err, family) => callback(err, mask(family, familyMask)));
    }
};

module.exports = Family = mongoose.model('Family', FamilySchema);
