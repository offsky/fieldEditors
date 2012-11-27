'use strict';

var filters = angular.module('appFilters', ['ngSanitize']);

var URL_REGEXP = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    ISBN_REGEXP = /^[0-9-]{8,17}$/;

filters.filter('time', function() {
    return function(input) {
        var output = '',
            date, ampm, hours, minutes;

        if (angular.isUndefined(input)) return output;
        if (angular.isNumber(input)) date = new Date(input*1000);
        if (!angular.isDate(date)) return output;

        hours = date.getUTCHours();
        minutes = date.getUTCMinutes();

        ampm = (hours >= 12) ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        output = hours + ":" + minutes + " " + ampm;

        return output;
    };
});

filters.filter('validDate', function($filter) {
    return function(input, dateFormat) {
        var output = '';

        if (angular.isUndefined(input)) return output;
        output = (angular.isNumber(input)) ? $filter('date')(input,dateFormat) : output;

        return output;
    };
});

filters.filter('num', function($filter) {

    return function(input, fractionSize) {
        var output = '';

        if (angular.isUndefined(input) || !angular.isNumber(input)) return output;

        output = $filter('number')(input,fractionSize);

        return output;
    };
});

filters.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

filters.filter('length', function() {

    function parseHrsMins(value) {
        // value should be passed in minutes
        var output = '',
            hours = 0,
            mod = 0;

        //console.log("parseHrsMins: " + value);

        if(value < 60 && value > 0) {
            output = (value === 1) ? value + 'min' : value + 'mins';
        } else if (value >= 60){
            mod = value % 60;
            hours = Math.round((value-mod) / 60);
            output =  (hours === 1) ? hours + 'hr': hours + 'hrs';

            if (mod > 0 ) {
                output += (mod === 1) ? ' ' + mod + 'min': ' ' + mod + 'mins';
            }
        } else {
            //catching negative values
            output = '';
        }

        return output;
    }

    function adjustHrsMins(value, reformatValues) {
        var clean = parseInt(value, 10);

        //console.log("addHrsMins: " + value + "; reformatValues: " + reformatValues + "; clean: " + clean);

        if ((reformatValues[0].indexOf('h') !== -1) && ((clean > 1) || (clean === 1))) {
            clean = clean*60;
        }
        return parseHrsMins(clean);
    }

    function reformatHrsMins(value) {
        var values = value.split(' '),
            len = values.length,
            cleanValues = [],
            minutes;

        //console.log("reformatHrsMins: " + value + "; Split values: " + values);

        while (len--) {
            cleanValues.unshift(parseInt(values[len], 10));
        }

        minutes = cleanValues[0]*60+cleanValues[1];

        return parseHrsMins(minutes);
    }

    function padZero(number) {
        return ((parseFloat(number) < 10) ? "0" : "") + Math.round(number);
    }

    return function(input) {
        //console.log("+++++++ FILTER FOR " + input + " +++++");

        var values = ['h', 'hr', 'hour', 'hrs', 'hours', 'm', 'min', 'minute', 'mins', 'minutes'],
            valuesLength = values.length,
            decimalTime = input.toString().split("."),
            clean = parseInt(input, 10),
            output = '',
            reformatValues = [],
            matchCount = 0,
            re, reFound = false;


        if (angular.isObject(decimalTime) && decimalTime.length === 2) {
            var hours = parseInt(decimalTime[0], 10),
                mins = decimalTime[1].replace(/\D/g,''),
                minutes = parseInt(padZero((mins / Math.pow(10, mins.length))*60), 10);

            return parseHrsMins((hours*60) + minutes);
        }

        while (valuesLength--) {
            re = new RegExp('\\B' + values[valuesLength] + '\\b', 'g');
            reFound = re.test(input);

            //console.log("Input: " + input + "; Found: " + reFound + "; Search Value: " + values[valuesLength]);

            if (reFound) {
                matchCount++;
                reformatValues.push(values[valuesLength]);
            }
        }

        //console.log("reformat values length: " + reformatValues.length + "; reformat values: " + reformatValues );

        switch(matchCount) {
            case 0:
                output = parseHrsMins(clean);
                break;
            case 1:
                output = adjustHrsMins(input, reformatValues);
                break;
            case 2:
                output = reformatHrsMins(input);
                break;
            default:
                output = '';
        }

        return output;
    };
});

filters.filter('percent', function() {
  return function(input) {
      var clean = parseFloat(input),
          output = '';

      if (!isNaN(clean)) { output = clean + '\u0025' }

      return output;
  };
});

filters.filter('rating', function() {
    return function(input) {
        var starW = 23,
            clean = parseFloat(input),
            containerW = starW * 5,
            bgW = clean / 5 * containerW,
            html;

        html = '<div class="rating" style="width:'+containerW+'px;"><div class="bg" style="width:'+bgW+'px;"></div>' +
            '<div class="stars"></div></div>';

        return html;
    };
});

filters.filter('star', function() {
  return function(input) {
      var html = '';

      if (input) {
        html = 'background-position: 0 -20px';
      }

    return html;
  };
});

filters.filter('phone', function() {
    return function(input) {
        var clean = input.replace(/[\-\.() ]/g, ""),
            html = '<a href="tel:'+clean+'">'+input+'</a>';
        return html;
    };
});

filters.filter('icon', function() {
    return function(input) {
        var icons = ['frog', 'tiger', 'mouse', 'cat', 'dog'],
            iconWidth = 36,
            html = '';

        $.each(icons, function(index) {
            if (input === icons[index]) {
                if (!index == 0) {
                    html = 'background-position: -' + (iconWidth * index) +'px 0';
                }
            }
        });

        return html;
    };
});

filters.filter('money', function($filter) {
    return function(input) {
        var output = '', clean;

        if (angular.isUndefined(input)) return output;

        if (angular.isString(input)) {
            input = parseFloat(input.replace(/[$]/g, ''));
        }

        if (angular.isNumber(input)) {
            clean = parseFloat(input);
            output = (clean !== 0) ? $filter('currency')(clean) : output;
        }

        return output;
    };
});

filters.filter('url', function($filter) {
    return function(input) {
        var output = '',
            html = '';

        if (URL_REGEXP.test(input)) {
            html = $filter('linky')(input);
        } else {
            if (input.indexOf(".") >= 0) {
                output = 'http://' + input;
                html = '<a href="' + output + '">' + output + '</a>';
            } else {
                html = input;
            }
        }

        return html;
    };
});

filters.filter('isbn', function() {
    return function(input) {
        var html, clean;
        if(ISBN_REGEXP.test(input)) {
            clean = input.replace(/-/g, '');
            html = '<a href="http://www.amazon.com/s/field-keywords=' + clean +'">'+input+'</a>';
        } else  {
            html = (angular.isUndefined(input)) ? '' : input;
        }

        return html;
    };
});