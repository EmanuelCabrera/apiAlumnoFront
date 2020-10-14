(function () {
    var setting = {};
    {
//        code: Codigo del sistema HASH
//        backEnd: URL donde se envian las exceptions
//        data: Default data a enviar con cada exeption
//        user: String del nombre de usuario logueado en el sistema a enviar
//        beforeSend: funcion a ejecutar antes de enviar los datos
//                    @data: parametro con los datos a enviar, se los pueden modificar en la funcion
//                    return: false = Detiene envio 
//                    return: true/undefined = continua la ejecucion normalmente
    }


    angular.module('JSErrorLog', [])
            .config(['$provide', function ($provide) {
                    $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
                            return function (exception, cause) {
                                //Espera 1 seg antes de enviar la exception
                                //puesto que si esta se lanza antes de que se actualize la URL del navegador
                                //Se estara enviando la informacion al server como si la exception se ubiera 
                                //lanzado desde la URL anterior a la URL donde en realidad se realizo la misma
                                setTimeout(function () {
                                    $delegate(exception, cause);
                                    exception.cause = cause;
                                    var data = m_genDataError(exception);
                                    m_sendError(data);
                                }, 60);
                            };
                        }]);
                }])
            .service('$JSErrorLog', function () {
                return {
                    config: function (data) {
                        if (typeof data.code !== "undefined") {
                            setting.code = data.code;
                        }
                        if (typeof data.backEnd !== "undefined") {
                            setting.backEnd = data.backEnd;
                        }
                        if (typeof data.data !== "undefined") {
                            setting.data = data.data;
                        }
                        if (typeof data.user !== "undefined") {
                            setting.user = data.user;
                        }
                        if (typeof data.beforeSend !== "undefined") {
                            setting.beforeSend = data.beforeSend;
                        }
                    }
                };
            });


    var m_genDataError = function (exception) {

        var data = {
            code: setting.code,
            type: 'angular',
            url: window.location.href,
            localTime: new Date(),
            userAgent: navigator.userAgent
        };
        if (typeof setting.user !== "undefined") {
            data.user = setting.user.toString();
        }
        if (typeof setting.data !== "undefined") {
            data.data = JSON.stringify(setting.data);
        }
        if (exception) {
            if (exception.message) {
                data.message = exception.message;
            } else {
                data.message = "";
            }
            if (exception.name) {
                data.name = exception.name;
            }
            if (exception.stack) {
                data.stack = exception.stack;
            } else {
                data.stack = "";
            }
            if (exception.cause) {
                data.cause = exception.cause;
            }
        }
        return data;
    };
    var m_sendError = function (data) {
        if (typeof setting.beforeSend !== "undefined") {
            var continuar = setting.beforeSend(data);
            if (typeof continuar !== "undefined" && !continuar) {
                return;
            }
        }


        $.ajax({
            type: "POST",
            url: setting.backEnd,
            data: JSON.stringify(data),
            success: function (data) {
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
        });
        return data;
    };


    window.onerror = function (message, url, line, col, error) {
        var data = m_genDataError(error);
        m_sendError(data);
    };
}());