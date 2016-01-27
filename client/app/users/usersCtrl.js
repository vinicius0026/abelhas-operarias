(function () {
    /* global angular */
    'use strict';

    var UsersCtrl = function ($state) {
        var vm = this,

            editUser = function (userId) {
                $state.go('app.user', {action: 'editar', id: userId});
            };

        vm.editUser = editUser;
    };

    UsersCtrl.$inject = ['$state'];


    angular.module('abelhas-operarias')
        .controller('UsersCtrl', UsersCtrl);
})();
