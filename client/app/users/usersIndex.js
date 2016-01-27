(function () {
    /* global angular */
    'use strict';

    var usersRouter = function ($stateProvider) {
        $stateProvider
            .state('app.users', {
                url: '/usuarios',
                templateUrl: 'app/users/usersTpl.html',
                controller: 'UsersCtrl as vm'
            })
            .state('app.user', {
                url: '/usuarios/:action/:id',
                templateUrl: 'app/users/userTpl.html',
                controller: 'UserCtrl as vm'
            });
    };

    usersRouter.$inject = ['$stateProvider'];


    angular.module('abelhas-operarias')
        .config(usersRouter);
})();
