(function () {
    /* global angular */
    'use strict';

    var FamiliesTableCtrl = function ($compile, $scope, $filter,
                                      DTOptionsBuilder, DTColumnBuilder,
                                      FAMILIES_URLS, DT_LANGUAGE) {
        var vm = this;

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withBootstrap()
            .withOption('ajax', {
                url: FAMILIES_URLS.fetch,
                type: 'POST',
                error: function (err) {
                    // avoiding annoying alerts from datatables
                    console.log(err);
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
            DTColumnBuilder.newColumn('cpf').withTitle('CPF')
                .renderWith(function (data) {
                    return $filter('brCpf')(data);
                }),
            DTColumnBuilder.newColumn('neighborhood').withTitle('Bairro')
                .renderWith(function (data) {
                    if (!data) {
                        return '-';
                    }
                    return data;
                }),
            DTColumnBuilder.newColumn('createdAt').withTitle('Data de Cadastro')
                .withOption('searchable', false).renderWith(function (data) {
                    return $filter('date')(data);
                }),
            DTColumnBuilder.newColumn(null).withTitle('Ações')
                .notSortable().withOption('searchable', false)
                .renderWith(function (data /*, type, full, meta*/) {

                    return '<a ng-click="vm.viewFamily(\'' + data._id +
                        '\')" class="btn btn-xs btn-default">' +
                        '<i class="fa fa-search"></i> Detalhes</a>' +
                        '<a ng-click="vm.removeFamily(\'' + data._id + '\'' +
                        ')" class="btn btn-xs btn-lightred" confirm="Tem ' +
                        'certeza que pretende remover esta família? ' +
                        'Esta ação não pode ser desfeita."' +
                        'confirm-settings="{defaultLabels: ' +
                        '{title: \'Confirmação\', ok: \'Ok\', ' +
                        'cancel: \'Cancelar\'}}">' +
                        '<i class="fa fa-times"></i> Remover</a>';
                })
        ];
    };

    FamiliesTableCtrl.$inject = ['$compile', '$scope', '$filter',
        'DTOptionsBuilder', 'DTColumnBuilder', 'FAMILIES_URLS', 'DT_LANGUAGE'];

    angular.module('abelhas-operarias')
        .controller('FamiliesTableCtrl', FamiliesTableCtrl);
})();
