
security = typeof security == "undefined" ? [] : security;

security["actionLog/class"] = {perms: ['ACTION_LOG_LIST']};
security["actionLog/list"] = {perms: ['ACTION_LOG_LIST']};