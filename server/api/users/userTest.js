/**
 * User API Tests
 */
/* global describe, it, before, after */

'use strict';

var async = require('async'),
    expect = require('chai').expect,
    request = require('supertest'),

    app = require('../../../server'),
    User = require('./userModel');

describe('User API Tests', () => {
    describe('User login tests', () => {

        var user = {
            username: 'user',
            name: 'Usuário',
            password: 'senha',
            email: 'user@gmail.com'
        };

        before(done => {
            User.create(user, done);
        });

        after(done => {
            User.remove({}, done);
        });

        it('should be able to login a manually create user', done => {
            request(app)
                .post('/auth/local')
                .send({
                    username: user.username,
                    password: user.password
                })
                .expect(200)
                .expect(res => {
                    var data = res.body.data;
                    expect(data.token).to.exist;
                })
                .end(done);
        });

        it('should not be able to login if password is wrong', done => {
            request(app)
                .post('/auth/local')
                .send({
                    username: user.username,
                    password: 'wrongPassword'
                })
                .expect(401)
                .end(done);
        });
    });

    describe('Create User Tests', () => {
        var admin = {
                name: 'Master',
                username: 'master',
                password: 'masterpass'
            },
            user1 = {
                name: 'User',
                username: 'user',
                password: 'userpass'
            },
            user2 = {
                name: 'User2',
                username: 'user2',
                password: 'user2pass'
            },
            adminAuth;

        before(done => {
            async.series([
                cb => User.create(admin, cb),
                cb => request(app)
                    .post('/auth/local')
                    .send({username: admin.username, password: admin.password})
                    .expect(res => {
                        adminAuth = `Bearer ${res.body.data.token}`;
                    })
                    .end(cb)
            ], err => done(err));
        });

        after(done => {
            User.remove({}, done);
        });

        it('should be able to create a user if authenticated', done => {
            request(app)
                .post('/api/users')
                .set('authorization', adminAuth)
                .send(user1)
                .expect(201)
                .expect(res => {
                    var createdUser = res.body.data;
                    expect(createdUser.username).to.equal(user1.username);
                })
                .end(done);
        });

        it('should not be able to create user if not authenticated', done => {
            request(app)
                .post('/api/users')
                .send(user2)
                .expect(401)
                .end(done);
        });
    });
});
