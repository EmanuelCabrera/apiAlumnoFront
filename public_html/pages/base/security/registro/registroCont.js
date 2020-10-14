//
//Cicha Created: 2016/03/28 
//
(function () {
    var app = angular.module('app');

    app.controller('RegistroCont', ["$scope", 'SessionServ', '$rootScope', '$auth', 'vcRecaptchaService', function ($scope, SessionServ, $rootScope, $auth, vcRecaptchaService) {
            var private = {};
            $scope.user = {};
            $scope.proccess = false;
            $scope.termAndCond = false;
            $scope.code = config.recaptcha.siteKey;
            $scope.register = function () {

                $scope.proccess = true;

                if (vcRecaptchaService.getResponse() === "") { //if string is empty
                    
                    $scope.proccess = false;
                    $.m_sms( {error: {
                            sms: "Por favor, resuelva el captach y luego registrese"
                        }});

                } else {
                    SessionServ.register($scope.user).success(function (data) {
                        $auth.setToken(data.token);
                        $rootScope.user = data.user;
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {nextState: $rootScope.initStateSigned});
                        $.m_sms({sms: "Registro correcto"});
                        $scope.proccess = false;
                    }).error(function (data) {
                        $scope.proccess = false;
                    });
                }
            };


            private.init = function () {

            };

            private.init();
        }]);
}());