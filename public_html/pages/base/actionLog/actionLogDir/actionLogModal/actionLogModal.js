
(function () {
    var app = angular.module('app');

    app.controller('ActionLogModalCont', ["$scope", '$uibModalInstance', 'ActionLogServ', 'id', function ($scope, $uibModalInstance, ActionLogServ, id) {
            var private = {};

            $scope.close = function () {
                $uibModalInstance.close();
            };

            private.init = function () {
                $scope.id = id;
            };
            private.init();
        }]);
}());