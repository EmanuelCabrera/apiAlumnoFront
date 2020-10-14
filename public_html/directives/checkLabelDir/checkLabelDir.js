/**
 * CICHA Updated: 25/06/2015
 * CICHA Updated: 24/06/2015
 * CICHA Created: 23/06/2015
 */
(function () {
    var app = angular.module('app');

    app.directive('cCheck', function ( ) {
        return{
            restrict: 'E',
            replace: false,
            templateUrl: 'directives/checkLabelDir/checkLabel.html',
            scope: {
                text: "=", //texto a mostrar en el label
                editable: "=?", //permitir o no checkear// default false
                value: "=?", //valor true/false del checked
                onCheck: "&?",
                lblClass: "@?"
            },
            controller: function ($scope, $element, $attrs) {
                $scope.editable = $.un($scope.editable) ? false : $scope.editable;
                $scope.lblClass = $.un($scope.lblClass) ? "" : $scope.lblClass;
//                    $scope.isCheck = $.un($scope.isCheck) ? false : $scope.isCheck;;

//                    console.log($attrs);
                if ($scope.editable) {
                    if ($.un($attrs.onCheck)) {
                        $scope.onCheck = function () {
                            $scope.value = $.un($scope.value) || !$scope.value;
//                                $scope.isCheck = value;
                        };
                    } else {
//                            $scope.onCheck = $scope.onCheckIsolate;
                    }
                }
                if ($.un($attrs.isCheck)) {
//                        $scope.isCheck = function () {
//                            return $scope.value;
//                        };
                } else {
//                        $scope.isCheck = $scope.isCheckIsolate;
                }
            }
        };
    });

}());