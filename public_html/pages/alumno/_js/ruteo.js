(function () {
    var app = angular.module('app');
    app.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                    .state('materia', {
                        url: '/materias',
                        templateUrl: 'pages/alumno/materia/materia.html',
                        controller: 'MateriaCont'
                    })
                    .state('profesor', {
                        url: '/profesores',
                        templateUrl: 'pages/alumno/profesor/profesor.html',
                        controller: 'ProfesorCont'
                    })
                    .state('alumno', {
                        url: '/alumnos',
                        templateUrl: 'pages/alumno/alumno/alumno.html',
                        controller: 'AlumnoCont'
                    })
                    .state('mesaexamen', {
                        url: '/mesaexamenes',
                        templateUrl: 'pages/alumno/mesaExamen/mesaExamen.html',
                        controller: 'MesaExamenCont'
                    })
                    .state('mesaexamen/act', {
                        url: '/mesaexamen/act/:id',
                        templateUrl: 'pages/alumno/mesaExamen/act/mesaExamenAct.html',
                        controller: 'MesaExamenActCont'
                    });
//                    .state('tickettype', {
//                        url: '/tickettype',
//                        templateUrl: 'pages/cflow/ticketType/ticketType.html',
//                        controller: 'TicketTypeCont'
//                    })
//                    .state('tickettype/act', {
//                        url: '/tickettype/act/:id',
//                        templateUrl: 'pages/cflow/ticketType/act/ticketTypeAct.html',
//                        controller: 'TicketTypeActCont'
//                    })
//                    .state('project', {
//                        url: '/project',
//                        templateUrl: 'pages/cflow/project/project.html',
//                        controller: 'ProjectCont'
//                    })
//                    .state('project/act', {
//                        url: '/project/act/:id',
//                        templateUrl: 'pages/cflow/project/act/projectAct.html',
//                        controller: 'ProjectActCont'
//                    })
//                    .state('projectgroup', {
//                        url: '/projectgroup',
//                        templateUrl: 'pages/cflow/projectGroup/projectGroup.html',
//                        controller: 'ProjectGroupCont'
//                    })
//                    .state('projectgroup/act', {
//                        url: '/projectgroup/act/:id',
//                        templateUrl: 'pages/cflow/projectGroup/act/projectGroupAct.html',
//                        controller: 'ProjectGroupActCont'
//                    })
//                    .state('project/detail', {
//                        url: '/project/detail/:id',
//                        templateUrl: 'pages/cflow/project/detail/projectDetail.html',
//                        controller: 'ProjectDetailCont'
//                    })
//                    .state('project/remove', {
//                        url: '/project/remove/:id',
//                        templateUrl: 'pages/cflow/project/remove/projectRemove.html',
//                        controller: 'ProjectRemoveCont'
//                    })
//                    .state('userflow', {
//                        url: '/userflow',
//                        templateUrl: 'pages/cflow/userFlow/userFlow.html',
//                        controller: 'UserFlowCont'
//                    })
//                    .state('userflow/act', {
//                        url: '/userflow/act/:id',
//                        templateUrl: 'pages/cflow/userFlow/act/userFlowAct.html',
//                        controller: 'UserFlowActCont'
//                    })
//                    .state('ticket/act', {
//                        url: '/ticket/act/?projectid',
//                        templateUrl: 'pages/cflow/ticket/act/ticketAct.html',
//                        controller: 'TicketActCont'
//                    })
//                    .state('ticket/det', {
//                        url: '/ticket/det/?id&projectid',
//                        templateUrl: 'pages/cflow/ticket/act/ticketAct.html',
//                        controller: 'TicketActCont'
//                    })
////                    .state('ticket/detalle', {
////                        url: '/ticket/detalle/?id&projectid',
////                        templateUrl: 'pages/cflow/ticket/det/ticketDet.html',
////                        controller: 'TicketDetCont'
////                    })
//                    .state('comment', {
//                        url: '/comment/:id',
//                        templateUrl: 'pages/cflow/comment/comment.html',
//                        controller: 'CommentCont'
//                    })                   
//                    .state('usuarioflow', {
//                        url: '/usuarioflow',
//                        templateUrl: 'pages/cflow/usuarioFlow/usuarioFlow.html',
//                        controller: 'UsuarioFlowCont'
//                    })
//                    .state('usuarioflow/act', {
//                        url: '/usuarioflow/act/:id',
//                        templateUrl: 'pages/cflow/usuarioFlow/act/usuarioFlowAct.html',
//                        controller: 'UsuarioFlowActCont'
//                    })
//                    ;
        }]);
}());
