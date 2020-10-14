/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');
    app.controller('ErrorReportCont', ["$scope", "$rootScope",'vcRecaptchaService', 'ErrorReportServ', function ($scope, $rootScope, vcRecaptchaService,ErrorReportServ) {

            $scope.code = config.recaptcha.siteKey;
            $scope.errorReport = {
                subject: "",
                account: "",
                description: ""
            };

            $scope.enviado = false;


            $scope.create = function () {
                
                    if ($scope.errorReport.subject == "") {
                        new PNotify({styling: 'fontawesome',
                            title: 'Atención',
                            text: "Ingrese un asunto.",
                            type: 'warning',
                            delay: 3000
                        });
                        return;
                    }

                    if ($scope.errorReport.description == "") {
                        new PNotify({styling: 'fontawesome',
                            title: 'Atención',
                            text: "Ingrese la descripción del error.",
                            type: 'warning',
                            delay: 3000
                        });
                        return;
                    }
                    
                    if (vcRecaptchaService.getResponse() === "") {
                        new PNotify({styling: 'fontawesome',
                            title: 'Atención',
                            text: "Resuelva el captcha.",
                            type: 'warning',
                            delay: 3000
                        });
                        return;
                    }

                    $scope.enviado = true;
                    
                    $scope.errorReport.recaptchaToken = grecaptcha.getResponse(
                        $scope.token
                        );

                    ErrorReportServ.create($scope.errorReport, {queryParam: {recaptchaToken: $scope.errorReport.recaptchaToken}}).success(function (data) {
                        grecaptcha.reset($scope.token);
                        $scope.enviado = false;
                        $scope.errorReport = {
                            subject: "",
                            account: "",
                            description: ""
                        };

                    }).error(function () {
                        $scope.enviado = false;
                    });
                    ;
                
            };


        }]);
}());