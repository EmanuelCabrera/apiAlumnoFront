/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app');
    app.controller('ClassInfoCont', ["$scope", "$rootScope", 'ClassInfoServ', '$state', function ($scope, $rootScope, ClassInfoServ) {
            $scope.modes = {options2: {mode: 'tree'}, options1: {mode: 'code'}};


            $scope.classinfo = {};

            $scope.save = function () {
                ClassInfoServ.create($scope.classinfo).success(function (data) {
                     
                });
            };

            $scope.onSelect = function (ci) {
                $scope.classinfo = ci;
            }
            $scope.onSearch = function () {
                $scope.classinfos = [];
                $scope.classinfosTbl = [];
                ClassInfoServ.load({'search': $scope.search}).success(function (data) {
                    $scope.classinfos = data.list;
                    $scope.classinfosTbl = [].concat(data.list);
                });
            }

        }]);


}());
