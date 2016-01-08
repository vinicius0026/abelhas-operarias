(function () {
    'use strict';

    var defaultRoute = function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/app/dashboard');
    };

    defaultRoute.$injector = ['$urlRouterProvider'];

    angular.module('abelhas-operarias', ['ui.router'])
        .config(defaultRoute);
})();
