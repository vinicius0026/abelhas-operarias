(function () {
    'use strict';

    var IndexController = function () {
        var vm = this;

        vm.test = 'Está funcionando';
    };

    angular.module('abelhas-operarias', [])
        .controller('IndexController', IndexController);

})();
