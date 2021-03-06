(function () {
    /* global angular */
    'use strict';

    var dashboard = function ($stateProvider) {
        $stateProvider
            .state('app.dashboard', {
                url: '/inicio',
                templateUrl: 'app/dashboard/dashboardTpl.html',
                controller: 'DashboardCtrl as vm'
            });
    };

    dashboard.$inject = ['$stateProvider'];

    angular.module('abelhas-operarias')
        .config(dashboard);
})();
