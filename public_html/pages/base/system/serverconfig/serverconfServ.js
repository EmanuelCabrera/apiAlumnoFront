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

    app.service('ServerConfServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.servefilexid,
                sendType:{create:'json',update:'json'}
            });
            //implementacion de metodos propios

            s.getFiles = function () {
                return s.genericResponse({
                    "method": 'GET',
                    "url": services.root.serve
                });
            };
            s.getFileId = function (fileid) {
                return s.genericResponse({
                    "method": 'GET',
                    "url": services.root.servefilexid,
                    "data": {"file":fileid}
                });
            };
            s.remove = function (fileid) {
                return s.genericResponse({
                    "method": 'DELETE',
                    "url": services.root.servefilexid,
                    "data": {"file":fileid}
                });
            };
            s.cacheClean = function () {
                return s.genericResponse({
                    "method": 'PUT',
                    "url": services.root.serverConfigCacheClean
                });
            };
                
                

            

            return s;
        }]);
}());


