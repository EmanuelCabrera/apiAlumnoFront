/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var services = $.un(services) ? {} : services;
services.root = $.un(services.root) ? {} : services.root;

services.root.requestlog = rootService + "logs/requestlog";
services.root.errorlog = rootService + "logs/errorlog";
services.root.errorlogNotificationCase = rootService + "logs/errorlog/notification/case";
services.root.errorlogNotificationAccount = rootService + "logs/errorlog/notification/account";
services.root.methodname = rootService + "sistem/methodname";
services.root.serve = rootService + "server/files";
services.root.servefilexid = rootService + "server";
services.root.serverConfigCacheClean = rootService + "server/cacheclean";
services.root.tempalte = rootService + "template";
services.root.scheduleEntity = rootService + "schedule_entity";
services.root.schedule = rootService + "schedule";
services.root.scheduleStart = rootService + "start";
services.root.scheduleStop = rootService + "stop";
services.root.mail = rootService + "mail";
services.root.backup =  rootService + "backup";
services.root.eventbus =  rootService + "eventbus";
services.root.classinfo =  rootService + "classinfo";