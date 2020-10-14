/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');
    app.controller('CalendarioEventoCont', ["$scope", "$rootScope", 'CalendarioEventoServ', 'CalendarioServ', '$stateParams', "$compile", "uiCalendarConfig", function ($scope, $rootScope, CalendarioEventoServ, CalendarioServ, $stateParams, $compile, uiCalendarConfig) {
            var private = {};
            $scope.event = undefined;
            $scope.jconfFiltro = {
                op: 'NULL',
                field: 'deletedAt'
            };
            $scope.validations = {
                title: {
                    maxlength: 50
                }
            };
            $scope.events = [];
            $scope.eventsTbl = [];

            $scope.event = {
                calendarId: $stateParams.id,
                allday: false,
                title: "",
                descripcion: "",
                start: "",
                end: ""
            };
            $scope.onSelect = function (d) {
                if ((!angular.isUndefined($scope.event) && $scope.event.id === d.id)) {
                    $scope.event = undefined;
                } else {
                    $scope.event = $.extend({}, d, true);
                }
            };


            $scope.onClear = function () {
                $scope.event.id = "";
                $scope.event.title = "";
                $scope.event.descripcion = "";
                $scope.event.allDay = false;
                $scope.event.start = "";
                $scope.event.end = "";
                $scope.event.adjuntos = undefined;
                $scope.event.form = false;
                private.loadView();
            };

            $scope.create = function () {
                if (angular.isUndefined($scope.event.title) || $scope.event.title.length > $scope.validations.title.maxlength) {
                    $.m_sms({
                        error: {
                            sms: "El campo title no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    CalendarioEventoServ.createContent($scope.event).success(function (data) {
                        $scope.onClear();
                        $scope.init();
                    });
                }
            };

            $scope.update = function () {
                if (angular.isUndefined($scope.event.title) || $scope.event.title.length > $scope.validations.title.maxlength) {
                    $.m_sms({
                        error: {
                            sms: "El campo codigo no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    CalendarioEventoServ.updateContent($scope.event).success(function (data) {
                        $scope.onClear();
                        $scope.init();
                    });
                }
            };


            $scope.onAction = function (response, action) {
                response.success(function () {
                    $scope.init();
                });
            };
            $scope.disable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.event.id;
                }
                CalendarioEventoServ.disable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };
            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.event.id;
                }
                CalendarioEventoServ.enable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.remove = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.event.id;
                }
                CalendarioEventoServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.init = function () {

                CalendarioServ.load({
                    id: $stateParams.id,
                    "jconf": JSON.stringify(jconf.calendario.list),
                    "query": JSON.stringify({
                        orders: ["title"]
                    })
                }).success(function (data) {
                    $scope.calendario = data;
                    $scope.eventEventosTbl = [].concat(data.eventos);
                    private.loadView();
                });
            };

            $scope.init();

            $scope.datepicker = {
                opened: false
            };
            $scope.datepickerHasta = {
                opened: false
            };

            $scope.timepicker = {
                ismeridian: false,
                hstep: 1,
                mstep: 5
            };

            $scope.openDatepicker = function () {
                $scope.datepicker.opened = true;
            };
            $scope.openDatepickerHasta = function () {
                $scope.datepickerHasta.opened = true;
            };

            $scope.dateOptions = {
                formatYear: 'yyyy',
//                minDate: new Date(),
                startingDay: 1,
                showWeeks: false
            };

//CALENDARIO
            $scope.event.form = false;
            $scope.eventSources = [];
//            moment.locale('es');
//            moment().utc();
            $scope.uiConfig = {
                calendar: {
                    height: 450,
                    editable: false,
                    selectable: true,

                    header: {
                        left: 'month agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    timeZone: 'UTC',

//                    dayClick: function (calEvent, jsEvent, view) {
////                        $scope.alertEventOnClick(calEvent, jsEvent, view);
//                        calEvent.hasTime();
//                        console.log(calEvent.hasTime());
//                    },
                    eventClick: function (date, jsEvent, view) {
                        $scope.alertOnEventClick(date, jsEvent, view);
                    },
                    select: function (start, end, calEvent, jsEvent, view) {
                        $scope.selectedDate(start, end, calEvent, jsEvent, view);
                    },
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize,
                    buttonText: {
                        today: 'Hoy',
                        month: 'Mes',
                        agendaWeek: 'Semana',
                        agendaDay: 'Dia'
                    },
                    viewRender: function (view, element) {
                        private.loadView(view);
                    }
                }};


            /* Change View */
            $scope.changeView = function (view, calendar, type) {
                $scope.viewType = type;
                uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);

            };
            /* alert on eventClick */
            $scope.alertOnEventClick = function (date, jsEvent, view) {
                $scope.event = {
                    id: date.id,
                    title: date.title,
                    end: date.end._d,
                    allDay: date.allDay,
                    start: date.start._d,
                    descripcion: date.descripcion,
                    calendarId: date.calendarId,
                    adjuntos: date.adjuntos
                };
                $scope.event.form = true;
            };

            $scope.selectedDate = function (start, end, calEvent, jsEvent, view) {
                if (!$.un($scope.event.id)) {
                    $scope.onClear();
                }
                $scope.event.form = true;
                $scope.event.allDay = !start.hasTime();
                $scope.event.start = start._d;
                $scope.event.end = end._d;
                var started = new Date(start._d.toUTCString());
                console.log(started);
            };


            private.loadView = function (view) {


                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                if (view) {
                    firstDay = view.start._d;
                    lastDay = view.end._d;
                }

                if (!$.un($scope.eventEventosTbl)) {

                    $scope.setCalendar($scope.eventEventosTbl);
                }


            };

            $scope.setCalendar = function (eventos) {

                var events = [];
                $scope.events.length = 0;

                for (let h of eventos) {
                    var startDate = new Date(h.start);
                    var endDate = new Date(h.end);

                    $scope.events.push(
                            {
                                id: h.id,
                                title: h.title,
                                start: startDate,
                                end: endDate,
                                allDay: h.allDay,
                                descripcion: h.descripcion,
                                calendarId: h.calendarId,
                                adjuntos: h.adjuntos
                            }
                    );

                }
            };
            /* event sources array*/
            $scope.eventSources = [$scope.events];

            ///BORRAR EVENTO
            $scope.borrar = function (eventId) {
                bootbox.confirm({
                    message: "Esta seguro que desea eliminar el evento?",
                    buttons: {
                        confirm: {
                            label: 'Confirmar',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'Cancelar',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (result) {
                        console.log('This was logged in the callback: ' + result);
                        if (result) {
                            $scope.remove(eventId);
                        }
                    }
                });
            };


        }]);
}());

//                if ($.un($scope.event.id) || $scope.event.id === "") {
//                    $scope.event.started = new Date(start._d);
//                    $scope.event.start = start._d;
//                    $scope.event.start = new Date($scope.event.start.setMinutes($scope.event.start.getMinutes() + $scope.event.start.getTimezoneOffset()));
//
//                    $scope.event.ended = new Date(end._d);
//                    $scope.event.end = end._d;
//                    $scope.event.end = new Date($scope.event.end.setMinutes($scope.event.end.getMinutes() + $scope.event.end.getTimezoneOffset()));
//                } else {
//                    $scope.event.start = start._d;
//                    $scope.event.end = end._d;
//                }

//                $scope.event.started = new Date(date.start._d);
//                $scope.event.start = date.start._d;
//                $scope.event.ended = new Date(date.end._d);
//                $scope.event.end = date.end._d;
