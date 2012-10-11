'use strict';

/* Services */
angular.module('taskServices', []).
  factory('allTasks', function() {
    var STORAGE_ID = 'tasks';

    return {
      get: function() {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      },

      put: function(tasks) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
      }

    };
});
