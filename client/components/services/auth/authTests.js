(function () {
    /* globals angular, sinon, beforeEach, afterEach, inject, describe, it, expect */
    'use strict';

    var Auth,
        API_URL,
        LOCAL_STORAGE,
        USER_ROLES,
        ApiRequests,
        localStorageMock = {},
        sandbox;


    describe('Auth Tests ::', function () {
        beforeEach(angular.mock.module('factory-auth'));
        beforeEach(angular.mock.module('constants-api-url'));
        beforeEach(angular.mock.module('constants-local-storage'));
        beforeEach(angular.mock.module('factory-api-requests'));

        /* jscs: disable */
        beforeEach(inject(function (_Auth_, _API_URL_, _LOCAL_STORAGE_, _USER_ROLES_, _ApiRequests_) {
            Auth = _Auth_;
            API_URL = _API_URL_;
            LOCAL_STORAGE = _LOCAL_STORAGE_;
            USER_ROLES = _USER_ROLES_;
            ApiRequests = _ApiRequests_;
        }));
        /* jscs: enable */


        beforeEach(function () {
            // Mocks localStorage Methods.
            sandbox = sinon.sandbox.create();

            sandbox.stub(window.localStorage, 'setItem', function (key, value) {
                localStorageMock[key] = value;
            });

            sandbox.stub(window.localStorage, 'getItem', function (key) {
                return localStorageMock[key];
            });

            sandbox.stub(window.localStorage, 'removeItem', function (key) {
                delete localStorageMock[key];
            });
        });


        afterEach(function () {
            sandbox.restore();
            localStorageMock = {};
        });


        describe('Check Injected Modules ::', function () {

            it('Auth module should exist', function () {
                expect(Auth).to.exists;
            });

            it('Auth module should exist', function () {
                expect(API_URL).to.exists;
            });

            it('Auth module should exist', function () {
                expect(LOCAL_STORAGE).to.exists;
            });

            it('Auth module should exist', function () {
                expect(ApiRequests).to.exists;
            });
        });


        describe('Auth Expectations ::', function () {

            it('Should not set token on local storage when it is not available', function () {
                var token = 'testToken123';

                Auth.setToken(token);

                var storedToken = window.localStorage.getItem(LOCAL_STORAGE.token);

                expect(storedToken).to.equal(token);
            });

            it('Should set token on local storage', function () {
                var token = 'testToken123';

                Auth.setToken(token);

                var storedToken = window.localStorage.getItem(LOCAL_STORAGE.token);

                expect(storedToken).to.equal(token);
            });

            it('Should get token on local storage', function () {
                var token = 'testToken123';

                Auth.setToken(token);
                var storedToken = Auth.getToken();

                expect(storedToken).to.equal(token);
            });
        });

        // TODO: Need to complete this tests
    });
})();
