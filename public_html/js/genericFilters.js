
(function () {
    var app = angular.module('app');
    app.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value)
                return '';
            max = parseInt(max, 10);
            if (!max)
                return value;
            if (value.length <= max)
                return value;
            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                    //Also remove . and , so its gives a cleaner result.
                    if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
                        lastspace = lastspace - 1;
                    }
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
    /***
     * Filtro utilizado en la busqueda de items en el ui-select
     */
    app.filter('propsFilter', function () {
        return function (items, props) {
            var out = [];
            if (angular.isArray(items)) {
                var keys = Object.keys(props);
                items.forEach(function (item) {
                    var itemMatches = false;
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });

    app.filter('bytes', function () {
        return function (bytes, precision) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes))
                return '-';
            if (typeof precision === 'undefined')
                precision = 1;
            var units = ['bytes', 'kb', 'MB', 'GB', 'TB', 'PB'],
                    number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
        };
    });

    app.filter('millSecondsToTimeStringEN', function () {
        return function (millseconds) {
            var oneSecond = 1000;
            var oneMinute = oneSecond * 60;
            var oneHour = oneMinute * 60;
            var oneDay = oneHour * 24;

            var seconds = Math.floor((millseconds % oneMinute) / oneSecond);
            var minutes = Math.floor((millseconds % oneHour) / oneMinute);
            var hours = Math.floor((millseconds % oneDay) / oneHour);
            var days = Math.floor(millseconds / oneDay);

            var timeString = '';
            if (days !== 0) {
                timeString += (days !== 1) ? (days + ' days ') : (days + ' day ');
            }
            if (hours !== 0) {
                timeString += (hours !== 1) ? (hours + ' hours ') : (hours + ' hour ');
            }
            if (minutes !== 0) {
                timeString += (minutes !== 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
            }
            if (seconds !== 0 || millseconds < 1000) {
                timeString += (seconds !== 1) ? (seconds + ' seconds ') : (seconds + ' second ');
            }

            return timeString;
        };
    });

    app.filter('millSecondsToTimeStringES', function () {
        return function (millseconds) {
            var oneSecond = 1000;
            var oneMinute = oneSecond * 60;
            var oneHour = oneMinute * 60;
            var oneDay = oneHour * 24;

            var seconds = Math.floor((millseconds % oneMinute) / oneSecond);
            var minutes = Math.floor((millseconds % oneHour) / oneMinute);
            var hours = Math.floor((millseconds % oneDay) / oneHour);
            var days = Math.floor(millseconds / oneDay);

            var timeString = '';
            if (days !== 0) {
                timeString += (days !== 1) ? (days + ' días ') : (days + ' día ');
            }
            if (hours !== 0) {
                timeString += (hours !== 1) ? (hours + ' hs ') : (hours + ' h ');
            }
            if (minutes !== 0) {
                timeString += (minutes !== 1) ? (minutes + ' min ') : (minutes + ' min ');
            }
            if (seconds !== 0 || millseconds < 1000) {
                timeString += (seconds !== 1) ? (seconds + ' seg ') : (seconds + ' seg ');
            }

            return timeString;
        };
    });

    app.filter('strReplace', function () {
        return function (input, from, to) {
            input = input || '';
            from = from || '';
            to = to || '';

            return input.replace(from, to);
        };
    });

    app.filter('toTrusted', ['$sce', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        }]);

}());