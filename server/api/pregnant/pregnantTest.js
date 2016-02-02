/**
 * Pregnant API tests
 */
/* globals describe, it, before, after, afterEach */

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
        adminAuth,

        pregnant = {
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
            referral: 'referral',
            obs: 'obs'
        };

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

        afterEach(done => Pregnant.remove({}, done));

        it('should be able to create pregnant if authenticated', done => {

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
                    expect(_pregnant.createdAt).to.exist;
                    delete _pregnant.createdAt;
                    expect(new Date(_pregnant.dateForDonation).getTime()).to
                        .equal((new Date(pregnant.dateForDonation)).getTime());
                    delete _pregnant.dateForDonation;
                    delete expected.dateForDonation;
                    expect(_pregnant).to.deep.equal(expected);
                })
                .end(done);
        });

        it('shouldnt be able to create pregnant if not authenticated', done => {
            request(app)
                .post('/api/pregnant')
                .send(pregnant)
                .expect(401)
                .end(done);
        });
    });

    describe('Read Pregnant Tests', () => {
        var pregnantId;

        beforeEach(done => Pregnant.create(pregnant, (err, _pregnant) => {
            pregnantId = _pregnant._id;
            done(err);
        }));

        afterEach(done => Pregnant.remove({}, done));

        it('should be able to read pregnant details if authenticated', done => {
            request(app)
                .get(`/api/pregnant/${pregnantId}`)
                .set('authorization', adminAuth)
                .expect(200)
                .expect(res => {
                    var _pregnant = res.body.data,
                        expected = _.cloneDeep(pregnant);

                    expect(_pregnant.id).to.exist;
                    delete _pregnant.id;
                    expect(_pregnant.createdAt).to.exist;
                    delete _pregnant.createdAt;
                    expect(new Date(_pregnant.dateForDonation).getTime()).to
                        .equal((new Date(pregnant.dateForDonation)).getTime());
                    delete _pregnant.dateForDonation;
                    delete expected.dateForDonation;
                    expect(_pregnant).to.deep.equal(expected);
                })
                .end(done);
        });
    });

    describe('Update Pregnant Tests', () => {
        var pregnantId,
            updateData = {
                name: 'name1',
                cpf: '52268879577',
                occupation: 'occupation1',
                age: 23,
                spouse: {
                    name: 'spouse.name1',
                    occupation: 'spouse.occupation1',
                    age: 23
                },
                numberOfChildren: 3,
                ageOfChildren: '1,2,4',
                babyGender: 'masculine',
                familyIncome: 4321,
                religion: 'religion1',
                education: 'education1',
                phone: '3333333333',
                address: 'address1',
                neighborhood: 'neighborhood1',
                reference: 'reference1',
                ownHouse: false,
                rentValue: 321,
                dateForDonation: Date.now(),
                referral: 'referral1',
                obs: 'obs1'
            };

        beforeEach(done => Pregnant.create(pregnant, (err, _pregnant) => {
            pregnantId = _pregnant._id;
            done(err);
        }));

        afterEach(done => Pregnant.remove({}, done));

        it('should be able to update pregnant, but cpf should not be changed',
                done => {

            request(app)
                .put(`/api/pregnant/${pregnantId}`)
                .send(updateData)
                .set('authorization', adminAuth)
                .expect(200)
                .expect(res => {
                    var _pregnant = res.body.data,
                        expected = _.cloneDeep(updateData);

                    expect(_pregnant.id).to.exist;
                    delete _pregnant.id;
                    expect(_pregnant.createdAt).to.exist;
                    delete _pregnant.createdAt;
                    expect(_pregnant.cpf).to.equal(pregnant.cpf);
                    delete(_pregnant.cpf);
                    delete(expected.cpf);
                    delete _pregnant.dateForDonation;
                    delete expected.dateForDonation;
                    expect(_pregnant).to.deep.equal(expected);
                })
                .end(done);
        });
    });

    describe('Delete Pregnant Tests', () => {
        var pregnantId;

        beforeEach(done => Pregnant.create(pregnant, (err, _pregnant) => {
            pregnantId = _pregnant._id;
            done(err);
        }));

        afterEach(done => Pregnant.remove({}, done));

        it('should be able to delete pregnant if authenticated', done => {
            request(app)
                .delete(`/api/pregnant/${pregnantId}`)
                .set('authorization', adminAuth)
                .expect(204)
                .end(err => {
                    if (err) {
                        return done(err);
                    }

                    Pregnant.find({_id: pregnantId}, (err, results) => {
                        expect(results.length).to.equal(0);
                        done(err);
                    });
                });
        });
    });

    describe('Fetch Pregnant Tests', () => {

        before(done => Pregnant.spawn(pregnant, done));

        after(done => Pregnant.remove({}, done));

        it('should be able to fetch pregnant if authenticated', done => {
            request(app)
                .post('/api/pregnant/fetch')
                .set('authorization', adminAuth)
                .send({
                    draw: 1,
                    start: 0,
                    length: 10,
                    columns: [{
                        data: 'name',
                        searchable: true,
                        orderable: true
                    }, {
                        data: 'cpf',
                        searchable: true,
                        orderable: true
                    }, {
                        data: 'age',
                        searchable: false,
                        orderable: true
                    }, {
                        data: 'createdAt',
                        searchable: false,
                        orderable: true
                    }],
                    order: [{
                        column: 0,
                        dir: 'asc'
                    }],
                    search: {
                        value: ''
                    }
                })
                .expect(200)
                .expect(res => {
                    var results = res.body.data;

                    expect(results.length).to.equal(1);
                    expect(results[0].name).to.equal(pregnant.name);
                })
                .end(done);
        });

    });
});
