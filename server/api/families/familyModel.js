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

    familyCreateMask = 'wife(name,cpf,occupation),husband(name,occupation,' +
        'cpf),numberOfChildren,ageOfChildren,religion,phone,address,' +
        'neighborhood,reference,dateForDonation,referral,obs',
    familyMask = `id,createdAt,${familyCreateMask}`,
    familyUpdateMask = familyCreateMask.split('cpf,').join(''),

    FamilySchema = new Schema({
        wife: {
            name: {type: String, require: true, trim: true},
            cpf: {
                type: String, index: {unique: true, dropDups: true}, trim: true,
                validate: CPF.isValid.bind(CPF)
            },
            occupation: {type: String, trim: true}
        },
        husband: {
            name: {type: String, trim: true},
            cpf: {
                type: String, index: {unique: true, dropDups: true}, trim: true,
                validate: CPF.isValid.bind(CPF)
            },
            occupation: {type: String, trim: true},
        },
        numberOfChildren: {type: Number, min: 0},
        ageOfChildren: {type: String, trim: true},
        religion: {type: String, trim: true},
        phone: {type: String, trim: true},
        address: {type: String, trim: true},
        neighborhood: {type: String, trim: true},
        reference: {type: String, trim: true},
        dateForDonation: {type: Date},
        referral: {type: String, trim: true},
        obs: {type: String, trim: true},
        createdAt: {type: Date, default: Date.now()}
    });

FamilySchema.methods = {
    read: function (callback) {
        callback(null, mask(this, familyMask));
    },

    update: function (data, callback) {
        _.merge(this, mask(data, familyUpdateMask));

        this.save((err, family) =>
            callback(err, mask(family, familyMask)));
    }
};

FamilySchema.statics = {
    spawn: function (data, callback) {
        Family.create(mask(data, familyCreateMask),
            (err, family) => callback(err, mask(family, familyMask)));
    }
};

module.exports = Family = mongoose.model('Family', FamilySchema);
