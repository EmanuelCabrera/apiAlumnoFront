/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



(function () {
    var app = angular.module('app');
    app.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                    .state('backup', {
                        url: '/backup',
                        templateUrl: 'pages/base/system/backup/backup.html',
                        controller: 'BackupCont'
                    })
                    .state('logs/requestlog', {
                        url: '/resquestlog/:page',
                        templateUrl: 'pages/base/system/logs/requestLog/requestLog.html',
                        controller: 'RequestLogCont'
                    })
                    .state('logs/errorlog', {
                        url: '/errorlog',
                        templateUrl: 'pages/base/system/logs/errorLog/errorLog.html',
                        controller: 'ErrorLogCont'
                    })
                    .state('logs/notificationCase', {
                        url: '/notificationCase',
                        templateUrl: 'pages/base/system/logs/errorLog/notificationCase/notificationCase.html',
                        controller: 'NotificationCaseCont'
                    })
                    .state('logs/notificationAccount', {
                        url: '/notificationAccount',
                        templateUrl: 'pages/base/system/logs/errorLog/notificationAccount/notificationAccount.html',
                        controller: 'NotificationAccountCont'
                    })
                    .state('timers/scheduleEntity', {
                        url: '/timers/scheduleEntity',
                        templateUrl: 'pages/base/system/timers/scheduleEntity/scheduleEntity.html',
                        controller: 'ScheduleEntityCont'
                    })
                    .state('timers/scheduleEntity/act', {
                        url: '/timers/scheduleEntity/act/:id',
                        templateUrl: 'pages/base/system/timers/scheduleEntity/act/scheduleEntityAct.html',
                        controller: 'ScheduleEntityActCont'
                    })
                    .state('serverconfig', {
                        url: '/serverconfig',
                        templateUrl: 'pages/base/system/serverconfig/serverconfig.html',
                        controller: 'ServerconfCont'
                    })
                    .state('template', {
                        url: '/template',
                        templateUrl: 'pages/base/system/template/template.html',
                        controller: 'TemplateCont'
                    })
                    .state('methodname', {
                        url: '/methodname',
                        templateUrl: 'pages/base/system/methodname/methodname.html',
                        controller: 'MethodNameCont'
                    })
                    .state('mail', {
                        url: '/mail',
                        templateUrl: 'pages/base/system/mail/mail.html',
                        controller: 'MailCont'
                    })
                    .state('system/apirest', {
                        url: '/system/apirest',
                        templateUrl: 'pages/base/system/apirest/apirest.html',
                        controller: 'ApiRestCont'
                    })
                    .state('eventbus', {
                        url: '/eventbus',
                        templateUrl: 'pages/base/system/eventbus/eventbus.html',
                        controller: 'EventBusCont'
                    })
                    .state('classinfo', {
                        url: '/classinfo',
                        templateUrl: 'pages/base/system/classinfo/classinfo.html',
                        controller: 'ClassInfoCont'
                    })
                    ;
        }]);
}());