'use strict';

/* Services */
angular.module('taskServices', []).
  factory('allTasks', function() {
    var STORAGE_ID = 'tasks';
    if (!localStorage.getItem(STORAGE_ID)) {
      var sampleData = [
        {
          "fields": [{
            "name":  "taskName",
            "value":  "Sample Task 1",
            "type":   "text"
          },
          {
            "name":  "taskLength",
            "value":  "20 minutes",
            "type":   "length"
          },
          {
            "name":  "taskStartDateTime",
            "value":  "10/22/2012 12:00 am",
            "type":   "datetime"
          },
          {
            "name":  "taskCount",
            "value":  10,
            "type":   "integer"
          }]
        }
      ];
      
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
