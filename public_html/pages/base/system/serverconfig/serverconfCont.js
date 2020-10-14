/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app');

    app.controller('ServerconfCont', ["$scope", "$rootScope", 'ServerConfServ', '$state', function ($scope, $rootScope, ServerConfServ, $state) {
            $scope.modes = {options2: {mode: 'tree'}, options1: {mode: 'code'}};
            $scope.valoraconv;
            $scope.file = undefined;
            $scope.isNew = false;
            $scope.onLoad = function (instance) {
                instance.expandAll();
            };


            $scope.getInfoServer = function () {
                ServerConfServ.getFiles().success(function (data) {
                    $scope.files = data;
                });
            };
            $scope.changeEditor = function (fileid) {
                if ($.un(fileid) || !fileid) {
                    $scope.obj = {};
                    return;
                }

                ServerConfServ.getFileId(fileid).success(function (data) {
                    $scope.isNew = false;
                    $scope.obj = data;
                });
            };

            $scope.add = function () {
                $scope.isNew = true;
                $scope.obj = {};
                $scope.file = undefined;
                $scope.serverConfig = {};
            };

            $scope.cacheClean = function () {
                ServerConfServ.cacheClean();
            };

            $scope.getInfoServer();

            $scope.create = function () {

                if (!$scope.serverConfig.file) {
                    new PNotify({styling: 'fontawesome',
                        title: 'Atención',
                        text: "Ingrese el nombre del archivo.",
                        type: 'warning',
                        delay: 3000
                    });
                    return;
                }

                var content = JSON.stringify(angular.copy($scope.obj));
                $scope.serverConfig.content = content;

                ServerConfServ.update($scope.serverConfig).success(function (data) {
                    $scope.isNew = false;
                    $scope.obj = {};
                    $scope.file = undefined;
                    $scope.serverConfig = {};
                    $scope.getInfoServer();
                });
            };

            $scope.update = function (data, file) {
                if (!$scope.file) {
                    new PNotify({styling: 'fontawesome',
                        title: 'Atención',
                        text: "Seleccione un archivo.",
                        type: 'warning',
                        delay: 3000
                    });
                    return;
                }
                datas = JSON.stringify(data);
                $scope.serverConfig = {"file": file, "content": datas};

                ServerConfServ.update($scope.serverConfig).success(function (data) {
                    console.log(data);
                });
            };


            $scope.remove = function (file) {

                ServerConfServ.remove(file).success(function (data) {
                    console.log(data);
                });
            };





        }]);


}());
