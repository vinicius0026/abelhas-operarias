(function () {
    /* global angular */
    'use strict';

    var FamiliesCtrl = function ($state, familiesService, toastr) {
        var vm = this,

            viewFamily = function (familyId) {
                $state.go('app.families.family', {action: 'visualizar',
                    id: familyId}, {reload: true});
            },

            removeFamily = function (familyId) {
                familiesService.remove(familyId)
                    .then(function () {
                        toastr.success('Família removida com sucesso.');
                        $state.go('app.families.list', {}, {reload: true});
                    }, function () {
                        toastr.error('Erro ao remover família.');
                    });
            };

        vm.viewFamily = viewFamily;
        vm.removeFamily = removeFamily;
    };

    FamiliesCtrl.$inject = ['$state', 'familiesService', 'toastr'];

    angular.module('abelhas-operarias')
        .controller('FamiliesCtrl', FamiliesCtrl);
})();
