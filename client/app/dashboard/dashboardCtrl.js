(function () {
    /* global angular */
    'use strict';

    var DashboardCtrl = function () {
        var vm = this;

        vm.test = 'Tela Inicial';
    };

    DashboardCtrl.$inject = [];

    angular.module('abelhas-operarias')
        .controller('DashboardCtrl', DashboardCtrl);
})();
