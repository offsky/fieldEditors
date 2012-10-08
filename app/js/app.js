'use strict';

// Declare app level module which depends on filters, and services
var fieldEditorsApp = angular.module('fieldEditorsApp', ['taskServices', 'ui'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'AppCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
