(function () {
    /* global angular */
    'use strict';

    var FamiliesCtrl = function ($state, $uibModal, familiesService, toastr) {
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
            },

            openRegisterDonationModal = function (familyId) {
                $uibModal.open({
                    templateUrl: 'app/families/registerDonationModalTpl.html',
                    controller: 'RegisterDonationModalCtrl as vm',
                    size: 'lg',
                    resolve: {
                        familyId: function () {
                            return familyId;
                        }
                    }
                });
            };

        vm.viewFamily = viewFamily;
        vm.removeFamily = removeFamily;
        vm.openRegisterDonationModal = openRegisterDonationModal;
    };

    FamiliesCtrl.$inject = ['$state', '$uibModal', 'familiesService', 'toastr'];

    angular.module('abelhas-operarias')
        .controller('FamiliesCtrl', FamiliesCtrl);
})();
