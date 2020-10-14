/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var security = typeof security == "undefined" ? [] : security;

security["logs/requestlog"] = {perms: ['LOG_REQUEST_LIST']};
security["logs/errorlog"] = {perms: ['LOG_ERROR_LIST']};
security["logs/notificationCase"] = {perms: ['NOTIFICATION_ERROR_CASE_LIST', 'NOTIFICATION_ERROR_ACCOUNT_ADD', 'NOTIFICATION_ERROR_ACCOUNT_UPD']};
security["logs/notificationAccount"] = {perms: ['NOTIFICATION_ERROR_ACCOUNT_LIST', 'NOTIFICATION_ERROR_ACCOUNT_ADD', 'NOTIFICATION_ERROR_ACCOUNT_UPD']};
security["methodname"] = {perms: ['CORE_METHODSNAME_INVOQUE','CORE_METHODSNAME_LIST','CORE_METHODSNAME_INVOQUETRAN']};
security["serverconfig"] = {perms: ['CORE_SERVERCONFIG_CREATE','CORE_SERVERCONFIG_PUT','CORE_SERVERCONFIG_FILE_READ','CORE_SERVERCONFIG_FILE_LIST','CORE_SERVERCONFIG_SAVE']};
security["timers/scheduleEntity"] = {perms: ['SCHEDULE_ADD','SCHEDULE_UPD','SCHEDULE_REM','SCHEDULE_START','SCHEDULE_START_ID','SCHEDULE_STOP']};
security["timers/scheduleEntity/act"]  = {perms:['SCHEDULE_ADD','SCHEDULE_UPD','SCHEDULE_REM','SCHEDULE_START','SCHEDULE_START_ID','SCHEDULE_STOP']};
security["backup"]  = {perms:['SCHEDULE_ADD','SCHEDULE_UPD','SCHEDULE_REM','SCHEDULE_START','SCHEDULE_START_ID','SCHEDULE_STOP']};

