(function () {
    /* global angular */

    'use strict';

    var pregnantService = function (ApiRequests, PREGNANT_URLS) {
        var create = function (data) {
                return ApiRequests.req({
                    method: 'POST',
                    url: PREGNANT_URLS.base,
                    data: data
                });
            },

            get = function (pregnantId) {
                return ApiRequests.req({
                    method: 'GET',
                    url: PREGNANT_URLS.one(pregnantId)
                });
            },

            update = function (pregnantId, data) {
                return ApiRequests.req({
                    method: 'PUT',
                    url: PREGNANT_URLS.one(pregnantId),
                    data: data
                });
            };


        return {
            create: create,
            get: get,
            update: update
        };
    };

    pregnantService.$inject = ['ApiRequests', 'PREGNANT_URLS'];


    angular.module('abelhas-operarias')
        .factory('pregnantService', pregnantService);
 })();
