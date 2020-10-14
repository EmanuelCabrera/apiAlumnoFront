/**
 * https://docs.google.com/document/d/1V60_kmi8eWA1wb42HyMexFSoqtGKhznlRmKc1__8ZGA/edit#bookmark=id.pocnevmxrcyb
 */
(function () {
    var app = angular.module('app');
    app.directive("fileDir", ['$sce', function ($sce) {
            return {
                templateUrl: 'pages/base/contenido/fileDir/fileDir.html',
                scope: {
                    contenido: "=?", //Contenido o archivo que se subirá al server o que se mostrará, en caso de que exista
                    config: "=?",

                    /**
                     * 
                     * config
                     * 
                     * Es un JSON con datos de la configuracion de la directiva
                     * {
                     *      show: {
                     *          name : boolean (Defecto:true) Muestra o oculta el nombre del contenido
                     *          type : boolean (Defecto:true) Muestra o oculta el tipo del contenido
                     *          size : boolean (Defecto:false) Muestra o oculta el tamaño del contenido
                     *      },
                     *      btn: {
                     *          info : boolean (Defecto:true) Muestra o oculta el boton de mas info del contenido
                     *          download : boolean (Defecto:true) Muestra o oculta el boton de descarga del contenido
                     *          copy : boolean (Defecto:true) Muestra o oculta el boton de copiar del contenido
                     *          modal : boolean (Defecto:true) Muestra o oculta el boton para abrir el modal
                     *      },
                     *      action: {
                     *          onRemove : method Funcion que se ejecuta cuando se quiere hacer un eliminado
                     *      },
                     * }
                     * 
                     */
                    allowEdit: "=?", // Permite o no editar un archivo (Defecto:false)
                    textButton: "@?", // Texto que se muestra en el boton. Por defecto = Elegir archivo
                    text: "@?", // Texto que se muestra cuando se está editando/creando. Por defecto = Archivo
                    accept: "@?", // Setea el attr accept de los input file. Por defecto = "*/*"
                    layoutContenido: "@?", //Disposicion o tamaño de visualizacion del contenido, determinado por los "col". Por defecto = col-md-4 col-sm-6 col-lg-3
                },

                controller: function ($scope, $element, $attrs) {
//                    $scope.config = {
//                        show: {
//                            name: true,
//                            type: true,
//                            size: false
//                        },
//                        btn: {
//                            info: true,
//                            download: true,
//                            copy: true,
//                            modal: true,
//                            order: false
//                        },
//                        action: {
//                            onRemove: function () {
//                                $scope.contenido = undefined;
//                            }
//                        }
//                    };

                    $scope.inputFile;
                    $scope.textButton = !$scope.textButton && "Elegir archivo";
                    $scope.accept = !$scope.accept && "*/*";
                    $scope.text = !$scope.text && "";
                    $scope.layoutContenido = "col-md-4 col-sm-6 col-lg-3";
                    
                     $scope.contenidoConfig = {
                        show: {
                            name: true,
                            type: true,
                            size: false
                        },
                        btn: {
                            info: true,
                            download: true,
                            copy: true,
                            modal: true
                        },
                        action: {
                        }
                    };

                    /**
                     * reasignando config -> config seteando valores por defecto para  fileDir
                     * para luego inyectar config a contenidoThumbnailDir.
                     */
                    $scope.$watch('config', function (config) {
                        var aux = $.extend({}, $scope.config);
                        aux.show = $.unCascade($scope.config, "show") ? {} : $scope.config.show;
                        aux.show.name = $.unCascade($scope.config, "show.name") ? true : $scope.config.show.name;
                        aux.show.type = $.unCascade($scope.config, "show.type") ? true : $scope.config.show.type;
                        aux.show.size = $.unCascade($scope.config, "show.size") ? false : $scope.config.show.size;

                        aux.btn = $.unCascade($scope.config, "btn") ? {} : $scope.config.btn;
                        aux.btn.info = $.unCascade($scope.config, "btn.info") ? true : $scope.config.btn.info;
                        aux.btn.download = $.unCascade($scope.config, "btn.download") ? true : $scope.config.btn.download;
                        aux.btn.copy = $.unCascade($scope.config, "btn.copy") ? true : $scope.config.btn.copy;
                        aux.btn.modal = $.unCascade($scope.config, "btn.modal") ? true : $scope.config.btn.modal;
                        aux.btn.order = false;

                        aux.action = $.unCascade($scope.config, "action") ? {} : $scope.config.action;
                        if ($.unCascade($scope.config, "action.onRemove")) {
                            aux.action.onRemove = function () {
                                $scope.contenido = undefined;
                            };
                        }
                        delete aux.action.onUpdate;
                        delete aux.action.onRestore;
                        delete aux.action.onDisable;
                        delete aux.action.onSelect;
                        delete aux.action.onLeft;
                        delete aux.action.onRigth;

                        console.log(aux)
                        $scope.contenidoConfig = aux;
                    }, true);

                    $scope.onFileChange = function () {
                        var reader = new FileReader();
                        reader.onloadstart = function (e) {
                            $scope.archivoLoading = true;
                            $scope.$apply();
                        };
                        reader.onloadend = function (e) {
                            $scope.archivoLoading = false;
                            $scope.$apply();

                        };
                        reader.onload = function (e) {
                            // handle onload
                            var tmppath = URL.createObjectURL($scope.inputFile[0]);
                            $scope.contenido = $scope.inputFile[0];
                            var url = tmppath;
                            $scope.contenido.url = url;
                        };

                        if ($scope.inputFile[0]) {
                            reader.readAsDataURL($scope.inputFile[0]);
                        }
                    };
                }
            };
        }]);
}());