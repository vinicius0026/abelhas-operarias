(function () {
    'use strict';

    var CreateUserCtrl = function ($state, usersService, toastr) {
        var vm = this,
            createUser = function (user) {
                if (vm.form.$valid) {
                    usersService.create(user)
                        .then(function (res) {
                            toastr.success('Usuário criado com sucesso');
                            $state.go('app.users');
                        },
                        function () {
                            toastr.error('Erro ao criar usuário');
                        });
                } else {
                    toastr.error('Preencha todos os campos obrigatórios');
                }
            };

        vm.createUser = createUser;
    };

    CreateUserCtrl.$inject = ['$state', 'usersService', 'toastr'];


    angular.module('abelhas-operarias')
        .controller('CreateUserCtrl', CreateUserCtrl);
})();
