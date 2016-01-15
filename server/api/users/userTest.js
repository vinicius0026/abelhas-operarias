/**
 * User API Tests
 */

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
            User.create(user, function (err, user) {
                done(err);
            });
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
    });
});
