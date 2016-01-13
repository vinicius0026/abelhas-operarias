(function () {
    /* global angular */
    'use strict';

    var pregnants = function ($stateProvider) {
        $stateProvider
            .state('app.pregnants', {
                url: '/gestantes',
                templateUrl: 'app/pregnant/pregnantTpl.html',
                controller: 'PregnantsCtrl as vm'
            });
    };

    pregnants.$inject = ['$stateProvider'];

    angular.module('abelhas-operarias')
        .config(pregnants);
})();
