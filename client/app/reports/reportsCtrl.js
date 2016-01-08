(function () {
    'use strict';

    var ReportsCtrl = function () {
        var vm = this;
        vm.test = 'Relatórios';
    };

    ReportsCtrl.$inject = [];

    angular.module('abelhas-operarias')
        .controller('ReportsCtrl', ReportsCtrl);
})();
