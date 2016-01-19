(function () {
    /* global angular */

    'use strict';

    var loginRoute = function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/loginTpl.html',
                controller: 'LoginCtrl as vm'
            });
    };

    loginRoute.$inject = ['$stateProvider'];


    angular.module('abelhas-operarias')
        .config(loginRoute);
})();
