(function () {
    /* global angular */
    'use strict';

    var families = function ($stateProvider) {
        $stateProvider
            .state('app.families', {
                url: '/familias',
                templateUrl: 'app/families/familiesTpl.html',
                controller: 'FamiliesCtrl as vm'
            });
    };

    families.$inject = ['$stateProvider'];

    angular.module('abelhas-operarias')
        .config(families);
})();
