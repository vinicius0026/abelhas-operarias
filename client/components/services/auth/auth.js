(function () {
    'use strict';

    var Auth = function ($rootScope, $http, $q, AUTH_URL, ApiRequests) {
        var LOCAL_TOKEN_KEY = 'abelhas-operarias-token',


            setToken = function (token) {
                if (window.localStorage) {
                    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                    $.ajaxSetup({
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                }
            },

            getToken = function () {
                if (window.localStorage) {
                    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);

                    if (token) {
                        return token;
                    }

                    return false;
                }
            },


            refreshToken = function () {
                var token = getToken();

                if (token) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;

                    $.ajaxSetup({
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                }
            },

            isAuthenticated = function () {
                return Boolean(getToken());
            },


            signin = function (userData) {

                var defer = $q.defer(),
                    configs = {
                        method: 'POST',
                        url: AUTH_URL,
                        data: userData
                    };

                ApiRequests.req(configs)
                    .then(function (res) {
                        if (res && res.data && res.data.data && res.data.data.token) {
                            var token = res.data.data.token;
                            setToken(token);
                            defer.resolve(res);
                        } else {
                            defer.reject(new Error('No token found in the response!'));
                        }
                    }, function (err, status) {
                        if (status === 401) {
                            defer.reject(err);
                        } else {
                            defer.reject(new Error(err));
                        }
                    });

                return defer.promise;
            },


            logout = function () {
                if (window.localStorage) {
                    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
                    $http.defaults.headers.common.Authorization = undefined;

                    $.ajaxSetup({
                        headers: {
                            'Authorization': ''
                        }
                    });
                }
            };


        return {
            signin: signin,
            setToken: setToken,
            getToken: getToken,
            logout: logout,
            isAuthenticated: isAuthenticated,
            refreshToken: refreshToken
        };
    };

    Auth.$inject = ['$rootScope', '$http', '$q', 'AUTH_URL', 'ApiRequests'];

    angular.module('factory-auth', [])
        .factory('Auth', Auth);
})();
