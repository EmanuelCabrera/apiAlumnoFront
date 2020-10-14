(function () {
    var app = angular.module('app');

    app.controller('MethodNameCont', ["$scope", "$rootScope", 'MethodNameServ', '$state', function ($scope, $rootScope, MethodNameServ, $state) {
            var private={};
            $scope.modes = {options2: {mode: 'tree'}, options1: {mode: 'code'}};
            $scope.method = {"name": ""};
            $scope.obj = {"test": "test"};
            $scope.onLoad = function (instance) {
                instance.expandAll();
            };


            $scope.getMethods = function () {
                MethodNameServ.getMethodNames().success(function (data) {
                    $scope.methods = data;
                });
            };

            $scope.getMethods();
            $scope.update = function (json, method) {
                $scope.methodname = {"methodName": method.name, "parameters": json, multiaction: $scope.multiaction};
                MethodNameServ.update($scope.methodname).success(function (data) {
                    $scope.response = data;
                    $scope.response.erroresTbl = [].concat(data.errores);
                    private.calcularPorcentajes();
                    $scope.success = true;
                    $scope.submit = false;
                });
            };
            private.calcularPorcentajes = function () {

                var total = parseInt($scope.response.registrosImportados) + parseInt($scope.response.errores.length);

                if (total > 0) {
                    $scope.response.porcentajeOk = (parseInt($scope.response.registrosImportados) * 100) / total;
                    $scope.response.porcentajeError = (parseInt($scope.response.errores.length) * 100) / total;
                } else {
                    $scope.response.porcentajeOk = 0;
                    $scope.response.porcentajeError = 0;
                }


            };

        }]);


}());
