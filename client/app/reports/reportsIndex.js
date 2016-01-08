(function () {
    'use strict';

    var reports = function ($stateProvider) {
        $stateProvider
            .state('app.reports', {
                url: '/relatorios',
                templateUrl: 'app/reports/reportsTpl.html',
                controller: 'ReportsCtrl as vm'
            });
    };

    reports.$inject = ['$stateProvider'];

    angular.module('abelhas-operarias')
        .config(reports);
})();
