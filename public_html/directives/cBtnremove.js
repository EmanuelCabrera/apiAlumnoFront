/**
 * CICHA Created:  17/08/2017
 */
(function () {
    var app = angular.module('app');

    app.directive('cBtnremove', ['$injector', function ($injector) {
            return{
                restrict: 'A',
                replace: false,
                scope: {
                    cBtnremove: '=', //pasar el objeto a eliminar, debe tener "id", "deletedAt"
                    cService: "@", //pasar el servicio que maneja el objeto a eliminar
                    cName: "@", //pasar el servicio que maneja el objeto a eliminar
                    cCallback: "=?", //pasar el metodo a llamar una ves concretada la accion,
                    //cCallback retorna: (ServiceResponse,Action), donde action puede valer "enable","disable","remove"
                    cAction: "@"
                },
                link: function ($scope, elm, attrs) {
                    //id objeto
                    //tipo de eliminacion: enable/disable/remove
                    //metodos para cada tipo
                    var private = {};
                    elm.on('click', function () {
                        if (!$.un($scope.cAction)) {
                            //Si especifico una accion especifica a realizar
                            switch ($scope.cAction) {
                                case "enable":
                                    private.enable();
                                    break;
                                case "remove":
                                    private.remove();
                                    break;
                                case "disable":
                                    private.disable();
                                    break;
                            }

                        } else {
                            //Si no especifico que accion realizar,
                            //en base al deletedAt se ve que modal mostrar
                            if (!$.un($scope.cBtnremove.deletedAt)) {
                                private.enable();
                            } else {
                                private.disableremove();
                            }
                        }
                    });


                    private.remove = function () {
                        bootbox.dialog({
                            title: "Eliminado Permanente",
                            message: "Esta por eliminar permanetemente: <b>" + $scope.cName +
                                    "</b><br>Si lo hace no podra recuperar el elemento",
                            buttons: {
                                cancel: {
                                    label: 'Cancelar',
                                    className: 'btn-default'
                                },
                                confirm: {
                                    label: '<i class="fa fa-remove"></i> Eliminado Permanente',
                                    className: 'btn-danger',
                                    callback: function (result) {
                                        private.action("remove");
                                    }
                                }
                            }
                        });
                    };

                    private.disableremove = function () {
                        bootbox.dialog({
                            title: "Eliminado Permanente / Dar de baja",
                            message: $scope.cName + "<br>Si elimina permanentemente no podra recuperar el elemento, si da de baja, podra restaurarlo si lo desea, se recomienda <b>Dar de Baja</b>",
                            buttons: {
                                cancel: {
                                    label: 'Cancelar',
                                    className: 'btn-default'
                                },
                                remove: {
                                    label: '<i class="fa fa-remove"></i>  Eliminado Permanente',
                                    className: 'btn-danger',
                                    callback: function (result) {
                                        private.action("remove");
                                    }
                                },
                                disable: {
                                    label: '<i class="fa fa-trash"></i> Dar de Baja',
                                    className: 'btn-primary',
                                    callback: function (result) {
                                        private.action("disable");
                                    }
                                }
                            }
                        });
                    };

                    private.enable = function () {
                        bootbox.confirm({
                            title: "Restaurar",
                            message: "Esta seguro que desea restaurar: " + $scope.cName,
                            buttons: {
                                confirm: {
                                    label: '<i class="fa fa-check-circle"></i> Restaurar',
                                    className: 'btn-success'
                                },
                                cancel: {
                                    label: 'Cancelar',
                                    className: 'btn-defalut'
                                }
                            },
                            callback: function (result) {
                                if (result) {
                                    var service = $injector.get($scope.cService);
                                    var promise = service.enable($scope.cBtnremove.id);
                                    if (!$.un($scope.cCallback)) {
                                        $scope.cCallback(promise, "enable");
                                    }
                                }
                            }
                        });
                    };

                    private.disable = function () {
                        bootbox.dialog({
                            title: "Dar de baja: " + $scope.cName,
                            message: "Esta seguro de dar de baja: <b>" + $scope.cName + "</b><br>Si lo hace no se vera más en el sistema.",
                            buttons: {
                                baja: {
                                    label: '<i class="fa fa-trash"></i> Dar de Baja',
                                    className: 'btn-primary',
                                    callback: function (result) {
                                        //si no cerro el modal
                                        private.action("disable");
                                    }
                                },
                                cancel: {
                                    label: ' Cancelar',
                                    className: 'btn-default'
                                }
                            }
                        });
                    };

                    private.action = function (actionType) {
                        var service = $injector.get($scope.cService);
                        switch (actionType) {
                            case "enable":
                                var promise = service.enable($scope.cBtnremove.id);
                                break;
                            case "disable":
                                var promise = service.disable($scope.cBtnremove.id);
                                break;
                            case "remove":
                                var promise = service.remove({id: $scope.cBtnremove.id});
                                break;

                        }
                        if (!$.un($scope.cCallback)) {
                            $scope.cCallback(promise, actionType);
                        }
                    };
                }
            };
        }]);


    app.directive('cBtnremoveview', ['$compile', function ($compile) {
            return{
                restrict: 'E',
                replace: true,
                scope: {
                    cObj: '=', //pasar el objeto a eliminar, debe tener "id", "deletedAt"
                    cService: "@", //pasar el servicio que maneja el objeto a eliminar
                    cName: "@", //pasar el servicio que maneja el objeto a eliminar
                    cCallback: "=?", //pasar el metodo a llamar una ves concretada la accion,
                    //cCallback retorna: (ServiceResponse,Action), donde action puede valer "enable","disable","remove"
                },
                template: function () {
                    return "<div class=\"btn-group btn-group-sm\"></div>";
                },
                link: function ($scope, elm, attrs) {

                    for (let k in attrs.$attr) {
                        let attr = attrs.$attr[k];
                        if (!attr.startsWith('c-')) {
                            elm[k] = attrs[k];
                        }
                    }

                    var button1 = "<button type=\"button\" class=\"btn btn-default\"" +
                            "ng-show=\"cObj.deletedAt\"" +
                            "ng-click=\"$event.stopPropagation()\"" +
                            "uib-tooltip=\"Eliminar Permanentemente\" tooltip-append-to-body=\"true\"" +
                            "c-btnremove=\"cObj\"" +
                            "c-service=\"{{cService}}\"" +
                            "c-name=\"{{cName}}\"" +
                            "c-callback=\"cCallback\"" +
                            "c-action=\"remove\">" +
                            "<i  class=\"fa fa-remove red\"></i>" +
                            "</button>";


                    var button2 = "<button type=\"button\" class=\"btn btn-default\"" +
                            "ng-show=\"!cObj.deletedAt\"" +
                            "uib-tooltip=\"Dar de baja\" tooltip-append-to-body=\"true\"" +
                            "ng-click=\"$event.stopPropagation()\"" +
                            "c-btnremove=\"cObj\"" +
                            "c-service=\"{{cService}}\"" +
                            "c-name=\"{{cName}}\"";
                    if (!$.un($scope.cCallback)) {
                        button2 += "c-callback=\"cCallback\"";
                    }
                    button2 += "><i class=\"fa fa-trash-o blue\"></i></button>";

                    var button3 = "<button type=\"button\" class=\"btn btn-default\"" +
                            "ng-show=\"cObj.deletedAt\"" +
                            "uib-tooltip=\"Restaurar\" tooltip-append-to-body=\"true\"" +
                            "ng-click=\"$event.stopPropagation()\"" +
                            "c-btnremove=\"cObj\"" +
                            "c-service=\"{{cService}}\"" +
                            "c-name=\"{{cName}}\"";
                    if (!$.un($scope.cCallback)) {
                        button3 += "c-callback=\"cCallback\"";
                    }
                    button3 += "><i class=\"fa fa-check-circle blue\"></i></button>";


//                    var button2 = "<button type=\"button\" class=\"btn btn-default\"" +
//                            "ng-click=\"$event.stopPropagation()\"" +
//                            "c-btnremove=\"cObj\"" +
//                            "c-service=\"" + $scope.cService + "\"" +
//                            "c-name=\"" + $scope.cName + "\"";
//                    if (!$.un($scope.cCallback)) {
//                        button2 += "c-callback=\"cCallback\"";
//                    }
//                    button2 += "><i  class=\"fa fa-trash-o blue\" ng-show=\"!cObj.deletedAt\"></i> " +
//                            "<i  class=\"fa fa-check-circle blue\" ng-show=\"cObj.deletedAt\" uib-tooltip=\"Restaurar\" tooltip-append-to-body=\"true\"></i> " +
//                            "</button>";

                    var button1Draw = $compile(button1)($scope);
                    var button2Draw = $compile(button2)($scope);
                    var button3Draw = $compile(button3)($scope);
                    $(elm).append(button1Draw);
                    $(elm).append(button2Draw);
                    $(elm).append(button3Draw);

                }
            };
        }]);

}());