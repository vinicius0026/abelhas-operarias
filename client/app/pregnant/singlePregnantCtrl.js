(function () {
    /* global angular */

    'use strict';

    var SinglePregnantCtrl = function ($state, $stateParams, toastr) {
        var vm = this,

            validActions = ['criar', 'visualizar', 'editar'],

            validateAction = function (action) {
                if (validActions.indexOf(action) < 0) {
                    toastr.warning('Ação inválida');
                    $state.go('app.pregnant.list');
                }
            },

            capitalizeFirstLetter = function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            };

        vm.capitalizeFirstLetter = capitalizeFirstLetter;
        vm.action = $stateParams.action;

        validateAction(vm.action);
    };

    SinglePregnantCtrl.$inject = ['$state', '$stateParams', 'toastr'];


    angular.module('abelhas-operarias')
        .controller('SinglePregnantCtrl', SinglePregnantCtrl);
})();
