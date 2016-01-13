(function () {
    /* global angular */
    'use strict';

    var FamiliesCtrl = function () {
        var vm = this;
        vm.test = 'Famílias';
    };

    FamiliesCtrl.$inject = [];


    angular.module('abelhas-operarias')
        .controller('FamiliesCtrl', FamiliesCtrl);
})();
