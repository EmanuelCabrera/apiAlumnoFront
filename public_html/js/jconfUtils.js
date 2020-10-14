(function () {
    $.jconf = {};

    $.jconf.cascadeFilterExtend = function (jconf, filter) {
        var auxJconf = $.extend({}, jconf);
        return $.jconf.cascadeFilter(auxJconf, filter);

    };


    $.jconf.cascadeFilter = function (jconf, filter) {

        $.each(jconf, function (attr, value) {
            if (attr != 'attrs' && attr != '@filters') {
                $.jconf.cascadeFilter(value, filter);
            }
        });
        jconf['@filters'] = filter;
        return jconf;
    };

    $.jconf.onlyEnabled = function (jconf) {
        return $.jconf.cascadeFilter(jconf, {op: 'NULL', field: 'deletedAt'});
    };

    $.jconf.onlyEnabledExtend = function (jconf) {
        var auxJconf = $.extend({}, jconf);
        return $.jconf.cascadeFilter(auxJconf, {op: 'NULL', field: 'deletedAt'});
    };

    $.jconf.filter = function (jconf, filter) {
        var auxJconf = $.extend({}, jconf);
        auxJconf['@filters'] = filter;
        return auxJconf;
    };



}());