(function () {
    /* global angular */
    'use strict';

    var PregnantsCtrl = function ($state) {
        var vm = this,

            viewPregnant = function (pregnantId) {
                $state.go('app.pregnant.pregnant', {action: 'visualizar',
                    id: pregnantId}, {reload: true});
            };

        vm.viewPregnant = viewPregnant;
    };

    PregnantsCtrl.$inject = ['$state'];

    angular.module('abelhas-operarias')
        .controller('PregnantsCtrl', PregnantsCtrl);
})();
