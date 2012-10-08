'use strict';

fieldEditorsApp.controller('AppCtrl', function($scope, Task) {
  $scope.tasks = Task.query();

  $scope.blurCallBack = function() {
   alert("Hi");
  };
});
