(function () {
    /* global angular */

    'use strict';

    var authEvents = {
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    };


    angular.module('constants-auth-events', [])
        .constant('AUTH_EVENTS', authEvents);
})();
