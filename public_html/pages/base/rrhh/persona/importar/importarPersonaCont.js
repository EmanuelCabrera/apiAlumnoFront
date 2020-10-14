//
//Miguel Created: 2016/03/30 
//
(function () {
    var app = angular.module('app');

    app.controller('PersonaImportarCont', ["$scope", 'PersonaServ', function ($scope, PersonaServ) {

            var private = {};

            $scope.uploadProgress = 0;

            $scope.submit = false;
            $scope.success = false;
            $scope.response = {};
            $scope.file = [];

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

            $scope.importar = function () {
                $scope.submit = true;
                $scope.uploadProgress = 0;
                $scope.success = false;


                var file;

                if ($scope.file.length > 0) {
                    file = $scope.file[0];
                } else {
                    //ERROR
                    $scope.submit = true;
                    return;
                }

                PersonaServ.importar(file)
                        .progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            $scope.uploadProgress = progressPercentage;

                        })
                        .then(function (data) {

                            $scope.response = data.data;
                            $scope.response.erroresTbl = [].concat(data.data.errores);
                            private.calcularPorcentajes();
                            $scope.success = true;
                            $scope.submit = false;
                        })
                        .catch(function () {
                            $scope.uploadProgress = 0;
                            $scope.submit = false;
                            $scope.success = false;
                        });
            };

        }]);
}());