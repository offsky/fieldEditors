'use strict';

var filters = angular.module('taskFilters', []);

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
    return 'percent';
  };
});

filters.filter('url', function() {
  return function(input) {
    return 'url';
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

filters.filter('phone', function() {
  return function(input) {
    return 'phone';
  };
});

filters.filter('email', function() {
  return function(input) {
    return 'email';
  };
});


filters.filter('icon', function() {
  return function(input) {
    return 'icon';
  };
});


filters.filter('isbn', function() {
  return function(input) {
    return 'isbn';
  };
});
