'use strict';

fieldEditorsApp.controller('appCtrl', function($scope, allTasks) {
  var tasks = $scope.tasks = allTasks.get();
  
  $scope.pickerOptions = {
    changeMonth: true,
    changeYear: true,
    dateFormat: 'mm/dd/yy',
    controlType: 'select',
    ampm: true
  };

  $scope.updateField = function() {
    console.log("saving tasks");
    allTasks.put(tasks);
  };

});


fieldEditorsApp.controller('appFilters', function($scope) {
  var rightNow = new Date();
  $scope.currentDate = rightNow;
  $scope.amount = 1234.56;
});
