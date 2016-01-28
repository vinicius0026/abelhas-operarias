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
                return ApiRequests.req({
                    method: 'GET',
                    url: USERS_URLS.one(userId)
                });
            },

            update = function (userId, data) {
                return ApiRequests.req({
                    method: 'PUT',
                    url: USERS_URLS.one(userId),
                    data: data
                });
            },

            remove = function (userId) {
                return ApiRequests.req({
                    method: 'DELETE',
                    url: USERS_URLS.one(userId)
                })
            };

        return {
            create: create,
            get: get,
            update: update,
            remove: remove
        };
    };

    usersService.$inject = ['ApiRequests', 'USERS_URLS'];


    angular.module('abelhas-operarias')
        .factory('usersService', usersService);
})();
