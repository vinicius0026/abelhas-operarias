(function () {
    /* global angular */

    'use strict';

    var familiesService = function (ApiRequests, FAMILIES_URLS) {
        var create = function (data) {
                return ApiRequests.req({
                    method: 'POST',
                    url: FAMILIES_URLS.base,
                    data: data
                });
            },

            get = function (id) {
                return ApiRequests.req({
                    method: 'GET',
                    url: FAMILIES_URLS.one(id)
                });
            },

            update = function (id, data) {
                return ApiRequests.req({
                    method: 'PUT',
                    url: FAMILIES_URLS.one(id),
                    data: data
                });
            },

            remove = function (id) {
                return ApiRequests.req({
                    method: 'DELETE',
                    url: FAMILIES_URLS.one(id)
                });
            };

        return {
            create: create,
            get: get,
            update: update,
            remove: remove
        };
    };

    familiesService.$inject = ['ApiRequests', 'FAMILIES_URLS'];


    angular.module('abelhas-operarias')
        .factory('familiesService', familiesService);
})();
