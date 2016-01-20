(function () {
    'use strict';

    var languageOption = {
        sLengthMenu: 'Exibir _MENU_ entradas',
        sInfo:  'Encontradas _TOTAL_ ocorrências',
        sInfoFiltered: '(filtradas de um total de _MAX_ ocorrências)',
        sSearch: 'Buscar:',
        oPaginate: {
            sFirst:    'Primeira',
            sLast: 'Última',
            sNext: 'Próxima',
            sPrevious: 'Anterior'
        }
    };

    angular.module('constants-datatables', [])
        .constant('DT_LANGUAGE', languageOption);
})();
