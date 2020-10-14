(function () {
    var app = angular.module('app');
    app.directive("fileMultipleDir", ['$sce', function ($sce) {
            return {
                templateUrl: 'pages/base/contenido/fileMultipleDir/fileMultipleDir.html',
                scope: {
                    contenidos: "=?", //cuando se trabaja con multiples archivos.
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
                    allowEdit: "=?", // Permite o no editar un archivo
                    cantMax: "@?", //maxima de archivos. Por defecto = false, (no restringe por cantidad). 
                    cantMin: "@?", //Cantidad minima de archivos, no se implementa porque no hay forma desde la directiva de controlar, se debe hacer desde formulario o backend
                    labelButton: "@?", // Texto que se muestra en el boton. Por defecto = Elegir archivo
                    text: "@?", // Texto que se muestra. Por defecto = Lista de archivos
                    accept: "@?", // Setea el attr accept de los input file. Por defecto = undefined

                },
                controller: function ($scope, $element, $attrs) {
                    /**
                     * Inicializacion
                     */
                    var private = {};
                    $scope.showDelete = true;
                    $scope.inputFiles = [];
                    $scope.allowEdit = true;
                    $scope.labelButton = !$scope.labelButton && "Agregar archivo";
                    $scope.text = !$scope.text && "";
                    $scope.layoutContenido = "col-md-4 col-sm-6 col-lg-3";
                    $scope.cantMax = !$scope.cantMax && false;

                    if (Object.prototype.toString.call($scope.contenidos) !== '[object Array]') {
                        $scope.contenidos = [];
                    }
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
                            modal: true,
                            order: false,
                        },
                        action: {
                            onRemove: function (contenido) {
                                var index = $scope.contenidos.indexOf(contenido);
                                $scope.contenidos.splice(index, 1);
                            }
                        }
                    };



                    $scope.$watch('contenidos', function (contenidos) {

                        if ($.un(contenidos)) {
                            $scope.contenidos = [];
                        }

                    });

                    $scope.$watch('config', function (config) {
                        if ($.un(config)) {
                            return;
                        }

                        if (!$.un($scope.config.show)) {
                            $scope.contenidoConfig.show = {
                                name: $.un($scope.config.show.name) ? true : $scope.config.show.name,
                                type: $.un($scope.config.show.type) ? true : $scope.config.show.type,
                                size: $.un($scope.config.show.size) ? false : $scope.config.show.size
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
                        if ($.un($scope.config.action)) {
                            $scope.contenidoConfig.action = {};
                            $scope.config.action = {}
                        }
                        if (!$.un()) {
                            $scope.contenidoConfig.action.onRemove = $scope.config.action.onRemove;
                        } else {

                            $scope.contenidoConfig.action.onRemove = function (contenido) {

                                for (let index in $scope.contenidos) {
                                    let item = $scope.contenidos[index];

                                    if (item.id == contenido.id) {
                                        $scope.contenidos.splice(index, 1);
                                        return;
                                    }

                                }
                            };

                        }

                        if ($scope.config.action.onRemove === false) {

                            $scope.showDelete = false;

                            return;
                        }

                    }, true);



                    private.checkMaxCant = function () {

                        if ($scope.cantMax === false) {
                            return true;
                        }

                        var cant = $scope.contenidos.length + $scope.inputFiles.length;

                        return cant <= $scope.cantMax;

                    };

                    $scope.onFileChange = function () {

                        if (!private.checkMaxCant()) {
                            new PNotify({styling: 'fontawesome',
                                title: 'Atención',
                                text: "No se puede agregar más de " + $scope.cantMax + " archivos.",
                                type: 'warning',
                                delay: 3000
                            });
                            return;
                        }


                        for (let i = 0; i < $scope.inputFiles.length; i++) {
                            var reader = new FileReader();

                            var file;

                            reader.readAsDataURL($scope.inputFiles[i]);

                            reader.onloadstart = function (e) {
                                $scope.$apply();
                            };

                            reader.onloadend = function (e) {
                                file.archivoLoading = false;
                                $scope.$apply();

                            };

                            reader.onload = function (e) {
                                // handle onload
                                file = new File([$scope.inputFiles[i]], $scope.inputFiles[i].name, {type: $scope.inputFiles[i].type});

                                $scope.contenidos.push(file);

                                file.url = $sce.trustAsResourceUrl(e.target.result);

                                var tmppath = URL.createObjectURL(file);

                                file.url = $sce.trustAsResourceUrl(tmppath);

                            };
                        }

                    };

                }

            }
            ;
        }]);
}());