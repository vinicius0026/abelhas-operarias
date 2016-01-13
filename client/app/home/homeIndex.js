(function () {
    /* global angular */
    'use strict';

    var home = function ($stateProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'app/home/homeTpl.html',
                controller: 'HomeCtrl as vm'
            });
    };

    home.$inject = ['$stateProvider'];

    angular.module('abelhas-operarias')
        .config(home);
})();
