(function () {
    'use strict';

    var DashboardCtrl = function () {
        var vm = this;

        vm.test = 'Dashboard na área';
    };

    DashboardCtrl.$inject = [];

    angular.module('abelhas-operarias')
        .controller('DashboardCtrl', DashboardCtrl);
})();
