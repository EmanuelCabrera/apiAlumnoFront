ALERT_RESTORE_EVENT = "ALERT_RESTORE_EVENT";
(function () {
    var app = angular.module('app');

    app.run(["LogicalRemoveServ", "$rootScope", "$state", "$window", function (LogicalRemoveServ, $rootScope, $state, $window) {
            var private = {};
            $rootScope.$on(ALERT_RESTORE_EVENT, function (event, data) {
                var stack = {"dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0};
                var scope = $rootScope.$new();
//                var bodyText = $compile("<alert-restore sms='" + data.error.sms + "' id='" + data.error.id + "'></alert-restore>")(scope);
                bootbox.dialog({
                    title: "Restaurar?",
                    message: data.error.sms,
                    buttons: {
                        restore: {
                            label: '<i class="fa fa-check-circle"></i> Restaurar',
                            className: 'btn-success',
                            callback: function (result) {
                                LogicalRemoveServ.enable(data.error.id).success(function () {
                                    $window.location.reload();
                                });
                            }
                        },
                        cancel: {
                            label: ' Cancelar',
                            className: 'btn-default'
                        }
                    }
                });
            });

        }]);


}());