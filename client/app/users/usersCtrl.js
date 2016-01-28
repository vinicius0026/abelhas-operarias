(function () {
    /* global angular */
    'use strict';

    var UsersCtrl = function ($state, toastr, usersService) {
        var vm = this,

            viewUser = function (userId) {
                $state.go('app.user', {action: 'visualizar', id: userId});
            },

            removeUser = function (userId) {
                console.log('removing userId:', userId);
                usersService.remove(userId)
                    .then(function () {
                        toastr.success('Usuário removido com sucesso.');
                        $state.go('app.users', {}, {reload: true});
                    }, function () {
                        toastr.error('Erro ao remover usuário');
                    });
            };

        vm.viewUser = viewUser;
        vm.removeUser = removeUser;
    };

    UsersCtrl.$inject = ['$state', 'toastr', 'usersService'];


    angular.module('abelhas-operarias')
        .controller('UsersCtrl', UsersCtrl);
})();
