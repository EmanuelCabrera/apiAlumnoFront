/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    var app = angular.module('app');
app.controller('DetailGroupPermissionCont', ["$scope", 'GroupPermissionServ', function ($scope, GroupPermissionServ) {
            var private = {};


            private.init = function () {
                
                                   GroupPermissionServ.load({
                        jconf: JSON.stringify({
                              attrs: ['id', 'name', 'code'], permisos :{attrs:['id', 'name', 'code']}
                         })
                    }).success(function (data) {

                        $scope.group_permissions = data;
                    });
            };


            private.init();
        }]);
}());