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
                        $state.go('app.pregnant.list');
                    }, function (err) {
                        if (/\$cpf_1 dup key/.test(err.data.info)) {
                            return toastr.error('CPF já cadastrado no ' +
                                'sistema.');
                        }

                        toastr.error('Erro ao cadastrar gestante. ' +
                            'Favor tentar novamente');
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
                    if (!vm.form.name.$valid) {
                        return toastr.warning('Preencha o nome da gestante.');
                    }

                    if (!vm.form.cpf.$valid) {
                        var msg = !vm.form.cpf.$viewValue ? 'Preencha o CPF ' +
                            'da gestante' : 'O CPF informado é inválido.';
                        return toastr.warning(msg);
                    }

                    if (!vm.form.age.$valid) {
                        return toastr.warning('Preencha a idade da gestante.');
                    }

                    toastr.warning('Preencha todos os campos obrigatórios.');
                }
            },

            fetchPregnant = function (pregnantId) {
                if ($stateParams.action === 'editar' ||
                    $stateParams.action === 'visualizar') {
                    pregnantService.get(pregnantId)
                        .then(function (res) {
                            vm.pregnant = res.data.data;
                        }, function () {
                            toastr.error('Erro ao ler dados da gestante');
                        });
                } else {
                    vm.pregnant = {};
                }
            },

            editPregnant = function () {
                $state.go('app.pregnant.pregnant', {action: 'editar',
                    id: vm.pregnant.id}, {reload: true});
            };

        vm.capitalizeFirstLetter = capitalizeFirstLetter;
        vm.action = $stateParams.action;
        vm.savePregnant = savePregnant;
        vm.editPregnant = editPregnant;

        validateAction(vm.action);
        fetchPregnant($stateParams.id);
    };

    SinglePregnantCtrl.$inject = ['$state', '$stateParams', 'toastr',
        'pregnantService'];


    angular.module('abelhas-operarias')
        .controller('SinglePregnantCtrl', SinglePregnantCtrl);
})();
