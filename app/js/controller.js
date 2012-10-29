'use strict';

fieldEditorsApp.controller('appCtrl', function($scope, sampleTasks) {
  var tasks = $scope.tasks = sampleTasks.get();
  
  $scope.pickerOptions = {
    changeMonth: true,
    changeYear: true,
    dateFormat: 'mm/dd/yy',
    controlType: 'select',
    ampm: true
  };

  $scope.updateField = function() {
    console.log("saving tasks");
    sampleTasks.put(tasks);
  };

});


fieldEditorsApp.controller('appFilters', function($scope) {
  var rightNow = new Date();
  $scope.currentDate = rightNow;
  $scope.amount = 1234.56;
});

fieldEditorsApp.controller('appFields', function($scope) {
  
});
