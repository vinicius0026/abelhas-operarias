(function () {
    /* global angular */
    'use strict';

    var UsersTableCtrl = function ($compile, $scope, DTOptionsBuilder,
                                   DTColumnBuilder, USERS_URLS, DT_LANGUAGE) {
        var vm = this;

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withBootstrap()
            .withOption('ajax', {
                url: USERS_URLS.fetch,
                type: 'POST',
                error: function () {
                    // doing nothing with the error...
                    // just avoiding the annoying popup
                }
            })
            .withDataProp('data')
            .withOption('processing', true)
            .withOption('serverSide', true)
            .withOption('order', [[0, 'asc']])
            .withOption('createdRow', function (row/*, data, dataIndex*/) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            })
            .withOption('headerCallback', function (header) {
                if (!vm.headerCompiled) {
                    vm.headerCompiled = true;
                    $compile(angular.element(header).contents())($scope);
                }
            })
            .withLanguage(DT_LANGUAGE)
            .withPaginationType('full_numbers')
            .withOption('autoWidth', true);

        /**
         * @see https://l-lin.github.io/angular-datatables/#/rowSelect
         * @type {Array} Array of columns of DataTable
         */
        vm.dtColumns = [
            DTColumnBuilder.newColumn('name').withTitle('Nome'),
            DTColumnBuilder.newColumn('username').withTitle('Nome de Usuário'),
            DTColumnBuilder.newColumn('email').withTitle('Email')
                .renderWith(function (data) {
                    if (data) {
                        return data;
                    }
                    return '';
                }),
            DTColumnBuilder.newColumn(null).withTitle('Ações')
                .notSortable().withOption('searchable', false)
                .renderWith(function (data /*, type, full, meta*/) {

                    return '<a ng-click="vm.editUser(\'' + data._id + '\')" ' +
                            'class="btn btn-xs btn-default">' +
                        '<i class="fa fa-search"></i> Detalhes</a>' +
                        '<a href="#" ng-click="' +
                            'vm.removeUser(\'' + data._id + '\')" ' +
                            'class="btn btn-xs btn-lightred">' +
                        '<i class="fa fa-times"></i> Remover</a>';
                })
        ];
    };

    UsersTableCtrl.$inject = ['$compile', '$scope', 'DTOptionsBuilder',
        'DTColumnBuilder', 'USERS_URLS', 'DT_LANGUAGE'];

    angular.module('abelhas-operarias')
        .controller('UsersTableCtrl', UsersTableCtrl);
})();
