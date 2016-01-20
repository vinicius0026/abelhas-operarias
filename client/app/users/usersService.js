(function () {
    'use strict';

    var usersService = function (ApiRequests, USERS_URLS) {
        var create = function (data) {
            return ApiRequests.req({
                method: 'POST',
                url: USERS_URLS.base,
                data: data
            });
        };

        return {
            create: create
        };
    };

    usersService.$inject = ['ApiRequests', 'USERS_URLS'];


    angular.module('abelhas-operarias')
        .factory('usersService', usersService);
 })();
