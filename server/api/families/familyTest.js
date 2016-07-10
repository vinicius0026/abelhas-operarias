/**
 * Families API Tests
 */
/* globals describe, it, before, after*/

'use strict';

var async = require('async'),
    expect = require('chai').expect,
    request = require('supertest'),

    app = require('../../../server'),
    Family = require('./familyModel'),
    User = require('../users/userModel');


describe('Families API Tests', () => {
    var admin = {
            username: 'admin',
            name: 'admin',
            password: 'pass'
        },
        adminAuth,

        family = {
            name: 'wife.name',
            cpf: '88543486785',
            neighborhood: 'neighborhood'
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
            cb => Family.remove({}, cb)
        ], err => done(err));
    });

    describe('Create Family Tests', () => {
        it('should be able to create family if authenticated', done => {
            request(app)
                .post('/api/families')
                .set('authorization', adminAuth)
                .send(family)
                .expect(201)
                .expect(res => {
                    var _family = res.body.data;

                    expect(_family.name).to.equal(family.name);
                    expect(_family.cpf).to.equal(family.cpf);
                    expect(_family.neighborhood).to.equal(family.neighborhood);
                })
                .end(done);
        });

        it('should not be able to create family if not authenticated', done => {
            request(app)
                .post('/api/families')
                .send(family)
                .expect(401)
                .end(done);
        });
    });
});
