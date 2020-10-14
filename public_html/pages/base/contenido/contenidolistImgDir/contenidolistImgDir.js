/**
 * https://docs.google.com/document/d/1V60_kmi8eWA1wb42HyMexFSoqtGKhznlRmKc1__8ZGA/edit#bookmark=id.i569q659pcgn
 *
 */
(function () {
    var app = angular.module('app');
    app.directive('contenidolistImgDir', ['$sce', function ($sce) {
            return{
                restrict: 'A',
                scope: {
                    contenidolistImgId: "=?", //ID del contenidolist
                    /**
                     * Version del contenidolist
                     * refresca la miñatura de cache en caso de que cambie la version.
                     */
                    contenidolistImgVersion: "=?",
                    contenidolistImgAlt: "=?" //URL de imagen alternativa, (opcional)
                },
                controller: function ($scope, $element, $attrs) {
                    if (!$.un($attrs["contenidolistImgId"])) {
                        $scope.$watch('contenidolistImgId', function (id) {
                            if ($.un(id) || id == "") {
                                //si no se recibe un ID se coloca una imagen por defecto de imagen no disponible
                                backgroundNoImg();
                                return;
                            } else {
                                //Si no se redefine la img-alt, no es necesario llamar al back-end a consultar si existe thumbnail propio
                                //simplemente se pasa la url del contenidothumbail y el backend muestra el thumbnail propio o sino muestra
                                //uno alternativo generado por el back-end

                                var url = services.contenido.thumbnailList + "?id=" + id;
                                
                                if ($.un($scope.contenidolistImgVersion)) {
                                    var date = new Date();
                                    url += '&version=' + date.getTime();
                                } else {
                                    var date = new Date();
                                    url += '&version=' + $scope.contenidolistImgVersion;
                                }
                                
                                $element.css({
                                    'background-image': 'url(' + url + ')'
                                });
                            }
                        });
                    }

                    backgroundNoImg = function () {
                        if (!$.un($scope.contenidoImgAlt)) {
                            $element.css({
                                'background-image': $scope.contenidoImgAlt,
                            });
                        } else {
                            $element.css({
                                'background-image': 'url(pages/base/contenido/img/nodisponible.png)',
                            });
                        }
                    };
                }
            };
        }]);
}());
