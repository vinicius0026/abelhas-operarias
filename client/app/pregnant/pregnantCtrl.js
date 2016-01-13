(function () {
    /* global angular */
    'use strict';

    var PregnantsCtrl = function () {
        var vm = this;

        vm.test = 'Gestantes';

    };

    PregnantsCtrl.$inject = [];

    angular.module('abelhas-operarias')
        .controller('PregnantsCtrl', PregnantsCtrl);
})();
