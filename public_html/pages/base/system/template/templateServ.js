
(function () {
    var app = angular.module('app');

    app.service('TemplateServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.tempalte,
                sendType: {create: 'json', update: 'json'}
            });
            //implementacion de metodos propios

            s.getFiles = function () {
                return s.genericResponse({
                    "method": 'GET',
                    "url": services.root.tempalte + '/files'
                    
                });
            };
          
            s.remove = function (fileid) {
                console.log(fileid);
                return s.genericResponse({
                    "method": 'DELETE',
                    "url": services.root.tempalte,
                    "data": {"file":fileid}
                });
            };
          
            return s;
        }]);
}());


