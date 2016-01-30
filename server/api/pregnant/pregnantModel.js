/**
 * Pregnant Model
 */

'use strict';

var CPF = require('cpf_cnpj').CPF,
    mask = require('json-mask'),
    mongoose = require('mongoose'),

    Pregnant,
    Schema = mongoose.Schema,

    pregnantCreateMask = 'name,cpf,occupation,age,spouse(name,occupation,age),' +
        'numberOfChildren,ageOfChildren,babyGender,familyIncome,' +
        'familyIncome,religion,education,phone,address,neighborhood,' +
        'reference,ownHouse,rentValue,dateForDonation,referral,obs',

    pregnantMask = `id,createdAt,${pregnantCreateMask}`,

    PregnantSchema = new Schema({
        name: {type: String, require: true, trim: true},
        cpf: {
            type: String, index: {unique: true, dropDups: true}, trim: true,
            validate: CPF.isValid.bind(CPF)
        },
        age: {type: Number, min: 0},
        occupation: {type: String, trim: true},
        spouse: {
            name: {type: String, trim: true},
            occupation: {type: String, trim: true},
            age: {type: Number, min: 0}
        },
        numberOfChildren: {type: Number, min: 0},
        ageOfChildren: {type: String, trim: true},
        babyGender: {type: String, enum: ['feminine', 'masculine']},
        familyIncome: {type: Number, min: 0},
        religion: {type: String, trim: true},
        education: {type: String, trim: true},
        phone: {type: String, trim: true},
        address: {type: String, trim: true},
        neighborhood: {type: String, trim: true},
        reference: {type: String, trim: true},
        ownHouse: Boolean,
        rentValue: {type: Number, min: 0},
        dateForDonation: {type: Date},
        referral: {type: String, trim: true},
        obs: {type: String, trim: true},
        createdAt: {type: Date, default: Date.now()}
    });

PregnantSchema.statics = {
    spawn: function (data, callback) {
        Pregnant.create(mask(data, pregnantCreateMask),
            (err, pregnant) => callback(err, mask(pregnant, pregnantMask)));
    }
};

module.exports = Pregnant = mongoose.model('Pregnant', PregnantSchema);
