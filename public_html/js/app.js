const  rootService = location.protocol === "https:" && parameters.rootHttpsService ? parameters.rootHttpsService : parameters.rootService;
const  isDebugMode = location.hostname === 'localhost' || document.domain == 'localhost';

services = typeof services == "undefined" ? {} : services;
services.sistem = {};
services.sistem.disable = rootService + "sistem/remove";

(function () {
    try {
        angular.module('templates');
    } catch (e) {
        angular.module('templates', []);
    }

    var app = angular.module('app', ['ui.router', 'ngSanitize', 'ui.calendar', 'satellizer', 'ngAnimate', 'ngWYSIWYG', 'ui.bootstrap', 'smart-table', 'angular-loading-bar', 'JSErrorLog', 'templates', 'angular-jsoneditor', 'ui.select', 'vAccordion', 'swxSessionStorage', 'ngBootbox', 'vcRecaptcha', 'zoomPanApp']);
    app.config(["$urlRouterProvider", "$authProvider", "$httpProvider", function ($urlRouterProvider, $authProvider, $httpProvider) {
            $authProvider.storageType = 'sessionStorage';

            $authProvider.authToken = '';

            let redirectUri = window.location.href;
            if (redirectUri.includes("index.html")) {
                redirectUri = redirectUri.substring(0, redirectUri.indexOf("index.html"));
            } else if (redirectUri.includes("#")) {
                redirectUri = redirectUri.substring(0, redirectUri.indexOf("#"));
            }

//            if (!$.un(config.clientId.google) && config.clientId.google) {
//                $authProvider.google({
//                    clientId: config.clientId.google,
//                    url: services.security.session.loginGoogle + "?jconf=" + JSON.stringify(jconf.initData),
//                    redirectUri: redirectUri
//                });
//            }
//
//            if (!$.un(config.clientId.facebook) && config.clientId.facebook) {
//                $authProvider.facebook({
//                    clientId: config.clientId.facebook,
//                    url: services.security.session.loginFacebook + "?jconf=" + JSON.stringify(jconf.initData),
//                    redirectUri: redirectUri   // Si o si tiene que terminar con slash
//                });
//            }



            $urlRouterProvider.otherwise(config.initState);

            if ($.un(services)) {
                bootbox.alert("No se encuentra el archivo services.js");
            }
            if (isDebugMode && rootService.indexOf("localhost") == -1) {
                bootbox.alert("Corriendo en modo <b>Debug</b> sobre un servicio que apunta a:<br><b>" + rootService + "</b>");
            }


            $httpProvider.interceptors.push(interceptHttp);

            function interceptHttp($q, $rootScope) {
                //https://www.bennadel.com/blog/2777-monitoring-http-activity-with-http-interceptors-in-angularjs.htm
                return({
                    request: request,
                    requestError: requestError,
                    response: response,
                    responseError: responseError
                });

                function request(config) {
                    if (extractMethod(config) !== "GET") {
                        $rootScope.inProcess = true;
                    }
                    return(config);
                }
                // Intercept the failed request.
                function requestError(rejection) {
                    return($q.reject(rejection));
                }
                // Intercept the successful response.
                function response(response) {
                    return(response);
                }
                // Intercept the failed response.
                function responseError(response) {
                    return($q.reject(response));
                }

                function extractMethod(response) {
                    try {
                        return(response.method);
                    } catch (error) {
                        return("GET");
                    }
                }
            }



        }]);

    app.run(["$location", "$rootScope", "$state", "SessionServ", '$JSErrorLog', function ($location, $rootScope, $state, SessionServ, $JSErrorLog) {


            /**
             * state donde se debe redireccionar en caso de querer ir al home
             */
            $rootScope.initState = config.initState;

            /**
             * state donde se debe redireccionar en caso de querer ir al home de un usuario logueado
             */
            $rootScope.initStateSigned = config.initStateSigned;

            /**
             * Variable para definir si la pagina está en construccion
             */
            $rootScope.inConstruction = config.inConstruction;


//            $JSErrorLog.config(config.JSErrorLogConfig);


            /**
             * Var global que se usa para mostrar/ocultar un div de loading que cubre toda la
             * pantalla y bloquea las acciones del usuario, se usa para procesos donde
             * no se desea que el usuario pueda seguir interactuando mientras se hace una tarea asincrona
             */
            $rootScope.loading = false;
            /**
             * Variabe global que se setea automaticamente a true cuando se estan realizando peticiones
             * POST/PUT/DELETE y a false cuando se se estan realizando peticiones al server
             * util para desabilitar botones de acciones
             */
            $rootScope.inProcess = false;
            /**
             * Var global que se usa para determinar cuando se inicializaron 
             * los datos propios del initData o cuando aun no se leyeron estos datos.
             * 
             */
            $rootScope.inicialized = false;

            $rootScope.nombreVisual = config.nombreVisual;

            $rootScope.mdAppId = config.mdAppId;
//
//            $rootScope.hasLoginGoogle = !$.un(config.clientId.google) && config.clientId.google;
//
//            $rootScope.hasLoginFacebook = !$.un(config.clientId.google) && config.clientId.facebook;

//            $JSErrorLog.config({
//                code: config.JSErrorLogConfig.code,
//                beforeSend: function (data) {
//                    if (!$.unCascade($rootScope, "user.name")) {
//                        data.user = $rootScope.user.name;
//                    }
//                    if (isDebugMode) {
//                        $.m_sms({
//                            error: {
//                                sms: data.message,
//                                detail: data.stack
//                            }
//                        });
//                    }
//                }
//            });

            /**
             * Configuracion de editor de texto enriquesido
             */
            $rootScope.editorConfig = config.editorConfig;

            /**
             * Token del MapBox (cambiar por uno propio)
             */
            mapboxgl.accessToken = config.mapboxgl.accessToken;


            /**
             * Configuracion de ciudadano misiones
             */
            $rootScope.ciudadanoOptions = config.ciudadanoMisiones;

            /**
             * Configuracion de ciudadano misiones
             */
            $rootScope.ciudadanoOptions = config.ciudadanoOptions;


            /**
             * 
             * @param {string} Se puede enviar una URI completa o un stat, hacia ciudadano
             * @param {type} stateCiudadano, el state al que se dirigirá el sistema actual, en caso de ser config.ciudadanoMisiones=true 
             * @param {type} state,  el state al que se dirigirá el sistema actual, en caso de ser config.ciudadanoMisiones=false
             */

            $rootScope.toCuidadano = function (nextState, extraParams, stateCiudadano, state) {
                if (config.ciudadanoMisiones) {
                    SessionServ.accessCiudadano(nextState, extraParams);

                    if (!$.un(stateCiudadano)) {
                        $state.go(stateCiudadano);
                    }

                } else {
                    if (!$.un(state)) {
                        $state.go(state);
                    }

                }

            };

            $rootScope.userProfileImg = function () {
                if ($.un($rootScope.user)) {
                    return;
                }
                if (config.ciudadanoMisiones) {
                    return "https://ciudadano.misiones.gob.ar/misionesdigital-web/services/security/user/profilethumbnail?cuit=" + $rootScope.user.cuit + "&temporal=" + new Date().getTime();
                } else {
                    return services.security.user.profilethumbnail + "?cuit=" + $rootScope.user.cuit;
                }
            };

            $rootScope.getProfileImg = function (user, forceCiudadano) {

                if (config.ciudadanoMisiones || !$.un(forceCiudadano)) {
//                    return `https://ciudadano.misiones.gob.ar/misionesdigital-web/services/security/user/profilethumbnail?cuit=${user.cuit},email=${user.correo},id=${user.id}`;

                    if ($.un(user)) {
                        user = {
                            cuit: null
                        };
                    }

                    if ($.un(user.cuit)) {
                        user.cuit = null;
                    }
                    if ($.un(user.correo)) {
                        user.correo = null;
                    }

                    return "https://ciudadano.misiones.gob.ar/misionesdigital-web/services/security/user/profilethumbnail?cuit=" + user.cuit + "&temporal=" + new Date().getTime();

                } else {

                    return services.security.user.profilethumbnail + "?cuit=" + user.cuit + "&email=" + user.correo + "&id=" + user.id;

                }
            };

        }]);


}());

                            