/**
 * https://docs.google.com/document/d/1V60_kmi8eWA1wb42HyMexFSoqtGKhznlRmKc1__8ZGA/edit#
 * Visualizador del contenido, segun tipo de contenidos es modo de visualizacion
 * Puede ser imagen, video,pdf,...
 */
(function () {
    var app = angular.module('app');
    app.directive('contenidoDir', ['ContenidoServ', '$sce', function (ContenidoServ, $sce) {
            return{
                restrict: 'E',
                templateUrl: 'pages/base/contenido/contenidoDir/contenidoDir.html',
                scope: {
                    contenido: "=?", // Es el objeto Contenido/File a mostrar, con todos los datos del contenido. Ver jconf.contenido.attrs. object
                    contenidoId: "=?", // Es el id del contenido a mostrar. integer
                },
                controller: function ($scope, $element, $attrs) {
                    var private = {};
                    $scope.loading = true;
                    $scope.heigthScreen = window.innerHeight - 150;
                    $scope.heigthMediaScreen = 'auto';
                    $scope.isMobile = $.isMobile

                    $scope.$watch('contenidoId', function (id) {

                        if ($.un(id) || id == "") {
                            return;
                        }

                        $scope.contenidoShow = undefined;

                        ContenidoServ.load({
                            id: id,
                            jconf: {
                                attrs: jconf.contenido.attrs
                            }
                        }).success(function (data) {
                            if (JSON.stringify(data) == '{}') {
                                return;
                            }
                            
                            $scope.contenido = undefined;
                            $scope.contenidoShow = undefined;

                            if ($scope.isPDF(data) || $scope.isText(data) || $scope.isImg(data)) {
                                ContenidoServ.getBlobURL(services.contenido.file + '?id=' + id)
                                        .then(function (url) {
                                            data.urlDownload = data.url;
                                            data.url = $sce.trustAsResourceUrl(url);
                                            $scope.contenido = data;
                                            $scope.contenidoShow = data;
                                            $scope.loading = false;
                                            $scope.$apply();
                                        });
                            } else {
                                data.url = services.contenido.file + '?id=' + id;
                                data.urlDownload = data.url;
                                data.url = $sce.trustAsResourceUrl(data.url);
                                $scope.contenido = data;
                                $scope.contenidoShow = data;
                                $scope.loading = false;
                            }

                        });

                    });

                    $scope.$watch('contenido', function (contenido) {

                        if (Object.prototype.toString.call(contenido) === '[object File]') {
                            var reader = new FileReader();

                            reader.onloadstart = function (e) {
                                $scope.loading = true;
                                $scope.$apply();
                            };

                            reader.onloadend = function (e) {
                                $scope.loading = false;
                                $scope.$apply();

                            };

                            reader.onload = function (e) {
                                // handle onload
                                var file = new File([contenido], contenido.name, {type: contenido.type});

                                file.url = $sce.trustAsResourceUrl(e.target.result);

                                $scope.contenidoShow = file;



                            };

                            reader.readAsDataURL(contenido);
                        } else if (!$.un(contenido) && $.un(contenido.url)) {
                            ContenidoServ.getBlobURL(services.contenido.file + '?id=' + contenido.id)
                                    .then(function (url) {
//                                        data.url = $sce.trustAsResourceUrl(url);
                                        $scope.contenidoShow.url = $sce.trustAsResourceUrl(url);

                                        $scope.loading = false;
                                    });

                        }

                    });

                    $scope.download = function () {


                        var url = $scope.contenido.url;
                        var name = $scope.contenido.nombre + "." + $scope.contenido.extension;
                        if (window.localStorage.getItem('cordova')) {
                            var msg = {
                                styling: 'fontawesome',
                                title: "Atención!",
                                addclass: "stack-bar-top",
                                text: " El proceso de descarga comenzo, aguarde hasta que finalice.",
                                cornerclass: "",
                                width: "30%",
                                type: "info",
                                delay: 15000,
                                mouse_reset: false
                            };
                            new PNotify(msg);
                            var redirect = 'http://guacurari.misiones.gob.ar/plataforma/download.html#' + url + "&" + name + "$" + window.location;
                            window.location = redirect;
                        } else {
                            var a = document.createElement('A');
                            a.href = url;
                            a.download = name;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        }
                    };

                    $scope.isImg = function (data) {
                        return ContenidoServ.isImg(data || $scope.contenido);
                    };

                    $scope.isAudio = function (data) {
                        return ContenidoServ.isAudio(data || $scope.contenido);
                    };

                    $scope.isVideo = function (data) {
                        return ContenidoServ.isVideo(data || $scope.contenido);
                    };

                    $scope.isPDF = function (data) {
                        return ContenidoServ.isPDF(data || $scope.contenido);
                    };

                    $scope.isPPT = function (data) {
                        return ContenidoServ.isPPT(data || $scope.contenido);
                    };

                    $scope.isWord = function (data) {
                        return ContenidoServ.isWord(data || $scope.contenido);
                    };

                    $scope.isExcel = function (data) {
                        return ContenidoServ.isExcel(data || $scope.contenido);
                    };

                    $scope.isZip = function (data) {
                        return ContenidoServ.isZip(data || $scope.contenido);
                    };

                    $scope.isText = function (data) {
                        return ContenidoServ.isText(data || $scope.contenido);
                    };

                    $scope.other = function (data) {
                        return ContenidoServ.other(data || $scope.contenido);
                    };
                }
            };
        }]);
}());
