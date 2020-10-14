(function () {
    var app = angular.module('app');

    app.controller('PassResetCont', ["$scope", '$state', 'UserServ',
        function ($scope, $state, UserServ) {
            var private = {};
            $scope.sending = false;
            $scope.sended = false;

            $scope.data = {
                correo: '',
                cuit: ''
            };


            $scope.passReset = function () {

                let data = angular.copy($scope.data);

                if (data.correo) {
                    UserServ.passReset({
                        correo: data.correo
                    }).success(function (data, status, headers, config) {
                        $scope.sending = false;
                        $scope.sended = true;

                        $state.go('login');
                    }).error(function () {
                        $scope.sending = false;
                    });
                } else if (data.cuit) {
                    UserServ.passResetCUIT({
                        cuit: data.cuit
                    }).success(function (data, status, headers, config) {
                        $scope.sending = false;
                        $scope.sended = true;

                        $state.go('login');
                    }).error(function () {
                        $scope.sending = false;
                    });
                }

            };


            private.init = function () {
            };

            private.init();
        }]);
}());