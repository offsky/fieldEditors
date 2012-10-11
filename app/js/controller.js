'use strict';

fieldEditorsApp.controller('AppCtrl', function($scope, allTasks) {
  var tasks = $scope.tasks = allTasks.get();

  $scope.updateTaskName = function() {
    allTasks.put(tasks);
  };

  $scope.updateTaskLength = function() {
    
    console.log($scope.convertStringToMinutes(this.task.length, 1));    
  };

  $scope.convertStringToMinutes = function(a, b) {
    console.log("this is value = " + a);
    
    var c = 0,
        a = (a + " ").toLowerCase().trim(); - 1 == a.indexOf(":") && (-1 == a.indexOf("a") || -1 != a.indexOf("d")) && -1 == a.indexOf("p") ? 3 == b ? (c = a.match(/(\d?\d)(\d\d)/i), c = null != c && 2 < c.length ? parseInt(c[2], 10) + 60 * parseInt(c[1], 10) : parseInt(a, 10), "0000" == a && (c = 1440)) : (c = a.match(/(\d*\.?\d*)(\D*)/i), a = Math.round(100 * c[1]) / 100, c = 0 <= c[2].indexOf("d") ? 1440 * a : 0 <= c[2].indexOf("D") ? 1440 * a : 0 <= c[2].indexOf("h") ? 60 * a : 0 <= c[2].indexOf("H") ? 60 * a : a) : -1 != a.indexOf("p") ? (-1 == a.indexOf(":") ? (c = a.match(/(\d*)/i), c[2] = 0) : c = a.match(/(\d*):(\d*)/i), c = 12 == parseInt(c[1], 10) ? 60 * parseInt(c[1], 10) + parseInt(c[2], 10) : 60 * parseInt(c[1], 10) + parseInt(c[2], 10) + 720) : -1 != a.indexOf("a") ? (-1 == a.indexOf(":") ? (c = a.match(/(\d*)/i), c[2] = 0) : c = a.match(/(\d*):(\d*)/i), c = 12 == parseInt(c[1], 10) && 0 == parseInt(c[2], 10) ? 1440 : 12 == parseInt(c[1], 10) ? parseInt(c[2], 10) : 60 * parseInt(c[1], 10) + parseInt(c[2], 10)) : (c = a.match(/(\d*):(\d*)/i), c = 0 == parseInt(c[1], 10) && 2 == b ? parseInt(c[2], 10) : 0 == parseInt(c[1], 10) ? parseInt(c[2], 10) + 1440 : 60 * parseInt(c[1],10) + parseInt(c[2], 10), "00:00" == a && (c = 1440));
    
    return 0 == c || isNaN(c) ? 0 : c

  }
});
