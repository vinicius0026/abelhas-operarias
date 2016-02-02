(function () {
    /* global angular */
    'use strict';

    var UserCtrl = function ($state, $stateParams, usersService, toastr) {
        var vm = this,

            createUser = function (user) {
                usersService.create(user)
                    .then(function () {
                        toastr.success('Usuário criado com sucesso');
                        $state.go('app.users.list');
                    },
                    function () {
                        toastr.error('Erro ao criar usuário');
                    });
            },

            fetchUser = function (userId) {
                if ($stateParams.action === 'editar' ||
                    $stateParams.action === 'visualizar') {
                    usersService.get(userId)
                        .then(function (res) {
                            vm.user = res.data.data;
                        }, function () {
                            toastr.error('Erro ao ler dados do usuário');
                        });
                } else {
                    vm.user = {};
                }

            },

            updateUser = function (userData, userId) {
                usersService.update(userId, userData)
                    .then(function () {
                        toastr.success('Usuário atualizado com sucesso');
                        $state.go('app.users.user', {action: 'visualizar',
                            id: vm.user.id}, {reload: true});
                    }, function () {
                        toastr.error('Erro ao atualizar usuário');
                    });
            },

            saveUser = function (userData) {
                if (vm.form.$valid) {
                    if ($stateParams.action === 'criar') {
                        createUser(userData);
                    } else if ($stateParams.action === 'editar') {
                        updateUser(userData, $stateParams.id);
                    }
                } else {
                    toastr.error('Preencha todos os campos obrigatórios');
                }
            },

            editUser = function () {
                $state.go('app.users.user', {action: 'editar', id: vm.user.id},
                    {reload: true});
            },

            capitalizeFirstLetter = function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            };

        fetchUser($stateParams.id);

        vm.createUser = createUser;
        vm.saveUser = saveUser;
        vm.action = $stateParams.action;
        vm.editUser = editUser;
        vm.capitalizeFirstLetter = capitalizeFirstLetter;
    };

    UserCtrl.$inject = ['$state', '$stateParams', 'usersService', 'toastr'];


    angular.module('abelhas-operarias')
        .controller('UserCtrl', UserCtrl);
})();
