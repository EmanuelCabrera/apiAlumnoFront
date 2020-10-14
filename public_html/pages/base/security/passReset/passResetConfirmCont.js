(function () {
    var app = angular.module('app');

    app.controller('PassResetConfirmCont', ["$scope", '$state', "$stateParams", 'UserServ', function ($scope, $state, $stateParams, UserServ) {
            var private = {};
            $scope.sended = false;
            $scope.data = {};
            $scope.hasCorreo = false;
            $scope.hasCuit = false;


            $scope.passResetConfirm = function () {

                let data = angular.copy($scope.data);
                UserServ.passResetConfirm(data).success(function (data, status, headers, config) {
                    $state.go('login');
                });
            };


            private.init = function () {

                if ($.un($stateParams.pass_reset_code) || !$stateParams.pass_reset_code) {
                    $state.go(config.initState);
                } else {
                    $scope.data.passResetCode = $stateParams.pass_reset_code;
                }

                if (!$.un($stateParams.cuit) && $stateParams.cuit) {
                    $scope.data.cuit = $stateParams.cuit;
                    $scope.hasCuit = true;
                }

                if (!$.un($stateParams.correo) && $stateParams.correo) {
                    $scope.hasCuit = true;
                }




            };

            private.init();
        }]);
}());