/**
 * User Model
 */

'use strict';

var crypto = require('crypto'),
    moment = require('moment'),
    mongoose = require('mongoose'),

    Schema = mongoose.Schema,
    User,

    UserSchema = new Schema({
        name: {type: String, required: true, trim: true},
        username: {
            type: String,
            required: true,
            trim: true,
            index: {
                unique: true, dropDups: true
            }
        },
        email: {type: String, trim: true},
        createdAt: Date,
        updatedAt: Date,
        /* jshint ignore:start */
        /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
        password_reset_code: {type: String},
        password_reset_time: {type: Number},
        /* jshint ignore:end */
        /*jscs:enable requireCamelCaseOrUpperCaseIdentifiers*/
        hashedPassword: {type: String, required: true},
        salt: {type: String}
    });

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });
//
//UserSchema.virtual('id')
//    .get(function () {
//        return this._id.toHexString();
//    });
//
//UserSchema.set('toObject', {
//    virtuals: true
//});

var validatePresenceOf = function (value) {
    return value && value.length;
};

UserSchema
    .pre('save', function (next) {

        if (!this.isNew) {
            this.updatedAt = moment();
            return next();
        }

        if (!validatePresenceOf(this.hashedPassword)) {
            next(new Error('Invalid Password'));
        } else {
            this.createdAt = moment();
            this.updatedAt = this.createdAt;
            next();
        }

    });

UserSchema.methods = {
    authenticate: function (plainPass) {
        return this.encryptPassword(plainPass) === this.hashedPassword;
    },

    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },

    encryptPassword: function (password) {
        if (!password || !this.salt) {
            return '';
        }

        var salt = new Buffer(this.salt, 'base64');

        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

module.exports = User = mongoose.model('User', UserSchema);
