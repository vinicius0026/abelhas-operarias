(function () {
    /* global angular */
    'use strict';

    var usersService = function (ApiRequests, USERS_URLS) {
        var create = function (data) {
                return ApiRequests.req({
                    method: 'POST',
                    url: USERS_URLS.base,
                    data: data
                });
            },

            get = function (userId) {
                console.log('USERS_URLS.one(userId)', USERS_URLS.one(userId));
                return ApiRequests.req({
                    method: 'GET',
                    url: USERS_URLS.one(userId)
                });
            };

        return {
            create: create,
            get: get
        };
    };

    usersService.$inject = ['ApiRequests', 'USERS_URLS'];


    angular.module('abelhas-operarias')
        .factory('usersService', usersService);
})();
