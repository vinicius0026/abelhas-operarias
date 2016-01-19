(function () {
    /* global angular */
    'use strict';

    var HomeCtrl = function ($state, Auth) {
        var vm = this,

            logout = function () {
                Auth.logout();
                $state.go('login');
            };

        vm.logout = logout;
    };

    HomeCtrl.$inject = ['$state', 'Auth'];

    angular.module('abelhas-operarias')
        .controller('HomeCtrl', HomeCtrl);
})();
