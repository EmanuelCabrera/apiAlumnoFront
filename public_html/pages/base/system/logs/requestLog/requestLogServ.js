/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



(function() {
    var app = angular.module('app');

    app.service('RequestLogServ', ['genF', function(genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.requestlog,
                sendType:{create:'json',update:'json'}
            });
            //implementacion de metodos propios
            
            return s;
    }]);
}());