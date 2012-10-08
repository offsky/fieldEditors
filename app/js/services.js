'use strict';

/* Services */
angular.module('taskServices', ['ngResource']).
    factory('Task', function($resource) {
        return $resource('tasks/tasks.json', {}, {
            query: {method: 'GET', params: {}, isArray:true }
        });
    });