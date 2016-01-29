(function () {
    /* global angular */

    'use strict';

    var SinglePregnantCtrl = function ($state, $stateParams, toastr, pregnantService) {
        var vm = this,

            validActions = ['cadastrar', 'visualizar', 'editar'],

            validateAction = function (action) {
                if (validActions.indexOf(action) < 0) {
                    toastr.warning('Ação inválida');
                    $state.go('app.pregnant.list');
                }
            },

            capitalizeFirstLetter = function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            createPregnant = function (data) {
                pregnantService.create(data)
                    .then(function () {
                        toastr.success('Gestante cadastrada com sucesso.');
                        $state.go('app.pregnant');
                    }, function () {
                        toastr.error('Erro ao cadastrar gestante. Favor tentar novamente');
                    });
            },

            updatePregnant = function (data, pregnantId) {
                pregnantService.update(pregnantId, data)
                    .then(function () {
                        toastr.success('Gestante atualizada com sucesso.');
                        $state.go('app.pregnant.pregnant',
                            {action: 'visualizar', id: vm.pregnant.id},
                            {reload: true});
                    }, function () {
                        toastr.error('Erro ao atualizar dados da gestante');
                    });
            },

            savePregnant = function (pregnantData) {
                if (vm.form.$valid) {
                    if (vm.action === 'cadastrar') {
                        createPregnant(pregnantData);
                    } else if (vm.action === 'editar') {
                        updatePregnant(pregnantData, $stateParams.id);
                    }
                } else {
                    toastr.warning('Preencha todos os campos obrigatórios.');
                }
            };

        vm.capitalizeFirstLetter = capitalizeFirstLetter;
        vm.action = $stateParams.action;
        vm.savePregnant = savePregnant;

        validateAction(vm.action);
    };

    SinglePregnantCtrl.$inject = ['$state', '$stateParams', 'toastr',
        'pregnantService'];


    angular.module('abelhas-operarias')
        .controller('SinglePregnantCtrl', SinglePregnantCtrl);
})();
