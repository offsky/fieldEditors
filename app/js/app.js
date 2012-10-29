'use strict';

// Declare app level module which depends on filters, and services
var fieldEditorsApp = angular.module('fieldEditorsApp', ['appHelpers', 'ui', 'appDirectives', 'appFilters', 'ngSanitize'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
