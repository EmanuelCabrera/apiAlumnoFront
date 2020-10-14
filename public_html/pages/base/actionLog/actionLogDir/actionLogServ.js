
(function () {
    var app = angular.module('app');

    app.service('ActionLogServ', ['genF', function (genF) {
            //heredo de genF

//            var s = new genF({
//                urlS: service
//            });
            var s = new genF({
                urlS: rootService + 'logs/actionlog',
                sendType: {create: 'json', update: 'json'}
            });

            s.getDat = function (data) {

                return s.genericResponse({
                    "method": 'GET',
                    "data": data,
                    "sendType": 'query',
                    "url": rootService + 'logs/actionlog/getData'
                });
            };


            s.notThumbnail = function (id){
                return s.genericResponse({
                    "method": 'GET',
                    "data": {"id":id},
                    "sendType": 'query',
                    "url": rootService + 'security/user/existprofilethumbnail'
                });
            }    

            s.getData = function (data) {

                return s.genericResponse({
                    "method": 'GET',
                    "data": data,
                    "sendType": 'query',
                    "url": rootService + 'logs/actionlog'
                });
            };

            return s;
        }]);
}());
