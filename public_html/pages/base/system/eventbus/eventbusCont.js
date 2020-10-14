/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app');
    app.controller('EventBusCont', ["$scope", "$rootScope", 'EventBusServ', '$state', function ($scope, $rootScope, EventBusServ) {
            $scope.modes = {options2: {mode: 'tree'}, options1: {mode: 'code'}};


            $scope.eventbus = {};

            $scope.send = function () {
                EventBusServ.create($scope.eventbus).success(function (data) {
                    $scope.response = JSON.stringify(data);

                });
            };

        }]);


}());
