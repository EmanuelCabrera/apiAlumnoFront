//
//CICHA Created: 2016/08/24 
//
(function () {
    var app = angular.module('app');
    app.controller('ContenidoModalInfoCont', ["$scope", 'ContenidoServ', '$uibModalInstance', 'id', '$state',
        function ($scope, ContenidoServ, $uibModalInstance, id, $state) {
            var private = {};

            $scope.contenido = {};

            $scope.close = function () {
                $uibModalInstance.close();
            };


            private.init = function () {
                ContenidoServ.load({
                    id: id,
                    jconf: JSON.stringify(jconf.contenido.info)
                }).success(function (data) {
                    $scope.contenido = data;
                });
            };
            
            private.init();
            
        }]);
}());