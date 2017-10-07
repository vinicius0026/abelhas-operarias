(function () {
    /* global angular, moment */
    'use strict';

    angular.module('abelhas-operarias').controller('RegisterDonationModalCtrl',
        function ($scope, $uibModalInstance, familiesService, toastr,
                  familyId) {
            $scope.selectedMonth = moment().startOf('month').format('MMMM');
            $scope.months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                .map(m => moment().month(m).startOf('month'))
                .map(m => m.format('MMMM'));
            $scope.selectedYear = moment().year().toString();
            $scope.years = [-2, -1, 0, 1, 2].map(y => moment().year() + y)
                .map(y => y.toString());
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.registerDonation = function () {
                var donationDate = moment().month($scope.selectedMonth)
                    .year($scope.selectedYear)
                    .startOf('month');
                familiesService.registerDonation(familyId, donationDate)
                    .then(() => {
                        $uibModalInstance.dismiss();
                        toastr.success('Doação registrada com sucesso.');
                    })
                    .catch(err => {
                        console.error(err);
                        toastr.error('Erro ao registrar doação');
                    });
            };
        });
})();
