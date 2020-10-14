//https://docs.google.com/document/d/1V60_kmi8eWA1wb42HyMexFSoqtGKhznlRmKc1__8ZGA/edit
(function () {
    var app = angular.module('app');
    app.directive("contenidoThumbnailDir", ['ContenidoServ', '$uibModal', function (ContenidoServ, $uibModal) {
            return {
                templateUrl: 'pages/base/contenido/contenidoThumbnailDir/contenidoThumbnailDir.html',
                scope: {
                    contenido: "=?", // Es el objeto Contenido/File a mostrar, con todos los datos del contenido. Ver jconf.contenido.attrs. object
                    contenidoId: "=?", // Es el id del contenido a mostrar. integer
                    contenidoSelected: "=?", //Establece si esta seleccionado o no. Boolean
                    first: "=?", // En caso que se está iterando y mostrando esta directiva, indicar si es el primero o no. true | false
                    last: "=?", // En caso que se está iterando y mostrando esta directiva, indicar si es el ultimo o no. true | false
                    config: "=?",
                    /**
                     * 
                     * contenidoConfig
                     * 
                     * Es un JSON con datos de la configuracion de la directiva
                     * {
                     *      show: {
                     *          name : boolean (Defecto:false) Muestra o oculta el nombre del contenido
                     *          type : boolean (Defecto:true) Muestra o oculta el tipo del contenido
                     *          size : boolean (Defecto:false) Muestra o oculta el tamaño del contenido
                     *          extension : boolean (Defecto:true) Muestra o oculta el tamaño del contenido
                     *      },
                     *      btn: {
                     *          order : boolean (Defecto:false) Muestra o oculta el boton de mas info del contenido
                     *          info : boolean (Defecto:true) Muestra o oculta el boton de mas info del contenido
                     *          download : boolean (Defecto:true) Muestra o oculta el boton de descarga del contenido
                     *          copy : boolean (Defecto:true) Muestra o oculta el boton de copiar del contenido
                     *          modal : boolean (Defecto:true) Muestra o oculta el boton para abrir el modal
                     *      },
                     *      action: {
                     *          onRemove : method Funcion que se ejecuta cuando se quiere hacer un eliminado
                     *          onUpdate : method Funcion que se ejecuta cuando se quiere hacer una modificacion
                     *          onRestore : method Funcion que se ejecuta cuando se quiere restaurar un contenido eliminado(deletedAt != null)
                     *          onDisable : method funcion que se ejecuta cuando se quiere hacer la elimiacion logica (deletedAt == null)
                     *          onSelect : method Funcion que se ejecuta cuando se selecciona un contenido
                     *          onSelect : method Funcion que se ejecuta cuando se selecciona un contenido
                     *          onRight : method Funcion que se ejecuta cuando btn.order esta seteado y se quiere mover el elemento hacia la izquierda
                     *          onRight : method Funcion que se ejecuta cuando btn.order esta seteado y se quiere mover el elemento hacia la derecha
                     *      },
                     * }
                     * 
                     */
                },
                controller: function ($scope, $element, $attrs) {
                    var private = {};
                    $scope.style = {};
                    $scope.loading = false;
                    $scope.contenidoConfig = {
                        show: {
                            name: true,
                            type: true,
                            size: false,
                            extension:true
                        },
                        btn: {
                            info: true,
                            download: true,
                            copy: true,
                            modal: true,
                            order: false
                        },
                        action: {
                            onRemove: undefined,
                            onUpdate: undefined,
                            onRestore: undefined,
                            onDisable: undefined,
                            onSelect: undefined,
                            onLeft: undefined,
                            onRight: undefined
                        }
                    };

                    $scope.$watch('config', function (config) {
                        if ($.un(config)) {
                            return;
                        }

                        if (!$.un($scope.config.show)) {
                            $scope.contenidoConfig.show = {
                                name: $.un($scope.config.show.name) ? true : $scope.config.show.name,
                                type: $.un($scope.config.show.type) ? true : $scope.config.show.type,
                                size: $.un($scope.config.show.size) ? false : $scope.config.show.size,
                                extension: $.un($scope.config.show.extension) ? false : $scope.config.show.extension
                            };
                        }

                        if (!$.un($scope.config.btn)) {
                            $scope.contenidoConfig.btn = {
                                info: $.un($scope.config.btn.info) ? true : $scope.config.btn.info,
                                download: $.un($scope.config.btn.download) ? true : $scope.config.btn.download,
                                copy: $.un($scope.config.btn.copy) ? true : $scope.config.btn.copy,
                                modal: $.un($scope.config.btn.modal) ? true : $scope.config.btn.modal,
                                order: $.un($scope.config.btn.order) ? false : $scope.config.btn.order
                            };
                        }

                        if (!$.un($scope.config.action)) {
                            $scope.contenidoConfig.action = $scope.config.action;
                        }

                    }, true);


                    $scope.$watch('contenidoId', function (id) {
                        private.getContenido(id);
                    });



                    private.getContenido = function (id) {


                        if ($.un(id) || id == "") {
                            return;
                        }

                        $scope.loading = true;

                        ContenidoServ.load({
                            id: id,
                            jconf: {
                                attrs: jconf.contenido.attrs
                            }
                        }).success(function (data) {
                            if (JSON.stringify(data) == '{}') {
                                $scope.contenido = {
                                    exist: false
                                };
                            } else {
                                $scope.contenido = data;
                            }
                            $scope.loading = false;

                        }).error(function () {
                            $scope.loading = false;
                        });
                    };


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


                    $scope.getInfo = function () {

                        if ($scope.contenido.id) {
                            $uibModal.open({
                                animation: true,
                                templateUrl: 'pages/base/contenido/contenidoModalInfo/contenidoModalInfo.html',
                                controller: 'ContenidoModalInfoCont',
                                controllerAs: '$scope',
                                resolve: {
                                    id: $scope.contenido.id
                                }
                            });
                        }
                    };

                    $scope.getExtension = function () {

                        if (!$.un($scope.contenido.extension)) {
                            return $scope.contenido.extension;
                        }

                        if (!$.un($scope.contenido.name)) {
                            return $scope.contenido.name.split('.').pop();
                        }

                        return false;
                    };

                    $scope.openModal = function () {

                        if (!$scope.contenidoConfig.btn.modal) {
                            return;
                        }

                        var resolve;
                        if ($scope.contenido.id) {
                            resolve = {
                                contenido: null,
                                id: $scope.contenido.id
                            };
                        } else {
                            resolve = {
                                contenido: $scope.contenido,
                                id: null
                            };
                        }

                        resolve.viewData = {
                            allowDelete: $scope.allowOrder,
                            first: $scope.first,
                            last: $scope.last,
                            files: $scope.files,
                            index: $scope.indexFile
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




                    $scope.copy = function (id) {

                        var text_to_share = services.contenido.file + "?id=" + $scope.contenido.id;

                        // create temp element
                        var copyElement = document.createElement("span");
                        copyElement.appendChild(document.createTextNode(text_to_share));
                        copyElement.id = 'tempCopyToClipboard';
                        angular.element(document.body.append(copyElement));

                        // select the text
                        var range = document.createRange();
                        range.selectNode(copyElement);
                        window.getSelection().removeAllRanges();
                        window.getSelection().addRange(range);

                        // copy & cleanup
                        document.execCommand('copy');
                        window.getSelection().removeAllRanges();
                        copyElement.remove();

                        new PNotify({
                            styling: 'fontawesome',
                            title: 'Ok',
                            text: 'URL copiado correctamente!',
                            type: 'info',
                            delay: 2000
                        });
                    };

//                    $scope.move = function (op) {
//                        var new_index = $scope.indexFile;
//                        if (op == '+') {
//                            new_index++;
//                        } else {
//                            new_index--;
//                        }
//
//
//                        if (new_index >= $scope.files.length) {
//                            var k = new_index - $scope.files.length;
//                            while ((k--) + 1) {
//                                $scope.programa.files.push(undefined);
//                            }
//                        }
//
//                        $scope.files.splice(new_index, 0, $scope.files.splice($scope.indexFile, 1)[0]);
//
//
//                        return;
//                    };


                    $scope.onClickEvent = function () {
                        if (!$.un($scope.contenidoConfig.action.onSelect)) {
                            $scope.onSelect();
                        } else {
                            $scope.openModal();
                        }
                    };

                    //<editor-fold defaultstate="collapsed" desc="on actions methods">

                    $scope.onRemove = function () {
                        if (!$.un($scope.contenidoConfig.action.onRemove)) {
                            $scope.contenidoConfig.action.onRemove($scope.contenido);
                        }
                    };

                    $scope.onUpdate = function () {
                        if (!$.un($scope.action.onUpdate)) {
                            $scope.contenidoConfig.action.onUpdate($scope.contenido);
                        }
                    };

                    $scope.onRestore = function (id) {
                        if (!$.un($scope.action.onRestore)) {
                            $scope.contenidoConfig.action.onRestore($scope.contenido);
                        }
                    };

                    $scope.onDisable = function () {
                        if (!$.un($scope.onDisable)) {
                            $scope.contenidoConfig.action.onDisable($scope.contenido);
                        }
                    };

                    $scope.onSelect = function () {
                        if (!$.un($scope.contenidoConfig.action.onSelect)) {
                            $scope.contenidoConfig.action.onSelect($scope.contenido);
                        }
                    };

                    $scope.onLeft = function () {
                        if (!$.un($scope.contenidoConfig.action.onLeft)) {
                            $scope.contenidoConfig.action.onLeft($scope.contenido);
                        }
                    };

                    $scope.onRight = function () {
                        if (!$.un($scope.contenidoConfig.action.onRight)) {
                            $scope.contenidoConfigContenido.action.onRight($scope.contenido);
                        }
                    };
                    //</editor-fold>
                }

            };


        }]);
}());