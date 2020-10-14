/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function() {
    var app = angular.module('app');

    app.service('PermissionServ', ['genF', function(genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.security.user.permission
            });
            //implementacion de metodos propios

            return s;
        }]);
    
        app.service('PermissionMeServ', ['genF', function(genF) {
            var s = new genF({
                urlS: services.security.user
            });
            
            s.getMyPermissions = function (rol) {
                return s.genericResponse({
                    "method": 'GET',
                    "data": {
                        jconf: {attrs:['name','code']},
                        name: rol
                    },
                    "url":  services.security.user.mypermissions
                });
            };
            
            return s;
        }]);

        app.service('GroupPermissionServ', ['genF', function(genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.security.user.group_permission
            });
            //implementacion de metodos propios
            
            return s;
        }]);
}());