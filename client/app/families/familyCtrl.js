(function () {
    /* global angular, moment */

    'use strict';

    var FamilyCtrl = function ($state, $stateParams, toastr,
                                       familiesService) {
        var vm = this,

            validActions = ['cadastrar', 'visualizar', 'editar'],

            validateAction = function (action) {
                if (validActions.indexOf(action) < 0) {
                    toastr.warning('Ação inválida');
                    $state.go('app.families.list');
                }
            },

            capitalizeFirstLetter = function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            createFamily = function (data) {
                familiesService.create(data)
                    .then(function () {
                        toastr.success('Família cadastrada com sucesso.');
                        $state.go('app.families.list');
                    }, function (err) {
                        if (/\$cpf_1 dup key/.test(err.data.info)) {
                            return toastr.error('CPF já cadastrado no ' +
                                'sistema.');
                        }

                        toastr.error('Erro ao cadastrar família. ' +
                            'Favor tentar novamente');
                    });
            },

            updateFamily = function (data, familyId) {
                familiesService.update(familyId, data)
                    .then(function () {
                        toastr.success('Família atualizada com sucesso.');
                        $state.go('app.families.family',
                            {action: 'visualizar', id: vm.family.id},
                            {reload: true});
                    }, function () {
                        toastr.error('Erro ao atualizar dados da família');
                    });
            },

            saveFamily = function (familyData) {

                if (vm.form.$valid) {

                    if (vm.action === 'cadastrar') {
                        createFamily(familyData);
                    } else if (vm.action === 'editar') {
                        updateFamily(familyData, $stateParams.id);
                    }
                } else {

                    if (!vm.form.name.$valid) {
                        return toastr.warning('Preencha o nome da esposa.');
                    }

                    if (!vm.form.cpf.$valid) {
                        var msg = !vm.form.cpf.$viewValue ? 'Preencha o ' +
                        'CPF da esposa.' : 'O CPF informado é inválido.';
                        return toastr.warning(msg);
                    }

                    toastr.warning('Preencha todos os campos obrigatórios.');
                }
            },

            fetchFamily = function (familyId) {
                if ($stateParams.action === 'editar' ||
                    $stateParams.action === 'visualizar') {
                    familiesService.get(familyId)
                        .then(function (res) {
                            vm.family = res.data.data;
                            vm.family.dateForDonation =
                                new Date(res.data.data.dateForDonation);
                            vm.family.monthsReceivedDonation = res.data.data
                                .monthsReceivedDonation.map(function (m) {
                                    return moment(m);
                                });
                        }, function () {
                            toastr.error('Erro ao ler dados da família');
                        });
                } else {
                    vm.family = {};
                }
            },

            editFamily = function () {
                $state.go('app.families.family', {action: 'editar',
                    id: vm.family.id}, {reload: true});
            };

        vm.capitalizeFirstLetter = capitalizeFirstLetter;
        vm.action = $stateParams.action;
        vm.saveFamily = saveFamily;
        vm.editFamily = editFamily;

        validateAction(vm.action);
        fetchFamily($stateParams.id);
    };

    FamilyCtrl.$inject = ['$state', '$stateParams', 'toastr',
        'familiesService'];


    angular.module('abelhas-operarias')
        .controller('FamilyCtrl', FamilyCtrl);
})();
