//
//Miguel Created: 2016/03/30 
//
(function () {
    var app = angular.module('app');

    app.controller('ContenidoTestCont', ["$scope", "$rootScope", 'ContenidoTestServ', '$compile', "$window", function ($scope, $rootScope, ContenidoTestServ, $compile, $window) {
            var private = {};
            $scope.contenidos = [];
            $scope.contenidosTbl = [];
            $scope.contenido = {};

            $scope.onSelectContenido = function (id) {
                ContenidoTestServ.load({
                    "id": id,
                    "jconf": JSON.stringify({
                        attrs: ['id', 'nombre'],
                        contenidos: {
                            attrs: ['id'],
                            contenidos: {
                                attrs: jconf.contenido.attrs
                            }

                        },
                        portada: {
                            attrs: jconf.contenido.attrs
                        }
                    })
                }).success(function (data) {
                    $scope.contenido = data;
                });
            };

            $scope.onAction = function (response, action) {
                response.success(function () {
                    private.init();
                });
            };


            /**
             * FILE DIR
             */

            //http://www.htmlescape.net/stringescape_tool.html
            $scope.fileDirHTml = "\x3Cfile-dir contenido=\"contenido.portada\" config=\"configFileDir\" allow-edit=\"true\" \x3E\n\x3C\x2Ffile-dir\x3E";

            $scope.fileMultipleDirHtml = "\x3Cfile-multiple-dir cant-max=\"2\" contenidos=\"contenido.contenidos.contenidos\" config=\"configFileMultipleDir\" allow-edit=\"true\"\x3E\n \x3C\x2FconfigFileMultipleDir\x3E";
            $scope.fileMultipleDirJs = "$scope.configFileMultipleDir = {\n show: {\n name: true,\n type: true,\n size: false\n },\n btn: {\n info: true,\n download: true,\n copy: true,\n modal: true,\n order: false\n },\n action: {\n \x2F\x2FonRemove: false,\n onUpdate: function () {\n alert(\"hola\");\n },\n onRestore: function () {\n alert(\"hola\");\n },\n onDisable: function () {\n alert(\"hola\");\n },\n onSelect: function () {\n alert(\"hola\");\n },\n onLeft: function () {\n alert(\"hola\");\n },\n onRight: function () {\n alert(\"hola\");\n }\n }\n };";

            $scope.contenidoThumbnailDirHtml = "\x3Cfile-multiple-dir cant-max=\"2\" contenidos=\"contenido.contenidos.contenidos\" config=\"config\" allow-edit=\"true\"\x3E\n \x3C\x2FconfigFileMultipleDir\x3E";
            $scope.contenidoThumbnailDirJs = "\x3Cfile-multiple-dir cant-max=\"2\" contenidos=\"contenido.contenidos.contenidos\" config=\"config\" allow-edit=\"true\"\x3E\n \x3C\x2FconfigFileMultipleDir\x3E";


            $scope.create = function () {
                $scope.saving = true;
                ContenidoTestServ.createContent($scope.contenido)
                        .success(function (data) {
                            $window.history.back();
                        }).error(function () {
                    $scope.saving = false;
                });


            };

            $scope.update = function () {
                $scope.saving = true;

                ContenidoTestServ.updateContent($scope.contenido)
                        .success(function (data) {
                            $window.history.back();
                        }).error(function () {
                    $scope.saving = false;
                });
            };

            private.init = function () {
                ContenidoTestServ.load({
                    "jconf": JSON.stringify({
                        attrs: ['id', 'nombre']
                    })
                }).success(function (data) {
                    $scope.contenidos = data;
                    $scope.contenidosTbl = [].concat(data);
                });
            };
            private.init();
        }]);
}());