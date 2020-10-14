/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//
//Cicha Created: 2016/03/24 
//
(function () {
    var app = angular.module('app');

    app.service('MethodNameServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.methodname,
                sendType:{create:'json',update:'json'}
            });
            //implementacion de metodos propios

            s.getMethodNames = function () {
                return s.genericResponse({
                    "method": 'GET',
                    "url": services.root.methodname
                });
            };
          

            

            return s;
        }]);
}());


