(function () {
    /* global angular */
    'use strict';

    var runApp = function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            event.targetScope.$watch('$viewContentLoaded', function () {
                angular.element('html, body, #content').animate({ scrollTop: 0 }, 200);

                setTimeout(function () {
                    angular.element('#wrap').css('visibility', 'visible');

                    if (!angular.element('.dropdown').hasClass('open')) {
                        angular.element('.dropdown').find('>ul').slideUp();
                    }
                }, 200);
            });

            $rootScope.containerClass = toState.containerClass;
        });
    };

    runApp.$injector = ['$rootScope', '$state', '$stateParams'];

    var defaultRoute = function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/app/inicio');
    };

    defaultRoute.$injector = ['$urlRouterProvider'];

    angular.module('abelhas-operarias', ['ui.router'])
        .config(defaultRoute)
        .run(runApp);
})();
