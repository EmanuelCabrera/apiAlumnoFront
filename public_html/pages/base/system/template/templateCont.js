/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app');

    app.controller('TemplateCont', ["$scope", 'TemplateServ', function ($scope, TemplateServ) {

            $scope.file = undefined;
            $scope.isNew = false;


            $scope.getFiles = function () {
                TemplateServ.getFiles().success(function (data) {
                    $scope.files = data;
                });
            };

            $scope.getFiles();

            $scope.changeEditor = function (fileid) {
                
                if ($.un(fileid) || !fileid) {
                    $scope.text = "";
                    return;
                }

                TemplateServ.load({
                    name: fileid
                }).success(function (data) {
                    $scope.isNew = false;
                    
                    console.log(JSON.stringify(data));
                    $scope.text = data;
                });
            };

            $scope.add = function () {
                $scope.isNew = true;
                $scope.text = "";
                $scope.file = undefined;
                $scope.template = {};
            };



            $scope.create = function () {

                if (!$scope.template.name) {
                    new PNotify({styling: 'fontawesome',
                        title: 'Atención',
                        text: "Ingrese el nombre del archivo.",
                        type: 'warning',
                        delay: 3000
                    });
                    return;
                }

                $scope.template.content = $scope.text;

                TemplateServ.update($scope.template).success(function (data) {
                    $scope.isNew = false;
                    $scope.text = "";
                    $scope.file = undefined;
                    $scope.template = {};
                    $scope.getFiles();
                });
            };
            
            
            $scope.remove = function(file){  
                console.log(file);
                TemplateServ.remove(file).success(function (data) {
                    console.log(data);
                });
            };

            $scope.update = function () {
                if (!$scope.file) {
                    new PNotify({styling: 'fontawesome',
                        title: 'Atención',
                        text: "Seleccione un archivo.",
                        type: 'warning',
                        delay: 3000
                    });
                    return;
                }


                var datas = $scope.text;
                $scope.template = {"name": $scope.file, "content": datas};

                TemplateServ.update($scope.template).success(function (data) {
                    console.log(data);
                });
            };


        }]);


}());
