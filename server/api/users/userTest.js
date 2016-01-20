/**
 * User API Tests
 */
/* global describe, it, before, after */

'use strict';

var expect = require('chai').expect,
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
});
