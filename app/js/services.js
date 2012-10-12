'use strict';

/* Services */
angular.module('taskServices', []).
  factory('allTasks', function() {
    var STORAGE_ID = 'tasks';
    if (!localStorage.getItem(STORAGE_ID)) {
      var sampleData = [{"title":"Sample Task 1","length":"30 minutes","startDate":"10/22/2012"},{"title":"Sample Task 1","length":"30 minutes","startDate":"10/22/2012"}];
      localStorage.setItem(STORAGE_ID, JSON.stringify(sampleData));
    }
    return {
      get: function() {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      },

      put: function(tasks) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
      }

    };
});
