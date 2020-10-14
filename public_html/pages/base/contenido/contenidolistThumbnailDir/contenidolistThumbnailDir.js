(function () {
    var app = angular.module('app');
    app.directive("contenidolistThumbnailDir", ['$sce', 'ContenidoServ', '$uibModal', function ($sce, ContenidoServ, $uibModal) {
            return {
                templateUrl: 'pages/base/contenido/contenidolistThumbnailDir/contenidolistThumbnailDir.html',
                scope: {
                    contenidolistlId: "=?", // Es el id del contenido a mostrar. integer
                    btn: "=?"

                },
                controller: function ($scope, $element, $attrs) {

                    $scope.onClickEvent = function () {

                        var resolve = {
                            contenido: null,
                            id: $scope.contenidolistThumbnailId
                        };


                        $uibModal.open({
                            animation: true,
                            size: 'lg',
                            templateUrl: 'pages/base/contenido/contenidoModal/contenidoModal.html',
                            controller: 'ContenidoModalCont',
                            controllerAs: '$scope',
                            resolve: resolve
                        });
                    };
                }

            };


        }]);
}());