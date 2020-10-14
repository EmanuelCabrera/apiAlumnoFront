
(function () {
    var app = angular.module('app');

    app.controller('ContenidoModalCont', ["$scope", '$uibModalInstance', 'id', 'contenido', 'viewData', function ($scope, $uibModalInstance, id, contenido, viewData) {
            var private = {};

            $scope.fullScreen = false;

            $scope.close = function () {
                $uibModalInstance.close();
            };

            private.init = function () {
                
                $scope.viewData = viewData;
                $scope.id = id;

                if (!$.un(viewData) && !$.un(viewData.files) && viewData.files.length) {
                    $scope.contenido = viewData.files[viewData.index];
                } else {
                    $scope.contenido = contenido;
                }
            };

            $scope.move = function (op) {
                
                if (op == '>') {
                    $scope.viewData.index++;
                } else {
                    $scope.viewData.index--;
                }

                $scope.contenido = $scope.viewData.files[$scope.viewData.index];

            };

            private.init();
        }]);
}());