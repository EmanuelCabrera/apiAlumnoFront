/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



(function() {
    var app = angular.module('app');

    app.service('ErrorLogServ', ['genF', function(genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.errorlog,
                sendType:{create:'json',update:'json'}
            });
            //implementacion de metodos propios
            s.genError = function () {
                return s.genericResponse({
                    "method": 'GET',
                    "url": services.root.errorlog + '/generror'
                });
            };
            
            return s;
    }]);
}());