//https://docs.google.com/document/d/1V60_kmi8eWA1wb42HyMexFSoqtGKhznlRmKc1__8ZGA/edit
//Muestra la imagen thumbnail del contenido. 
//utiliza background-url para graficar la imagen
(function () {
    var app = angular.module('app');
    app.directive('contenidoImgDir', ['ContenidoServ', '$sce', function (ContenidoServ, $sce) {
            return{
                restrict: 'A',
                scope: {
                    contenidoImg: "=?", // Es el objeto Contenido/File a mostrar, con todos los datos del contenido. Ver jconf.contenido.attrs. object
                    contenidoImgId: "=?", // Es el id del contenido a mostrar. integer
                    contenidoImgAlt: '=?' // URL de una imagen alternativa. string
                },
                controller: function ($scope, $element, $attrs) {
//                    if (!$.un($attrs["contenidoImgId"])) {
                    $scope.$watch('contenidoImgId', function (id) {
                        if ($.empty(id)) {
                            //si no se recibe un ID se coloca una imagen por defecto de imagen no disponible
                            backgroundNoImg();
                            return;
                        }
                        if (!$.un($scope.contenidoImgAlt)) {
                            //Si en el front se redefine el thumbnail alternativo al que viene por defecto en el backend
                            //se debe hacer una llamada al backend para verificar si el contenido posee o no thumbnail propio
                            backroundFromBackEnd(id);
                        } else {
                            //Si no se redefine la img-alt, no es necesario llamar al back-end a consultar si existe thumbnail propio
                            //simplemente se pasa la url del contenidothumbail y el backend muestra el thumbnail propio o sino muestra
                            //uno alternativo generado por el back-end
                            $element.css({
                                'background-image': 'url(' + services.contenido.thumbnail + "?id=" + id + ')',
                                'background-size': 'contain',
                                'background-position': 'top',
                                'background-repeat': 'no-repeat'
                            });
                        }
                    });
//                    }

//                    if (!$.un($attrs["contenidoImg"])) {
                    $scope.$watch('contenidoImg', function (data) {
                        if ($.un(data)) {
                            backgroundNoImg();
                            return;
                        }
                        if (!$.un($scope.contenidoImgAlt)) {
                            if ($.un(data.existthumbnail)) {
                                backroundFromBackEnd(data.id);
                            } else {
                                //Si no se redefine la img-alt, no es necesario llamar al back-end a consultar si existe thumbnail propio
                                //simplemente se pasa la url del contenidothumbail y el backend muestra el thumbnail propio o sino muestra
                                //uno alternativo generado por el back-end
                                $element.css({
                                    'background-image': 'url(' + services.contenido.thumbnail + "?id=" + data.id + ')',
                                    'background-size': 'contain',
                                    'background-position': 'top',
                                    'background-repeat': 'no-repeat'
                                });
                            }

                            return;

                        } else {
                            //Si no se redefine la img-alt, no es necesario llamar al back-end a consultar si existe thumbnail propio
                            //simplemente se pasa la url del contenidothumbail y el backend muestra el thumbnail propio o sino muestra
                            //uno alternativo generado por el back-end


                            if (data.id) {
                                $element.css({
                                    'background-image': 'url(' + services.contenido.thumbnail + "?id=" + data.id + ')',
                                    'background-size': 'contain',
                                    'background-position': 'top',
                                    'background-repeat': 'no-repeat'
                                });
                            }

                            if (Object.prototype.toString.call(data) === '[object File]') {

                                var type = data.type;
                                var url = 'pages/base/contenido/img/';

                                if (ContenidoServ.isImg(type)) {
                                    url = data.url;
                                }

                                if (ContenidoServ.isAudio(type)) {
                                    url = url + 'audio.png';
                                }

                                if (ContenidoServ.isVideo(type)) {
                                    url = url + 'video.png';
                                }

                                if (ContenidoServ.isText(type)) {
                                    url = url + 'texto.png';
                                }

                                if (ContenidoServ.isPDF(type)) {
                                    url = url + 'pdf.png';
                                }

                                if (ContenidoServ.isWord(type)) {
                                    url = url + 'doc.png';
                                }

                                if (ContenidoServ.isPPT(type)) {
                                    url = url + 'ppt.png';
                                }

                                if (ContenidoServ.isExcel(type)) {
                                    url = url + 'xls.png';
                                }

                                if (ContenidoServ.isZip(type)) {
                                    url = url + 'zip.png';
                                }

                                if (ContenidoServ.other(type)) {
                                    url = url + 'otro.png';
                                }

                                $element.css({
                                    'background-image': 'url("' + url + '")',
                                    'background-size': 'contain',
                                    'background-position': 'top',
                                    'background-repeat': 'no-repeat'
                                });
                            }

                            return;
                        }
                        var url = data.thumbnail ? services.contenido.thumbnail + "?id=" + data.id : $scope.contenidoImgAlt;
                        $element.css({
                            'background-image': 'url(' + url + ')',
                            'background-size': 'contain',
                            'background-position': 'top',
                            'background-repeat': 'no-repeat'
                        });
                    });
//                    }

                    backroundFromBackEnd = function (id) {
                        ContenidoServ.load({
                            id: id,
                            jconf: {
                                attrs: ["existthumbnail"]
                            }
                        }).success(function (data) {

                            if (JSON.stringify(data) == '{}') {
                                //si no se reciben datos del backend se muestra thumbnail alternativo
                                var url = $scope.contenidoImgAlt;
                            } else {
                                var url = data.existthumbnail ? services.contenido.thumbnail + "?id=" + id : $scope.contenidoImgAlt;
                            }
                            $element.css({
                                'background-image': 'url(' + url + ')',
                                'background-size': 'contain',
                                'background-position': 'top',
                                'background-repeat': 'no-repeat'
                            });
                        });
                    };

                    backgroundNoImg = function () {
                        if (!$.un($scope.contenidoImgAlt)) {
                            $element.css({
                                'background-image': $scope.contenidoImgAlt,
                            });
                        } else {

                            $element.css({
                                'background-image': 'url(pages/base/contenido/img/nodisponible.png)',
                                'background-size': 'contain',
                                'background-position': 'top',
                                'background-repeat': 'no-repeat'
                            });
                        }
                    };
                }
            };
        }]);
}());
