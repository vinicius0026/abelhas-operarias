/**
 * Pregnant API tests
 */
/* globals describe, it, before */

'use strict';

var async = require('async'),
    expect = require('chai').expect,
    request = require('supertest'),
    _ = require('lodash'),

    app = require('../../../server'),
    Pregnant = require('./pregnantModel'),
    User = require('../users/userModel');

describe('Pregnant API Tests', () => {

    var admin = {
            username: 'admin',
            name: 'admin',
            password: 'pass'
        },
        adminAuth;

    before(done => {
        async.series([
            cb => User.create(admin, cb),
            cb => request(app)
                .post('/auth/local')
                .send({username: admin.username, password: admin.password})
                .expect(200)
                .expect(res => {
                    adminAuth = `Bearer ${res.body.data.token}`;
                })
                .end(cb)

        ], err => done(err));
    });

    after(done => {
        async.parallel([
            cb => User.remove({}, cb),
            cb => Pregnant.remove({}, cb)
        ], err => done(err));
    });

    describe('Create Pregnant Tests', () => {
        it('should be able to create pregnant if authenticated', done => {
            var pregnant = {
                name: 'name',
                cpf: '88543486785',
                occupation: 'occupation',
                age: 22,
                spouse: {
                    name: 'spouse.name',
                    occupation: 'spouse.occupation',
                    age: 22
                },
                numberOfChildren: 2,
                ageOfChildren: '1,2',
                babyGender: 'feminine',
                familyIncome: 1234,
                religion: 'religion',
                education: 'education',
                phone: '2222222222',
                address: 'address',
                neighborhood: 'neighborhood',
                reference: 'reference',
                ownHouse: true,
                rentValue: 1234,
                dateForDonation: Date.now(),
                referral: 'referral'
            };

            request(app)
                .post('/api/pregnant')
                .set('authorization', adminAuth)
                .send(pregnant)
                .expect(201)
                .expect(res => {
                    var _pregnant = res.body.data,
                        expected = _.cloneDeep(pregnant);

                    expect(_pregnant.id).to.exist;
                    delete _pregnant.id;
                    expect(new Date(_pregnant.dateForDonation).getTime()).to
                        .equal((new Date(pregnant.dateForDonation)).getTime());
                    delete _pregnant.dateForDonation;
                    delete expected.dateForDonation;
                    expect(_pregnant).to.deep.equal(expected);
                })
                .end(done);
        });
    });
});
