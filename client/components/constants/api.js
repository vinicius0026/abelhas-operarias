(function () {
    /* global angular */

    'use strict';

    var API_BASE_URL = '/api',
        AUTH_URL = '/auth/local',

        usersUrls = (function () {
            var base = API_BASE_URL.concat('/users');
            return {
                base: base,
                fetch: base.concat('/fetch'),
                one: function (id) {
                    base.concat('/:id').replace(':id', id);
                }
            }
        })();

    angular.module('abelhas-operarias')
        .constant('AUTH_URL', AUTH_URL)
        .constant('USERS_URLS', usersUrls);
})();
