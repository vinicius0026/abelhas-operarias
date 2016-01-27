(function () {
    /* global angular */
    'use strict';

    var UsersCtrl = function ($state) {
        var vm = this,

            editUser = function (userId) {
                $state.go('app.user', {action: 'editar', id: userId});
            },

            viewUser = function (userId) {
                $state.go('app.user', {action: 'visualizar', id: userId});
            };

        vm.editUser = editUser;
        vm.viewUser = viewUser;
    };

    UsersCtrl.$inject = ['$state'];


    angular.module('abelhas-operarias')
        .controller('UsersCtrl', UsersCtrl);
})();
