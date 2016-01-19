(function () {
    'use strict';

    var usersRouter = function ($stateProvider) {
        $stateProvider
            .state('app.users', {
                url: '/usuarios',
                templateUrl: 'app/users/usersTpl.html',
                controller: 'UsersCtrl as vm'
            })
            .state('app.createUser', {
                url: '/criarUsuario',
                templateUrl: 'app/users/create/createUserTpl.html',
                controller: 'CreateUserCtrl as vm'
            });
    };

    usersRouter.$inject = ['$stateProvider'];


    angular.module('abelhas-operarias')
        .config(usersRouter);
})();
