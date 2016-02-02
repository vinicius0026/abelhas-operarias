(function () {
    /* global angular */
    'use strict';

    var families = function ($stateProvider) {
        $stateProvider
            .state('app.families', {
                url: '/familias',
                abstract: true,
                template: '<div ui-view></div>'
            })
            .state('app.families.list', {
                url: '/listar',
                templateUrl: 'app/families/familiesTpl.html',
                controller: 'FamiliesCtrl as vm'
            })
            .state('app.families.family', {
                url: '/:action/:id',
                templateUrl: 'app/families/familyTpl.html',
                controller: 'FamilyCtrl as vm'
            });
    };

    families.$inject = ['$stateProvider'];

    angular.module('abelhas-operarias')
        .config(families);
})();
