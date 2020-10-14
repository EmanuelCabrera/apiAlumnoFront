/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    var app = angular.module('app');
    app.directive('cStateHide', ['$rootScope', function ($rootScope) {
            return{
                restrict: 'A',
                replace: false,
                scope: {
                    cStateHide: '@', //state name a analizar
                    cStateAction: '@'// hide / disable, default: "hide"
                },
                link: function ($scope, elm, attrs) {
//                    $scope.$watch('stateHide', function (o, n) {
//                        testear();
//                    });
                    $rootScope.$watch('user', function (o, n) {
                        testear();
                    });

                    function testear() {
                        var action = $.empty($scope.cStateAction) ? "hide" : $scope.cStateAction.toLowerCase();
                        var show = $rootScope.isPermission($scope.cStateHide);

                        if (show) {
                            if (action == "hide") {
                                $(elm).removeClass("hide");
                            } else {
                                $(elm).removeClass("disabled");
                                $(elm).removeAttr('disabled');
                            }
                        } else {
                            if (action == "hide") {
                                $(elm).addClass("hide");
                            } else {
                                $(elm).addClass("disabled");
                                $(elm).attr('disabled','disabled');
                            }
                        }
                    }
                }
            };
        }
    ]);
}());