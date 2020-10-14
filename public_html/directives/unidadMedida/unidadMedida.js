(function () {
    var app = angular.module('app');
    app.directive("unidadMedida", function () {
        return {
            templateUrl: 'directives/unidadMedida/unidadMedida.html',
            scope: {
                model: "=?",
                precision: "=?",
                value: "=?",
                um: "=?",
                label: "=?",
                required: "=?",
                fnCalulo: "=?",

            },
            controller: function ($scope, $element, $attrs) {
                $scope.pivote = 1024;
                $scope.focusedInput = false;
                $scope.focusedSelect = false;
                $scope.precision = $.un($scope.precision) ? 1 : $scope.precision;
                $scope.unidades = [{
                        label: 'bytes',
                        value: "0"
                    },
                    {
                        label: 'kb',
                        value: "1"
                    },
                    {
                        label: 'MB',
                        value: "2"
                    },
                    {
                        label: 'GB',
                        value: "3"
                    },
                    {
                        label: 'TB',
                        value: "4"
                    },
                    {
                        label: 'PT',
                        value: "5"
                    }
                ];

                $scope.onChangeUnidad = function () {
                    
                    if ($.un($scope.value)){
                        return;
                    }
                    
                    if (!$.un($scope.fnCalulo)) {
                        $scope.fnCalulo($scope.um);
                        return;
                    }

                    if ($scope.focusedSelect || $scope.focusedInput) {
                        if ($scope.um > 0) {
                            $scope.model = Math.pow($scope.pivote, parseFloat($scope.um)) * parseFloat($scope.value);
                        } else {
                            $scope.model = parseFloat($scope.value);
                        }
                    }


                };

                $scope.$watch('value', function (n, v) {
                    $scope.onChangeUnidad();
                });

                $scope.$watch('model', function (n, v) {
                    if (!$scope.focusedInput) {
                        $scope.setUnidad();
                    }

                });

                $scope.setUnidad = function () {

                    if ($scope.model) {
                        $scope.indexUnidad = Math.floor(Math.log($scope.model) / Math.log($scope.pivote));

                        $scope.um = $scope.indexUnidad.toString();

                        $scope.value = parseFloat($scope.model) / Math.pow($scope.pivote, Math.floor($scope.indexUnidad));

                        $scope.value = $scope.value.toFixed(parseInt($scope.precision));
                    } else {
                        $scope.um = "0";
                    }
                };



            }

        };
    });
}());