(function () {
    /* global angular */
    'use strict';

    var usersRouter = function ($stateProvider) {
        $stateProvider
            .state('app.users', {
                url: '/usuarios',
                abstract: true,
                template: '<div ui-view></div>'
            })
            .state('app.users.list', {
                url: '/listar',
                templateUrl: 'app/users/usersTpl.html',
                controller: 'UsersCtrl as vm'
            })
            .state('app.users.user', {
                url: '/:action/:id',
                templateUrl: 'app/users/userTpl.html',
                controller: 'UserCtrl as vm'
            });
    };

    usersRouter.$inject = ['$stateProvider'];


    angular.module('abelhas-operarias')
        .config(usersRouter);
})();
