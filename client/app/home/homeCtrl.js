(function () {
    'use strict';

    var HomeCtrl = function () {
        var vm = this;

        vm.test = 'Está funcionando';

    };

    HomeCtrl.$inject = [];

    angular.module('abelhas-operarias')
        .controller('HomeCtrl', HomeCtrl);
})();
