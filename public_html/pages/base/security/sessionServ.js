(function () {
    var app = angular.module('app');
    app.service('SessionServ', ['genF', '$auth', '$rootScope', function (genF, $auth, $rootScope) {
            //heredo de genF
            var s = new genF({
                urlS: services.session,
                sendType: {create: 'json', update: 'json'}
            });
            var private = {};

            s.register = function (data) {
                return s.genericResponse({
                    "method": 'POST',
                    "data": data,
                    "sendType": 'json',
                    "url": services.security.session.register
                });
            };
            s.initData = function (datas) {
                return s.genericResponse({
                    "method": 'GET',
                    "data": datas,
                    "url": services.security.session.initData
                }).success(function (data) {
                    s.setData(data);
                });
            };

            s.getUserData = function (data) {
                return s.genericResponse({
                    "method": 'GET',
                    "data": data,
                    "url": services.security.session.initData
                });
            };

            s.logout = function () {
                //services.security.session.logout
                return s.genericResponse({
                    "method": 'POST',
                    "url": services.security.session.logout
                }).success(function () {
                    s.removeDataSession();
                    $.m_sms({sms: "Se cerró la sesión"});
                    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

                    if (!$.un($rootScope.session) && $rootScope.session.data.jwt) {
                        s.logoutSSO($rootScope.session.data.jwt);
                    }
                });
            };


            s.loginSistem = function (datas, nextState) {
                //services.security.session.logout
                return s.genericResponse({
                    "method": 'POST',
                    "data": datas,
                    "url": services.security.session.loginSistem
                }).success(function (data) {
                    s.setData(data);
                    $.m_sms({sms: "Login correcto"});
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {nextState: nextState});
                }).error(function () {

                });
            };

//            s.loginFacebook = function (nextState) {
////                $rootScope.loading = true;
//                return $auth.authenticate('facebook')
//                        .then(function (data) {
////                            $rootScope.loading = false;
//                            s.setData(data.data);
//                            $.m_sms({sms: "Login correcto"});
//                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {nextState: nextState});
//                        }, function () {
////                            $rootScope.loading = false;
//                            $.m_sms({error: {sms: "Se ha producido un error"}});
//                        });
//            };


            s.getUrlBase = function (state) {
                var redirectUri = location.protocol + '//' +
                        location.hostname +
                        (location.port ? ":" + location.port : "") +
                        location.pathname +
                        (location.search ? location.search : "");

                if (!$.un(state)) {
                    redirectUri = redirectUri + state;
                }
                return redirectUri;
            };


            s.accessCiudadano = function (nextState, extraParams, blank) {
                let redirect_uri = config.ciudadanoOptions.uriToCiudadano;

                blank = $.un(blank) ? true : blank;

                let params = {
                    nextState: nextState,
                    ... extraParams
                };

                redirect_uri += '?params=' + btoa(JSON.stringify(params));

                let redirectLoginUrl = `https://sso.misiones.gob.ar/auth/realms/Misiones/protocol/openid-connect/auth?response_type=code&client_id=${config.clientId.ciudadano}&scope=email&redirect_uri=${encodeURIComponent(redirect_uri)}`;

                if (blank) {
                    window.open(redirectLoginUrl, '_blank');
                } else {
                    location.replace(redirectLoginUrl);
                }

            };

            s.loginCiudadano = function (nextState, extraParams) {

                let redirect_uri = s.getUrlBase() + '#/';

                let params = {

                };

                if (!$.un(nextState)) {
                    params = {
                        nextState: nextState
                    };
                }

                params = {
                    ...params,
                    ... extraParams
                };

                redirect_uri += '?params=' + btoa(JSON.stringify(params));

                let redirectLoginUrl = `https://sso.misiones.gob.ar/auth/realms/Misiones/protocol/openid-connect/auth?response_type=code&client_id=${config.clientId.marandu}&scope=email&redirect_uri=${encodeURIComponent(redirect_uri)}`;
                location.replace(redirectLoginUrl);
            };


            s.loginCiudadanoPOST = function (datas, nextState, errorState) {

                let jconf = `?jconf=${JSON.stringify(datas.jconf)}`;

                delete datas.jconf;

                return s.genericResponse({
                    "method": 'POST',
                    "data": datas,
                    "sendType": 'json',
                    "url": services.security.session.loginMarandu + jconf
                }).success(function (data) {
                    s.setData(data);
                    $.m_sms({sms: "Login correcto"});
//                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {nextState: nextState});
                    $rootScope.$broadcast(AUTH_EVENTS.loginSSOSuccess, {nextState: nextState});

                }).error(function (error) {

                    if (!$.un(error) && !$.un(error.error)) {

                        if (!$.un(error.error.code)) {
                            if (error.error.code == 1005) {
                                let userData = JSON.parse(error.error.sms);
                                let jwt = userData.token;
                                delete userData.token;

                                let redirectLoginUrl = s.getUrlBase() + '#/' + config.ciudadanoOptions.redirectLoginNoPermission + '?noUser=' + encodeURIComponent(JSON.stringify(userData));
                                if (config.ciudadanoOptions.logoutWhenNonPermission) {
                                    s.logoutSSO(jwt, redirectLoginUrl);
                                } else {
                                    location.replace(redirectLoginUrl);
                                }

                                return;
                            }
                        }

                    }

                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed, {nextState: errorState});

                });
            };


            s.loginMarandu = function (nextState) {
//                $rootScope.loading = true;

                return $auth.authenticate('marandu')
                        .then(function (data) {
                            s.setData(data.data);
                            $.m_sms({sms: "Login correcto"});
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {nextState: nextState});
                        }, function (err) {
//                            $rootScope.loading = false;
                            var data = err.data;

                            if (!$.un(data) && !$.un(data.error)) {

                                if (!$.un(data.error.code)) {
                                    if (data.error.code == 1005) {
                                        let userData = JSON.parse(data.error.sms);
                                        let jwt = userData.token;
                                        delete userData.token;
                                        let redirectLoginUrl = s.getUrlBase() + '#/' + config.ciudadanoOptions.redirectLoginNoPermission + '?noUser=' + encodeURIComponent(JSON.stringify(userData));
                                        if (config.ciudadanoOptions.logoutWhenNonPermission) {
                                            s.logoutSSO(jwt, redirectLoginUrl);
                                        } else {

                                            location.replace(redirectLoginUrl);
                                        }
                                        return;
                                    }
                                } else {
                                    $.m_sms({"error": data.error});

                                }

                            } else {
                                $.m_sms({error: {sms: "Se ha producido un error"}});
                            }


                        });
            };
//            s.loginGoogle = function (nextState) {
////                $rootScope.loading = true;
//                return $auth.authenticate('google')
//                        .then(function (data) {
////                            $rootScope.loading = false;
//                            s.setData(data.data);
//                            $.m_sms({sms: "Login correcto"});
//                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {nextState: nextState});
//                        }, function () {
////                            $rootScope.loading = false;
//                            $.m_sms({error: {sms: "Se ha producido un error"}});
//                        });
//            };

            s.loginSso = function (datas, nextState) {
//                $rootScope.loading = true;
                return s.genericResponse({
                    "method": 'POST',
                    "data": datas,
                    "sendType": 'json',
                    "url": services.security.session.loginSso
                }).success(function (data) {
                    s.setData(data);
                    $.m_sms({sms: "Login correcto"});
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {nextState: nextState});
                }).error(function () {

                });
            };



            s.removeDataSession = function () {
                $auth.logout();
                delete $rootScope.user;
            };

            s.setData = function (data) {
                if ($.empty(data.token)) {
                    s.removeDataSession();
                } else {
                    $auth.setToken(data.token);
                    $rootScope.user = data.user;
                    $rootScope.session = data;
                    /**
                     * Se crea una lista con todos los permisos del usuario 
                     * concatenado los permisos de los roles, para tener todo
                     * en una sola lista y que su manejo sea mas facil para 
                     * las validaciones
                     */
                    if ($.un($rootScope.user.roles)) {
                        $rootScope.user.permissions = [];
                    } else {
                        var permissions = [];
                        for (var i = 0; i < $rootScope.user.roles.length; i++) {
                            var rol = $rootScope.user.roles[i];
                            permissions = permissions.concat(rol.permissions);
                        }
                        $rootScope.user.permissions = permissions;
                    }
                }
            };


            s.logoutSSO = function (jwt, route) {
                if (jwt) {
                    var redirectUri = '';
                    if (!$.un(route)) {
                        redirectUri = route;
                    } else {
                        redirectUri = window.location.href;
                        if (redirectUri.includes("index.html")) {
                            redirectUri = redirectUri.substring(0, redirectUri.indexOf("index.html")) + 'index.html#';
                        } else if (redirectUri.includes("#")) {
                            redirectUri = redirectUri.substring(0, redirectUri.indexOf("#"));
                        }
                    }
                    location.replace(`https://sso.misiones.gob.ar/auth/realms/Misiones/protocol/openid-connect/logout?id_token_hint=${jwt}&post_logout_redirect_uri=${redirectUri}`)
                }

            };

            return s;
        }]);
}());

