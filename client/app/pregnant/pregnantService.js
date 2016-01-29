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
        };


        return {
            create: create
        };
    };

    pregnantService.$inject = ['ApiRequests', 'PREGNANT_URLS'];


    angular.module('abelhas-operarias')
        .factory('pregnantService', pregnantService);
 })();
