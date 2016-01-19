(function () {
    /* global angular */
    'use strict';

    var LoginCtrl = function ($state, Auth, toastr) {
        var vm = this,

            login = function (username, password) {
                if (vm.form.$valid) {
                    Auth.signin({
                        username: username,
                        password: password
                    }).then(function () {
                        $state.go('app.dashboard');
                    }, function () {
                        toastr.error('Nome de usuário ou senha incorretos');
                    });
                } else {
                    toastr.error('Preencha o nome de usuário e a senha para realizar login.', 'Erro');
                }
            };

        vm.login = login;
    };

    LoginCtrl.$inject = ['$state', 'Auth', 'toastr'];

    angular.module('abelhas-operarias')
        .controller('LoginCtrl', LoginCtrl);
})();
