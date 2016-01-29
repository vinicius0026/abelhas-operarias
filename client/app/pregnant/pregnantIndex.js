(function () {
    /* global angular */
    'use strict';

    var pregnants = function ($stateProvider) {
        $stateProvider
            .state('app.pregnant', {
                url: '/gestantes',
                abstract: true,
                template: '<div ui-view></div>'
            })
            .state('app.pregnant.list', {
                url: '/listar',
                templateUrl: 'app/pregnant/pregnantTpl.html',
                controller: 'PregnantsCtrl as vm'
            })
            .state('app.pregnant.pregnant', {
                url: '/:action/:id',
                templateUrl: 'app/pregnant/singlePregnantTpl.html',
                controller: 'SinglePregnantCtrl as vm'
            });
    };

    pregnants.$inject = ['$stateProvider'];

    angular.module('abelhas-operarias')
        .config(pregnants);
})();
