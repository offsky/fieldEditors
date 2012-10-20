'use strict';

var filters = angular.module('taskFilters', ['ngSanitize']);

filters.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});


filters.filter('length', function() {
  return function(input) {
    return 'length';
  };
});

filters.filter('percent', function() {
  return function(input) {
      return (input) + '\u0025';
  };
});

filters.filter('rating', function() {
  return function(input) {
    return 'rating';
  };
});

filters.filter('star', function() {
  return function(input) {
    return 'star';
  };
});

filters.filter('phone', function($filter) {
    return function(input) {
        var clean = input.replace(/-/g, ""),
            output = '<a href="tel:'+clean+'">'+input+'</a>';
        return output;
    };
});

filters.filter('email', function() {
  return function(input) {
    return 'email';
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
