(function () {
    /* global angular */
    'use strict';

    var PregnantsCtrl = function ($state, pregnantService, toastr) {
        var vm = this,

            viewPregnant = function (pregnantId) {
                $state.go('app.pregnant.pregnant', {action: 'visualizar',
                    id: pregnantId}, {reload: true});
            },

            removePregnant = function (pregnantId) {
                pregnantService.remove(pregnantId)
                    .then(function () {
                        toastr.success('Gestante removida com sucesso.');
                        $state.go('app.pregnant.list', {}, {reload: true});
                    }, function () {
                        toastr.error('Erro ao remover gestante.');
                    });
            };

        vm.viewPregnant = viewPregnant;
        vm.removePregnant = removePregnant;
    };

    PregnantsCtrl.$inject = ['$state', 'pregnantService', 'toastr'];

    angular.module('abelhas-operarias')
        .controller('PregnantsCtrl', PregnantsCtrl);
})();
