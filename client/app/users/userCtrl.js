(function () {
    /* global angular */
    'use strict';

    var UserCtrl = function ($state, $stateParams, usersService, toastr) {
        var vm = this,

            createUser = function (user) {
                if (vm.form.$valid) {
                    usersService.create(user)
                        .then(function () {
                            toastr.success('Usuário criado com sucesso');
                            $state.go('app.users');
                        },
                        function () {
                            toastr.error('Erro ao criar usuário');
                        });
                } else {
                    toastr.error('Preencha todos os campos obrigatórios');
                }
            },

            fetchUser = function (userId) {
                if ($stateParams.action === 'editar') {
                    usersService.get(userId)
                        .then(function (res) {
                            console.log('res', res);
                            // vm.user = res.data.data;
                        }, function () {
                            toastr.error('Erro ao ler dados do usuário');
                        });
                } else {
                    vm.user = {};
                }

            },

            updateUser = function (/* userData, userId*/) {

            },

            saveUser = function (userData) {
                if ($stateParams.action === 'criar') {
                    createUser(userData);
                } else if ($stateParams.action === 'editar') {
                    updateUser(userData, $stateParams.id);
                }

            };

        fetchUser($stateParams.id);

        vm.createUser = createUser;
        vm.saveUser = saveUser;
    };

    UserCtrl.$inject = ['$state', '$stateParams', 'usersService', 'toastr'];


    angular.module('abelhas-operarias')
        .controller('UserCtrl', UserCtrl);
})();
