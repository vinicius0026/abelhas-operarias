(function () {
    /* global angular */

    'use strict';

    var API_BASE_URL = '/api',
        AUTH_URL = '/auth/local',

        crudUrls = function (baseUrl) {
            return {
                base: baseUrl,
                fetch: baseUrl.concat('/fetch'),
                one: function (id) {
                    return baseUrl.concat('/:id').replace(':id', id);
                }
            };
        },

        usersUrls = (function () {
            var base = API_BASE_URL.concat('/users');

            return crudUrls(base);
        })(),

        pregnantUrls = (function () {
            var base = API_BASE_URL.concat('/pregnant');

            return crudUrls(base);
        })();

    angular.module('abelhas-operarias')
        .constant('AUTH_URL', AUTH_URL)
        .constant('USERS_URLS', usersUrls)
        .constant('PREGNANT_URLS', pregnantUrls);
})();
