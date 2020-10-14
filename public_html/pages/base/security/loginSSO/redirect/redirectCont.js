(function () {
    var app = angular.module('app');

    app.controller('LoginRedirectCont', ["$scope", "$state", "$stateParams", 'SessionServ', '$rootScope',
        function ($scope, $state, $stateParams, SessionServ, $rootScope) {

            if (!$.un($rootScope.user) && JSON.stringify($rootScope.user) != '{}') {
                return;
            }

            if ($stateParams.code && $stateParams.sessionState) {

                $rootScope.$on(AUTH_EVENTS.loginFailed, function (event, data) {
                    $state.go(config.ciudadanoOptions.redirectLoginNoCode);
                });


                let redirect_uri = SessionServ.getUrlBase() + "#/";

                let nextState = config.ciudadanoOptions.redirectLoginSuccess;

                let params = $stateParams.params ? JSON.parse(atob($stateParams.params)) : '';
                if (params && !$.un(params.nextState)) {
                    nextState = params.nextState;
                }

                redirect_uri = redirect_uri + '?params=' + $stateParams.params;

                $rootScope.$on(AUTH_EVENTS.loginSSOSuccess, function (event, data) {

                    if (!$.un(nextState) && nextState) {

                        if (nextState.indexOf('http') > -1) {
                            setTimeout(function () {

                                if (params && params.backUrl) {
                                    var arr = nextState.split('?');
                                    if (arr.length > 1 && arr[1] !== '') {
                                        nextState += `&backUrl=${btoa(params.backUrl)}`;
                                    } else {
                                        nextState += `?backUrl=${btoa(params.backUrl)}`;
                                    }

                                }
                                window.location.replace(nextState);
                            }, 300);

                        } else {
                            $state.go(nextState);
                        }

                    }

                });


                SessionServ.loginCiudadanoPOST({
                    jconf: jconf.initData,
                    clientId: config.clientId.marandu,
                    code: $stateParams.code,
                    redirectUri: redirect_uri,
                }, nextState, config.ciudadanoOptions.redirectLoginFailed);

            } else {
                $state.go(config.ciudadanoOptions.redirectLoginNoCode);
            }

        }]);
}());