(function () {
    /* global angular */

    'use strict';

    var ApiRequests = function ($http, $q) {
        var req = function (configsObj) {
                var defer = $q.defer();

                $http(configsObj)
                    .then(function (data) {
                        defer.resolve(data);
                    }, function (error) {
                        defer.reject(error);
                    })
                    .catch(function (err) {
                        console.log('Api Request Error:', err);
                    });

                return defer.promise;
            };


        return {
            req: req
        };
    };

    ApiRequests.$inject = ['$http', '$q'];


    angular.module('factory-api-requests', [])
        .factory('ApiRequests', ApiRequests);
})();
