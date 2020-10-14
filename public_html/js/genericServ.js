/* 
 * CICHA Update: 02/02/2015
 *      Header error code 555
 * CICHA Created: 16/12/2014
 */
(function () {
    var app = angular.module('app');

    app.service('genS', ['$rootScope', "$compile", function ($rootScope, $compile) {

            /**
             * CICHA Moved: 16/12/2014 
             * CICHA Created: 05/12/2014 
             *  genericResponse: metodo global que se encargara de mostrar distintos tipos de mensajes al usuario
             *  ya sean de exito o error.
             *
             */
            this.genericResponse = function (http, param) {
                return http.success(function (data, status, headers, config) {
                    if (!angular.isUndefined(data.sms)) {
                        $(".ui-pnotify>.alert-danger").remove();
                        $("#btn-pnotify").hide();
                        if ($.un(data.class)) {
                            $.m_sms(data);
                        } else {
                            var bodyText = "<div>" + data.sms + "<br>" +
                                    "<button onclick=\"$(this).parent().find('div').show(); $(this).parent().find('div').slimScroll({height: '200px'})\" class=\"btn btn-sm btn-default\">" +
                                    "<i class=\"fa fa-angle-double-right\"></i>" +
                                    "</button>" +
                                    "<div style=\"display: none\">" +
                                    data.class +
                                    "<button onclick=\"$(this).parent().hide()\" class=\"btn btn-sm btn-default\">" +
                                    "Ocultar" +
                                    "</button>" +
                                    "</div>" +
                                    "</div>";
                            new PNotify({
                                styling: 'fontawesome',
                                title: "Correcto",
                                addclass: "stack_center",
                                text: bodyText,
                                type: "success",
                                delay: 5000
                            });
                        }
                    }
                }).error(function (data, status, headers, config) {
                    if (!$.un(param) && !$.un(param.error)) {
                        param.error(data, status, headers, config, param);
                    } else {
                        if (!$.un(data) && !$.un(data.error) && !$.un(data.error.code)) {
                            if (data.error.code === 1000) {
                                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                            } else if (data.error.code === 1001) {
                                $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);
                            } else if (data.error.code === 1002) {
                                $rootScope.$broadcast(AUTH_EVENTS.termYcond);
                            } else if (data.error.code === 1003 || data.error.code === 1004) {
                                $.m_sms({"error": data.error});
                            } else if (data.error.code === 1005) {
                                //La excepcion se va a a menejar segun el caso

                            } else {
                                $.m_sms({
                                    "error": {
                                        sms: "Codigo de error desconocido:" + data.error.code + "<br>sms:" + data.error.sms
                                    }});
                            }
                        } else {
                            if (status === 0 || status === -1) {
                                $.m_sms({
                                    "error": {
                                        sms: "No se pudo establecer la conexión con el servidor"
                                    }
                                });
                            } else if (status === 555 || status === 558) {//Error controlado o ERROR_HEADER_CODE_UNKNOW
                                $.m_sms({"error": data.error});
                            } else if (status === 556) {
                                //si es un error del tipo validacion de formulario
                                var sms = "";
                                for (var i = 0; i < data.length; i++) {
                                    sms += data[i].sms + "<br>";
                                }
                                $.m_sms({"error": {"sms": sms}});
                            } else if (status === 557) {
                                $rootScope.$broadcast(ALERT_RESTORE_EVENT, data);
                            } else {
                                $.m_sms({
                                    "error": {
                                        sms: "Error código" + String.valueOf(status)
                                    }
                                });
                                console.log("data");
                                console.log(data);
                                console.log("status");
                                console.log(status);
                                console.log("headers");
                                console.log(headers);
                                console.log("config");
                                console.log(config);
                            }
                        }
                    }


                });
            };
        }]);
}());