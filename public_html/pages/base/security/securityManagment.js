/* 
 * Manejo de seguridad a nivel sistema
 * declaracion de variables, metodos, eventos....
 */
AUTH_EVENTS = {
    loginSuccess: 'auth-login-success', //Se logueo correctamente
    loginSSOSuccess: 'auth-sso-login-success', //Se logueo correctamente en SSO
    loginFailed: 'auth-login-failed', //Fallo de autenticacion
    logoutSuccess: 'auth-logout-success', //Cerro sesion
    sessionTimeout: 'auth-session-timeout', //Expiro sesion
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
};
(function () {
    var app = angular.module('app');

    app.run(["$location", "$rootScope", "$state", "SessionServ", "$window", function ($location, $rootScope, $state, SessionServ, $window) {
            var private = {};
            private.loadInitData = function (event, next) {
                SessionServ.initData({jconf: JSON.stringify(jconf.initData)}).success(function () {
                    $rootScope.inicialized = true;
                    private.checkPermission(event, next);
                }).error(function () {
                    $rootScope.inicialized = true;
                    private.checkPermission(event, next);
                });
            };

            $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, data) {
                if (!$.un(data.nextState)) {
                    $location.path(data.nextState).search({});
                } else {
                    $state.go($rootScope.initStateSigned);
                }
            });
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, data) {

            });
            $rootScope.$on(AUTH_EVENTS.notAuthenticated, function (event, data) {
                if (config.publicStates.indexOf(data) == -1) {

                    if (config.ciudadanoMisiones) {
                        SessionServ.loginCiudadano(location.href);
                    } else {
                        setTimeout(function () {
                            SessionServ.removeDataSession();
                            $state.go('login');
                        }, 500);
                    }

                }
            });

            $rootScope.$on(AUTH_EVENTS.sessionTimeout, function (event, data) {
                $state.go('login', {"nextState": $location.path()});
            });

            $rootScope.$on(AUTH_EVENTS.notAuthorized, function (event, data) {
                /**
                 * si la pagina actual es igual a la pagina a la que tiene que ir
                 * y si no se tiene permiso, redirecciona a las paginas de inicio
                 * si ya anduvo dando vueltas por ahi, no se redirige, ya que en la validacion
                 * de permisos, lo que se hace es evitar que acceda al sitio, entonces queda donde
                 * estaba nomas.
                 */
                if (!$.un(data) && !$.un(data.nextState) && $state.current.name == data.nextState) {
                    if ($.un($rootScope.user)) {
                        $state.go($rootScope.initState);
                    } else {
                        $state.go($rootScope.initStateSigned);
                    }
                }
//                if ($window.history.length == 2) {
//
//                }
                $.m_sms({"error": {sms: 'No posee los privilegios necesarios para acceder al sitio solicitado'}});
            });

            $rootScope.$on('$stateChangeStart', function (event, next) {
                /**
                 * Si quiere ir al login pero ya tiene la session iniciada
                 * redirige a la pagina principal de inicio
                 */

                if (!$rootScope.inConstruction.active) {
                    if ($rootScope.bodylayout === "skin-blue sidebar-mini sidebar-collapse sidebar-open") {
                        $rootScope.bodylayout = "skin-blue sidebar-mini";
                    }
                    if (next.name === 'login' && !$.un($rootScope.user)) {
                        event.preventDefault();
                        $state.go($rootScope.initStateSigned);
                    }
                    private.checkPermission(event, next);
                }

            });

            private.checkPermission = function (event, next) {
                /**
                 * Si aun no se inicializaron los datos del init
                 * no hace nada
                 */
                if (!$rootScope.inicialized) {
                    private.loadInitData(event, next);
                } else {
                    if (!config.isRegister && next.name == "registro" || !$rootScope.isPermission(next.name)) {
                        if (!$.un(event)) {
                            event.preventDefault();
                        }
                        if ($.un($rootScope.user) || JSON.stringify($rootScope.user) == '{}') {
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, next.name);
                        } else {
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, {nextState: next.name});
                        }
                    }
                }

            };



            $rootScope.isPermission = function (state) {
                if (!$.un(security[state])) {
                    /**
                     * Si se encuentra definido el "state" en "security"
                     * significa que hay que controlarlo
                     */
                    if ($.un($rootScope.user)) {
                        return false;
                    } else {
                        if (!$rootScope.user.root && !$.m_inCollections(security[state].perms, $rootScope.user.permissions)) {
                            return false;
                        }
                    }
                }
                return true;
            };
        }]);


}());


