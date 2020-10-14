/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var jconf = typeof jconf == "undefined" ? {} : jconf;
jconf.root = typeof jconf.logs == "undefined" ? {} : jconf.logs;

jconf.root.logs = {};

jconf.root.scheduleEntity = {};

jconf.root.logs.requestLog = {attrs:['id','method', 'size','queryParams', 'formParams', 'patchParams', 'jsonParams', 'headersParams', 'absolutePatch', 'datetime', 'time', 'remoteAddr', 'remoteHost', 'remoteUser', 'remotePort', 'characterEncoding', 'user','userId']};

jconf.root.logs.errorLog = {attrs:['id','user','sms','detalle','resumen','fechaHora','code','requestLogId']};
jconf.root.logs.actions = {attrs: ['id', 'sms', 'time', 'clazz']};

jconf.root.scheduleEntity.list = {
    attrs: ['id', 'name', 'className', 'second', 'minute', 'hour', 'dayOfWeek', 'dayOfMonth', 'month', 'year', 'persistent', 'description', 'autostart'],
    info:{
        attrs:['name', 'timeRemaining', 'nextTimeout']
    }
};