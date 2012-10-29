'use strict';
var filters = angular.module('appFilters', ['ngSanitize']);

filters.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

filters.filter('length', function() {
    return function(input) {

        var clean = parseInt(input),
            output, mod, hours;

        if(clean < 60 && clean > 0) {
            output = (clean === 1) ? clean + 'min' : clean + 'mins';
        } else if (clean >= 60){
            mod = clean % 60;
            hours = Math.round(clean / 60);
            output =  (hours === 1) ? hours + 'hr': hours + 'hrs';

            if (mod > 0 ) {
                output += (mod === 1) ? ' ' + mod + 'min': ' ' + mod + 'mins';
            }
        } else {
            //catching negative values
            output = '0';
        }
        return output;
    };
});

filters.filter('percent', function() {
  return function(input) {
      return (input) + '\u0025';
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
      var html='';

      if (input) {
        html = 'background-position: 0 -20px';
      }

    return html;
  };
});

filters.filter('phone', function($filter) {
    return function(input) {
        var clean = input.replace(/-/g, ""),
            html = '<a href="tel:'+clean+'">'+input+'</a>';
        return html;
    };
});

filters.filter('icon', function() {
    return function(input) {
        var icons = ['frog', 'tiger', 'mouse', 'cat', 'dog'],
            iconWidth = 36,
            html;

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


filters.filter('isbn', function() {
    return function(input) {
        var clean = input.replace(/-/g, ""),
            html;

        html = '<a href="http://www.amazon.com/s/field-keywords=' + clean +'">'+input+'</a>';

        return html;
    };
});
