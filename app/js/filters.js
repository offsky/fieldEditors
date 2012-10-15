'use strict';

var filters = angular.module('taskFilters', []);

filters.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
