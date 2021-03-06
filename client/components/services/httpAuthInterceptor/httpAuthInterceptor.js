(function () {
    /* globals angular, $ */
    'use strict';

    var httpAuthInterceptor = function ($rootScope, AUTH_EVENTS) {
        var responseError = function (res) {
            if (res && res.status === 401) {
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
            return res;
        };

        $(document).ajaxError(function (event, res) {
            responseError(res);
        });

        return {
            responseError: responseError
        };
    };

    httpAuthInterceptor.$inject = ['$rootScope', 'AUTH_EVENTS'];

    angular.module('http-auth-interceptor', [])
        .factory('httpAuthInterceptor', httpAuthInterceptor);
})();
