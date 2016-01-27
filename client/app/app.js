(function () {
    /* global angular */
    'use strict';

    var runApp = function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            event.targetScope.$watch('$viewContentLoaded', function () {
                angular.element('html, body, #content')
                    .animate({scrollTop: 0}, 200);

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

    // Check authenticated route
    var checkAuthRoutes = function ($rootScope, $state, Auth, AUTH_EVENTS) {
        var onNotAuthenticated = function () {
                Auth.logout();
                $state.go('login', {});
            },

            stateChangeStart = function (event, toState) {

                if (toState.name !== 'login' && !Auth.isAuthenticated()) {
                    event.preventDefault();
                    onNotAuthenticated();
                }
            };

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, onNotAuthenticated);
        $rootScope.$on('$stateChangeStart', stateChangeStart);
    };

    checkAuthRoutes.$inject = ['$rootScope', '$state', 'Auth', 'AUTH_EVENTS'];

    // Http Providers
    var httpProviders = function ($httpProvider) {
        $httpProvider.interceptors.push('httpAuthInterceptor');
    };


    httpProviders.$inject = ['$httpProvider'];

    var dependencies = [
        // Vendor
        'ui.router',
        'toastr',
        'datatables',
        'datatables.bootstrap',
        'datatables.colreorder',
        'datatables.columnfilter',
        'datatables.colvis',
        'datatables.scroller',
        'datatables.tabletools',
        // App
        'constants-auth-events',
        'factory-api-requests',
        'factory-auth',
        'constants-datatables',
        'http-auth-interceptor'
    ];

    angular.module('abelhas-operarias', dependencies)
        .config(httpProviders)
        .config(defaultRoute)
        .run(checkAuthRoutes)
        .run(runApp);
})();
